using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using danceCoolServer.Models;

namespace CmdApi.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserContex _context;

        public UserController(UserContex context) => _context = context;
        
        //GET:    api/user
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            return _context.User;
        }

/* 
        [HttpGet]
        public ActionResult<IEnumerable<string>> GetString()
        {
            return new string[] {"Wow", "!"};
        }
*/
    }
}