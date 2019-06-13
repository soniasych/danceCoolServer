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

        public IEnumerable<AttendanceDTO> GetPresentStudentsOnLesson(int lessonId)
        {
            var attendance = db.Attendances.GetAllPresentStudentsOnLesson(lessonId);

            if (attendance == null)
                return null;

            var attendanceDtos = new List<AttendanceDTO>();

            foreach (var attendanceModel in attendance)
                attendanceDtos.Add(AttendanceModelToDTO(attendanceModel));

            return attendanceDtos;
        }

        #region Helpers
        private LessonDTO LessonModelToDTO(Lesson lessonModel) => new LessonDTO(
            lessonModel.Id,
            lessonModel.Date,
            lessonModel.Room,
            $"{lessonModel.Group.Direction.Name} {lessonModel.Group.Level.Name}");

        private AttendanceDTO AttendanceModelToDTO(Attendance attendanceModel) => new AttendanceDTO(
            attendanceModel.Id,
            attendanceModel.Lesson.Id.ToString(),
            attendanceModel.PresentStudent.Id);
        #endregion Helpers
    }
}
