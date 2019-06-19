using System.Collections.Generic;
using DanceCoolDataAccessLogic.EfStructures.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IAttendanceRepository : IRepository<Attendance>
    {
        IEnumerable<Attendance> GetAllAttendances();
        Attendance GetAttendanceById(int id);
        IEnumerable<Attendance> GetAllPresentStudentsOnLesson(int lessonId);
        IEnumerable<Attendance> GetAttendancesByLessonsArray(int[] lessonIdsArray);
    }
}
