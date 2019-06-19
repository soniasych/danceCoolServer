using System.Collections.Generic;
using System.Linq;
using DanceCoolBusinessLogic.Interfaces;
using DanceCoolDTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace danceCoolWebApi.Controllers
{
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly IGroupService _groupService;
        private readonly IUserService _userService;

        public GroupsController(IGroupService groupService, IUserService userService)
        {
            _groupService = groupService;
            _userService = userService;
        }

        /// <summary>returns all groups in database.</summary>
        [HttpGet]
        [Route("api/groups")]
        public IEnumerable<GroupDTO> GetAllGroups()
        {
            return _groupService.GetAllGroups();
        }

        /// <summary>Get specific group by it's id.</summary>
        /// <param name="groupId">Id of the group.</param>
        [Authorize(Roles = "Mentor, Admin")]
        [HttpGet]
        [Route("api/groups/{id}")]
        public GroupDTO GetGroupById(int id)
        {
            return _groupService.GetGroupById(id);
        }

        /// <summary>Get students that is in current group .</summary>
        /// <param name="groupId">Id of the group.</param>
        [Authorize(Roles = "Mentor, Admin")]
        [HttpGet]
        [Route("api/groups/{groupId}/users/")]
        public IEnumerable<UserDTO> GetUsersById(int groupId)
        {
            return _userService.GetUsersFromGroup(groupId);
        }

        /// <summary>Get students that not in current group .</summary>
        /// <param name="groupId">Id of the group.</param>
        [Authorize(Roles = "Mentor, Admin")]
        [HttpGet]
        [Route("api/groups/{groupId}/students/not-in-group")]
        public IEnumerable<UserDTO> GetStudentsNotInCurrentGroup(int groupId)
        {
            return _userService.GetStudentsNotInCurrentGroup(groupId);
        }

        /// <summary>Get Mentors that not in current group .</summary>
        /// <param name="primMentorId">Id of group primary mentor.</param>
        /// <param name="secMentorId">Id of group secondary mentor.</param>
        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("api/groups/{groupId}/mentors/not-in-group")]
        public IActionResult GetMentorsNotInCurrentGroup(int primMentorId, int secMentorId)
        {
            var currentMentors = new int[2];
            if (primMentorId < 1 && secMentorId < 1)
            {
                return BadRequest("Подано погані дані викладачів.");
            }

            currentMentors[0] = primMentorId;
            currentMentors[1] = secMentorId;

            var unUsedMentors = _userService.GetMentorsNotInGroup(currentMentors);
            if (unUsedMentors == null) return NotFound("Не знайдено викладачів");

            return Ok(unUsedMentors);
        }

        /// <summary>Get all skill levels from database.</summary>
        [HttpGet]
        [Route("api/skill-levels")]
        public IActionResult GetAllSkillLevels()
        {
            var skillLevels = _groupService.GetAllSkillLevels();
            return !skillLevels.Any()
                ? (IActionResult)NotFound("There's no skill levels in database")
                : Ok(skillLevels);
        }

        /// <summary>Add new group.</summary>
        /// <param name="newGroup">Group Dto to be created.</param>
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("api/groups/new-group/")]
        public void Post(NewGroupDto newGroup)
        {
        }

        /// <summary>Changes Group skill level.</summary>
        /// <param name="changeGroupLevelReqObject">Parameters for group changing. Must include group id and skill Level Id</param>
        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("api/group/skill-level/")]
        public IActionResult ChangeGroupLevel([FromBody]dynamic changeGroupLevelReqObject)
        {
            var groupId = (int)changeGroupLevelReqObject.groupId;
            var newSkillLevelId = (int)changeGroupLevelReqObject.newSkillLevelId;
            if (groupId < 1 || newSkillLevelId < 1)
            {
                return BadRequest("Вказано невірні параметри");
            }
            _groupService.ChangeGroupLevel(groupId, newSkillLevelId);
            return Ok();
        }

        /// <summary>Changes Group mentors.</summary>
        /// <param name="changeMentorsReqObject">Requested object from front. Must include groupId newPrimaryMentorId newSecMentorId</param>
        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("api/group/mentor")]
        public IActionResult ChangeGroupMentors([FromBody] dynamic changeMentorsReqObject)
        {
            var groupId = (int)changeMentorsReqObject.groupId;
            var newPrimaryMentorId = (int)changeMentorsReqObject.newPrimaryMentorId;
            var newSecMentorId = (int)changeMentorsReqObject.newSecMentorId;

            if (groupId < 1 || newPrimaryMentorId < 1 || newSecMentorId < 1)
                return BadRequest("Вказано невірні параметри");

            if (_groupService.ChangeGroupMentors(groupId, newPrimaryMentorId, newSecMentorId)) Ok();
            return StatusCode(502);
        }
    }
}