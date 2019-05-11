using System.Collections.Generic;
using DanceCoolBusinessLogic.Services;
using DanceCoolDTO;
using Microsoft.AspNetCore.Mvc;

namespace DanceCoolWebApiReact.Controllers
{
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;


        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        //GET: api/Users
        [HttpGet]
        [Route("api/users")]
        public IEnumerable<UserDTO> GetAllUsers()
        {
            return _userService.GetAllUsers();
        }

        //GET: api/students
        [HttpGet]
        [Route("api/students")]
        public IEnumerable<UserDTO> GetAllStudents()
        {
            return _userService.GetAllStudents();
        }

        // GET: api/Users/5
        [HttpGet]
        [Route("api/users/{userId}")]
        public UserDTO GetUserById(int userId)
        {
            return _userService.GetUserById(userId);
        }

        [HttpGet]
        [Route("api/groups/{groupId}/users/")]
        public IEnumerable<UserDTO> GetUsersById(int groupId)
        {
            return _userService.GetUsersFromGroup(groupId);
        }

        [HttpGet]
        [Route("api/users/search")]
        public IEnumerable<UserDTO> Search(string searchQuery)
        {
            var searchResult = new List<UserDTO>();
            return searchQuery == null ? searchResult : _userService.Search(searchQuery);
        }

        //// POST: api/Users
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

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
