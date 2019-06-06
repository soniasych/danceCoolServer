using System.Collections.Generic;
using DanceCoolBusinessLogic.Services;
using DanceCoolDTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DanceCoolWebApiReact.Controllers
{
    
    [ApiController]
    public class LessonsController : ControllerBase
    {
        private IGroupService _groupService;

        public LessonsController(IGroupService groupService, IUserService userService)
        {
            _groupService = groupService;
        }

        // GET: api/Lessons
        [Authorize(Roles = "Mentor, Admin")]
        [HttpGet]
        [Route("api/lessons")]
        public IEnumerable<LessonDTO> GetAllStudents()
        {
            return _groupService.GetLessons();
        }

        //// GET: api/Lessons/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST: api/Lessons
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT: api/Lessons/5
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
