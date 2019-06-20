using DanceCoolBusinessLogic.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
            var attendances = _attendanceService.GetPresentStudents(groupId, month);
            if (attendances == null)
            {
                return NotFound("Жодного відвідування не знайдено за цими параметрами");
            }

            return Ok(attendances);
        }

        [Authorize(Roles = "Mentor, Admin")]
        [HttpPost]
        [Route("api/attendance/{lessonId}/new-attendance/")]
        public IActionResult AddAttendancesForLesson(int lessonId, [FromBody] dynamic presentStudents)
        {
            int[] presentStudentsId = presentStudents.checkedStudents.ToObject<int[]>();

            _attendanceService.AddAttendancesFromLesson(lessonId, presentStudentsId);            

            return Ok();
        }
    }
}
