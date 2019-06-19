using System.Collections.Generic;
using System.Linq;
using DanceCoolBusinessLogic.Interfaces;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDataAccessLogic.UnitOfWork;
using DanceCoolDTO.Attendance;

namespace DanceCoolBusinessLogic.Services
{
    public class AttendanceService : BaseService, IAttendanceService
    {
        public AttendanceService(IUnitOfWork db) : base(db)
        {
        }

        public IEnumerable<StudentAttendanceDto> GetPresentStudents(int groupId, int month)
        {
            var lessonsIdArray = db.Lessons.GetLessonsByMonthForGroup(groupId, month)?
                .Select(lesson => lesson.Id)
                .ToArray();
            var students = db.Users.GetStudentsByGroupId(groupId);
            if (students == null) return null;
            var attendances = db.Attendances.GetAttendancesByLessonsArray(lessonsIdArray);

            if (attendances == null) return null;

            var studentPresences = new List<StudentAttendanceDto>();

            foreach (var student in students)
            {
                var curPresences = new List<PresenceDto>();
                var curAttendances = attendances.Where(attendance => attendance.PresentStudentId == student.Id)
                    .Select(attendance => attendance.LessonId);
                foreach (var i in lessonsIdArray)
                    if (curAttendances.Contains(i))
                        curPresences.Add(new PresenceDto(i, true));
                    else
                        curPresences.Add(new PresenceDto(i, false));
                studentPresences.Add(new StudentAttendanceDto(student.Id, student.FirstName, student.LastName,
                    curPresences));
            }

            return studentPresences;
        }

        public bool AddAttendancesFromLesson(int lessonId, int[] checkedStudents)
        {
            var attendancesToAdd = new List<Attendance>();
            foreach(var checkedStudent in checkedStudents)
            {
                attendancesToAdd.Add(new Attendance()
                {
                    LessonId = lessonId,
                    PresentStudentId=checkedStudent
                });
            }

            db.Attendances.AddRange(attendancesToAdd);
            db.Save();
            return true;
        }
    }
}