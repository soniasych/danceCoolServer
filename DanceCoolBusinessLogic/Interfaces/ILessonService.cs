using System;
using DanceCoolDTO;
using System.Collections.Generic;

namespace DanceCoolBusinessLogic.Interfaces
{
    public interface ILessonService
    {
        IEnumerable<LessonDTO> GetLessonsByMonthForGroup(int groupId, int month);
        IEnumerable<LessonDTO> GetLessons();
        int AddLesson(DateTime date, string room, int groupId);
        //IEnumerable<AttendanceDTO> GetPresentStudentsOnLesson(int lessonId);
    }
}
