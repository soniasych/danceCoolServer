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
        private IAttendanceService _attendanceService;

        public AttendanceController(ILessonService lessonService, IAttendanceService attendanceService)
        {
            _lessonService = lessonService;
            _attendanceService = attendanceService;
        }

        //[HttpGet]
        //[Route("api/attendance/{lessonId}/present-students/")] 
        //public IEnumerable<AttendanceDTO> GetPresentStudentsByLessonId(int lessonId)
        //{
        //    return _lessonService.GetPresentStudentsOnLesson(lessonId);
        //}

        [HttpGet]
        [Route("api/attendance/{groupId}/{month}/")]
        public IActionResult GetAttendancesByGroupAndMonth(int groupId, int month)
        {
            var attendances = _attendanceService.GetAttendancesByMonth(groupId, month);
            if (attendances == null)
            {
                return NotFound("Жодного відвідування не знайдено за цими параметрами");
            }

            return Ok(attendances);
        }
    }
}
