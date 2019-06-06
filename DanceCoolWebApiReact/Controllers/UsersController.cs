using System.Collections.Generic;
using System.Linq;
using DanceCoolBusinessLogic.Services;
using DanceCoolDTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DanceCoolWebApiReact.Controllers
{
    /// <summary>
    /// Controller for system users.
    /// </summary>
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>Get all users in database.</summary>
        //GET: api/Users
        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("api/users")]
        public IEnumerable<UserDTO> GetAllUsers()
        {
            return _userService.GetAllUsers();
        }

        /// <summary>Get all students in database.</summary>
        //GET: api/students
        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("api/students")]
        public IEnumerable<UserDTO> GetAllStudents()
        {
            return _userService.GetAllStudents();
        }

        /// <summary>Get all mentors in database.</summary>
        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("api/mentors")]
        public IActionResult GetAllMentors()
        {
            var mentors = _userService.GetMentors();

            if (!mentors.Any())
            {
                return NotFound("No mentors in database");
            }
            return Ok(mentors);
        }

        /// <summary>Get user by his id in database.</summary>
        /// <param name="userId">Id of the student to be gotten.</param>
        [Authorize(Roles = "Mentor, Admin")]
        [Authorize]
        [HttpGet]
        [Route("api/users/{userId}")]
        public UserDTO GetUserById(int userId)
        {
            return _userService.GetUserById(userId);
        }

        [Authorize(Roles = "Mentor, Admin")]
        [Route("api/users/phone")]
        public UserDTO GetUserByPhoneNumber(string phoneNumber)
        {
            var user = _userService.GetUserByPhoneNumber(phoneNumber);
            return user;
        }
         [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("api/users/search")]
        public IEnumerable<UserDTO> Search(string searchQuery)
        {
            var searchResult = new List<UserDTO>();
            return searchQuery == null ? searchResult : _userService.Search(searchQuery);
        }

        // POST: api/Users
        [Authorize(Roles = "Mentor, Admin")]
        [HttpPost]
        [Route("api/users/")]
        public void AddNewUser([FromBody] NewUserDTO userDto)
        {
            _userService.AddUser(userDto);
        }

        [Authorize(Roles = "Mentor, Admin")]
        [HttpPost]
        [Route("api/group/{groupId}/user/")]
        public void AddStudentToGroup([FromBody] NewUserGroupDTO newUserGroupDTO)
        {
            if (newUserGroupDTO.UserId > 0 && newUserGroupDTO.GroupId > 0)
            {
                _userService.AddUserToGroup(newUserGroupDTO.UserId, newUserGroupDTO.GroupId);
                Ok();
            }
        }

        //// PUT: api/Users/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
