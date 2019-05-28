using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface ILessonRepository : IRepository<Lesson>
    {
        IEnumerable<Lesson> GetAllLessons();
        Lesson GetLessonById(int id);
        IEnumerable<Lesson> GetLessonByGroupId(int groupId);
        //IEnumerable<Lesson> GetAllPresentStudentsOnLesson(int lessonId);
    }
}
