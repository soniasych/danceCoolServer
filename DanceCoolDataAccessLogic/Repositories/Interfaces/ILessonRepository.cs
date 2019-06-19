using System;
using System.Collections.Generic;
using DanceCoolDataAccessLogic.EfStructures.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface ILessonRepository : IRepository<Lesson>
    {
        IEnumerable<Lesson> GetAllLessons();
        Lesson GetLessonById(int id);
        IEnumerable<Lesson> GetLessonByGroupId(int groupId);
        IEnumerable<Lesson> GetLessonsByMonthForGroup(int groupId, int month);
        Lesson GetLessonByParameters(DateTime date, string room, int groupId);
        //IEnumerable<Lesson> GetAllPresentStudentsOnLesson(int lessonId);
    }
}
