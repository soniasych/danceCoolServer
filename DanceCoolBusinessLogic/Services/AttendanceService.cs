using System.Collections.Generic;
using System.Linq;
using DanceCoolBusinessLogic.Interfaces;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDataAccessLogic.UnitOfWork;
using DanceCoolDTO;
using DanceCoolDTO.Attendance;

namespace DanceCoolBusinessLogic.Services
{
    public class AttendanceService : BaseService, IAttendanceService
    {
        public AttendanceService(IUnitOfWork db) : base(db)
        {
        }

        public IEnumerable<AttendanceDTO> GetAttendancesByMonth(int groupId,int month)
        {
            var lessonsIdArray = db.Lessons.GetLessonsByMonthForGroup(groupId, month).Select(lesson => lesson.Id).ToArray();
            
            var attendances = db.Attendances.GetAttendancesByLessonsArray(lessonsIdArray);

            if (attendances == null)
            {
                return null;
            }

            var attendanceDtos = new List<AttendanceDTO>();
            foreach (var attendance in attendances)
            {
                attendanceDtos.Add(AttendanceModelToDTO(attendance));
            }
            return attendanceDtos;
        }

        public IEnumerable<StudentAttendanceDto> GetPresentStudents(int groupId, int month)
        {
            var lessonsIdArray = db.Lessons.GetLessonsByMonthForGroup(groupId, month).Select(lesson => lesson.Id).ToArray();
            var students = db.Users.GetStudentsByGroupId(groupId);
            var attendances = db.Attendances.GetAttendancesByLessonsArray(lessonsIdArray);

            var studentPresences = new List<StudentAttendanceDto>();

            foreach (var student in students)
            {
                var curPresences = new List<PresenceDto>();
                var curAttendances = attendances.Where(attendance => attendance.PresentStudentId == student.Id).Select(attendance => attendance.LessonId);
                foreach (var i in lessonsIdArray)
                {
                    if (curAttendances.Contains(i))
                        curPresences.Add(new PresenceDto(i, true));
                    else
                        curPresences.Add(new PresenceDto(i, false));
                }
                studentPresences.Add(new StudentAttendanceDto(student.Id, student.FirstName, student.LastName, curPresences));
            }

            return studentPresences;
        }

        private AttendanceDTO AttendanceModelToDTO(Attendance attendanceModel) => new AttendanceDTO(
            attendanceModel.Id,
            attendanceModel.LessonId,
            attendanceModel.PresentStudentId);
    }
}
