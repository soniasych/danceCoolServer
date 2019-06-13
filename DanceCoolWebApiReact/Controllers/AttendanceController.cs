using System.Collections.Generic;
using DanceCoolBusinessLogic.Interfaces;
using DanceCoolDTO;
using Microsoft.AspNetCore.Mvc;

namespace DanceCoolWebApiReact.Controllers
{
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private ILessonService _lessonService;

        public AttendanceController(ILessonService lessonService)
        {
            _lessonService = lessonService;
        }

        //// GET: api/Attendance
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET: api/Attendance/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        [HttpGet]
        [Route("api/attendance/{lessonId}/present-students/")] 
        public IEnumerable<AttendanceDTO> GetPresentStudentsByLessonId(int lessonId)
        {
            return _lessonService.GetPresentStudentsOnLesson(lessonId);
        }

        //// POST: api/Attendance
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT: api/Attendance/5
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
