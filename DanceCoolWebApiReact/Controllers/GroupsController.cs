﻿using System.Collections.Generic;
using System.Linq;
using DanceCoolBusinessLogic.Services;
using DanceCoolDTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
        [Authorize]
        [Route("api/groups/{groupId}/students/not-in-group")]
        public IEnumerable<UserDTO> GetStudentsNotInCurrentGroup(int groupId)
        {
            return _groupService.GetStudentsNotInCurrentGroup(groupId);
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
        /// <param name="groupId">Id of the group to be changed.</param>
        /// <param name="newSkillLevelId">New skill level id.</param>
        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("api/group/skill-level/")]
        public IActionResult ChangeGroupLevel(int groupId, int newSkillLevelId)
        {
            if (groupId < 1 || newSkillLevelId < 1)
            {
                return BadRequest("Вказано невірні параметри");
            }
            _groupService.ChangeGroupLevel(groupId, newSkillLevelId);
            return Ok();
        }

        /// <summary>Get all skill levels from database.</summary>
        [HttpGet]
        [Route("api/skill-levels")]
        public IActionResult GetAllSkillLevels()
        {
            var skillLevels = _groupService.GetAllSkillLevels();
            return !skillLevels.Any()
                ? (IActionResult) NotFound("There's no skill levels in database")
                : Ok(skillLevels);
        }


        /// <summary>Changes Group mentors.</summary>
        /// <param name="groupId">Id of the group to be changed.</param>
        /// <param name="newPrimaryMentorId">New primary mentor id.</param>
        /// <param name="newSecMentorId">New secondary mentor id.</param>
        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("api/group/mentor")]
        public IActionResult ChangeGroupLevelMentor(int groupId, int newPrimaryMentorId, int newSecMentorId)
        {
            if (groupId < 1 || newPrimaryMentorId < 1 || newSecMentorId < 1)
            {
                return BadRequest("Вказано невірні параметри");
            }

            if (_groupService.ChangeGroupMentors(groupId, newPrimaryMentorId, newSecMentorId))
            {
                Ok();
            }
            return StatusCode(502);
        }

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}