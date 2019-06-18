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


    }
}
