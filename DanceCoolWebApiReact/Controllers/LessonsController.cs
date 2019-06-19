using System;
using System.Collections.Generic;
using DanceCoolBusinessLogic.Interfaces;
using DanceCoolDTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DanceCoolWebApiReact.Controllers
{
    
    [ApiController]
    public class LessonsController : ControllerBase
    {
        private ILessonService _lessonService;

        public LessonsController(ILessonService lessonService)
        {
            _lessonService = lessonService;
        }

        // GET: api/Lessons
        [Authorize(Roles = "Mentor, Admin")]
        [HttpGet]
        [Route("api/lessons")]
        public IEnumerable<LessonDTO> GetAllStudents()
        {
            return _lessonService.GetLessons();
        }

        [HttpGet]
        [Route("api/lessons/{groupId}/{month}")]
        public IEnumerable<LessonDTO> GetLessonsByMonthForGroup(int groupId, int month)
        {
            return _lessonService.GetLessonsByMonthForGroup(groupId, month);
        }

        [Authorize(Roles = "Mentor, Admin")]
        [HttpPost]
        [Route("api/lessons/new-lesson")]
        public IActionResult AddNewLesson([FromBody] dynamic newLessonParameters)
        {
            string dateTimeToParse = $"{newLessonParameters.lessonDate} {newLessonParameters.lessonTime}";
            if (!DateTime.TryParse(dateTimeToParse, out DateTime lessonTime))
                return BadRequest("Невідомі дані про юзера");

            string roomName = newLessonParameters.lessonRoom;

            if (!int.TryParse(newLessonParameters.groupId.ToString(), out int groupId) && groupId < 1)
                return BadRequest("Невідомі дані про роль");

            var newLessonId = _lessonService.AddLesson(lessonTime, roomName, groupId);

            if (newLessonId < 1)
            {
                return StatusCode(500);
            }

            return Ok(newLessonId);
        }
    }
}
