using System.Collections.Generic;
using System.Linq;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DanceCoolDataAccessLogic.Repositories
{
    public class AttendanceRepository : BaseRepository<Attendance>, IAttendanceRepository
    {
        public AttendanceRepository(DanceCoolContext context) : base(context)
        {
        }

        public IEnumerable<Attendance> GetAllAttendances() => Context.Attendances;


        public Attendance GetAttendanceById(int id) => Context.Attendances.Find(id);

        public IEnumerable<Attendance> GetAttendancesByLessonsArray(int[] lessonIdsArray)
        {
            var attendancesByLessonsSet = Context.Attendances.Where(attendance => lessonIdsArray.Contains(attendance.LessonId)).ToList();
            return attendancesByLessonsSet;
        }

        public IEnumerable<Attendance> GetAllPresentStudentsOnLesson(int lessonId)
        {
            var presentstudents = Context.Attendances
                //.Include(at => at.Lesson.Group.Direction)
                //.Include(at => at.Lesson.Group.Level)
                //.Include(at => at.Lesson.Group.PrimaryMentor)
                //.Include(at => at.Lesson.Group.SecondaryMentor)
                .Include(at => at.Lesson)
                .Include(at => at.PresentStudent)
                .Where(attendance => attendance.LessonId == lessonId).ToList();
            return presentstudents;

        }

    }
}
