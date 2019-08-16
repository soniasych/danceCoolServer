using System.Collections.Generic;
using DanceCoolBusinessLogic.Interfaces;
using DanceCoolDTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DanceCoolWebApi.Controllers
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
        //[Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("api/users")]
        public IEnumerable<UserDTO> GetAllUsers()
        {
            return _userService.GetAllUsers();
        }

        /// <summary>Get all students in database.</summary>
        //[Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("api/students")]
        public IEnumerable<UserDTO> GetAllStudents()
        {
            return _userService.GetAllStudents();
        }

        /// <summary>Get user by his id in database.</summary>
        /// <param name="userId">Id of the student to be gotten.</param>
        [Authorize(Roles = "Mentor, Admin")]
        [HttpGet]
        [Route("api/users/{userId}")]
        public UserDTO GetUserById(int userId)
        {
            return _userService.GetUserById(userId);
        }

        /// <summary>Get user by his phoneNumber.</summary>
        /// <param name="phoneNumber">phoneNumber of the user to be gotten.</param>
        [Authorize(Roles = "Mentor, Admin")]
        [HttpGet]
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

        /// <summary>Get all roles from database.</summary>
        [Authorize(Roles = "Mentor, Admin")]
        [HttpGet]
        [Route("api/roles/")]
        public IActionResult GetAllRoles()
        {
            var roles = _userService.GetAllRoles();
            if (roles== null)
            {
                return NotFound("Не знайдено жодної ролі");
            }

            return Ok(roles);
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

        /// <summary>Changes user role.</summary>
        /// <param name="userRoleToChange">Object that contains user id and new role id</param>
        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("api/user/changeuserrole")]
        public IActionResult ChangeUserRole([FromBody] dynamic userRoleToChange)
        {
            if (!int.TryParse(userRoleToChange.userId.ToString(), out int userId))
                return BadRequest("Невідомі дані про юзера");

            if (!int.TryParse(userRoleToChange.newRoleId.ToString(), out int newRoleId))
                return BadRequest("Невідомі дані про роль");

            if (userId < 1 || newRoleId < 1)
                return BadRequest("Введено невірні дані");

            return _userService.ChangeUserRole(userId, newRoleId) ? Ok() : StatusCode(500);
        }

    }
}
