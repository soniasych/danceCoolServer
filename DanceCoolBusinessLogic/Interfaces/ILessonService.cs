using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDTO;
using System.Collections.Generic;

namespace DanceCoolBusinessLogic.Interfaces
{
    public interface ILessonService
    {
        IEnumerable<LessonDTO> GetLessonsByMonthForGroup(int groupId, int month);
        IEnumerable<LessonDTO> GetLessons();
        //IEnumerable<AttendanceDTO> GetPresentStudentsOnLesson(int lessonId);
    }
}
