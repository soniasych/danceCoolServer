using System;
using System.Collections.Generic;
using DanceCoolBusinessLogic.Interfaces;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDataAccessLogic.UnitOfWork;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    public class LessonService : BaseService, ILessonService
    {
        public LessonService(IUnitOfWork db) : base(db)
        {
        }

        public IEnumerable<LessonDTO> GetLessonsByMonthForGroup(int groupId, int month)
        {
            var lessonsInMonth =  db.Lessons.GetLessonsByMonthForGroup(groupId, month);
            if (lessonsInMonth == null)
                return null;

            var lessonDtos = new List<LessonDTO>();
            foreach (var lessonModel in lessonsInMonth)
            {
                lessonDtos.Add(LessonModelToDTO(lessonModel));
            }

            return lessonDtos;
        }

        public IEnumerable<LessonDTO> GetLessons()
        {
            var lessons = db.Lessons.GetAllLessons();

            var lessonDtos = new List<LessonDTO>();

            foreach (var lessonModel in lessons)
            {
                lessonDtos.Add(LessonModelToDTO(lessonModel));
            }
            return lessonDtos;
        }

        public int AddLesson(DateTime date, string room, int groupId)
        {
            var lessonToAdd = new Lesson()
            {
                Date = date,
                Room = room,
                GroupId = groupId
            };

            db.Lessons.AddEntity(lessonToAdd);
            db.Save();
            Lesson addedLesson = db.Lessons.GetLessonByParameters(date, room, groupId);
            if (addedLesson == null)
            {
                return 0;
            }
            return addedLesson.Id;
        }

       
        private LessonDTO LessonModelToDTO(Lesson lessonModel) => new LessonDTO(
            lessonModel.Id,
            lessonModel.Date,
            lessonModel.Room,
            $"{lessonModel.Group.Direction.Name} {lessonModel.Group.Level.Name}");
    }
}
