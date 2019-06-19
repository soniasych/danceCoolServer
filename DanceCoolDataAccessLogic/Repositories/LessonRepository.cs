using System;
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

        public Lesson GetLessonByParameters(DateTime date, string room, int groupId)
        {
            Lesson foundLesson = Context.Lessons
                .FirstOrDefault(lesson => lesson.Date == date && lesson.Room == room && lesson.GroupId == groupId);
            return foundLesson;
        }

        public IEnumerable<Lesson> GetLessonsByMonthForGroup(int groupId, int month)
        {
            var lessonsInMonth = Context.Lessons
                .Include(lesson => lesson.Group).ThenInclude(group => group.Direction)
                .Include(lesson => lesson.Group).ThenInclude(group => group.Level)
                .Where(lesson => lesson.Date.Month == month && lesson.GroupId == groupId);

            return lessonsInMonth;
        }
    }
}
