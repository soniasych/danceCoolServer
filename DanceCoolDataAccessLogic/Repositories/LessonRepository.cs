using System.Collections.Generic;
using System.Linq;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DanceCoolDataAccessLogic.Repositories
{
    public class LessonRepository : BaseRepository<Lesson>, ILessonRepository
    {
        public LessonRepository(DanceCoolContext context) : base(context)
        {
        }

        public IEnumerable<Lesson> GetAllLessons()
        {
            var allLessons = Context.Lessons
                .Include(g => g.Group).ToList();

            return allLessons;
        } 

        public Lesson GetLessonById(int id) => Context.Lessons.Find(id);

        public IEnumerable<Lesson> GetLessonByGroupId(int groupId)
        {
            return Context.Lessons
                .Include(g => g.Group)
                .Where(group => group.GroupId == groupId).ToList();
        }

        public IEnumerable<Lesson> GetAllPresentStudentsOnLesson(int lessonId)
        {
            return Context.Lessons
                .Include(l => l.Attendances);
        }
    }
}
