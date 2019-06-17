using System.Collections.Generic;
using System.Linq;
using DanceCoolBusinessLogic.Interfaces;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDataAccessLogic.UnitOfWork;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    public class AttendanceService : BaseService, IAttendanceService
    {
        public AttendanceService(IUnitOfWork db) : base(db)
        {
        }

        public IEnumerable<AttendanceDTO> GetAttendancesByMonth(int groupId,int month)
        {
            var lessonsIdArray = db.Lessons.GetLessonsByMonthForGroup(groupId, month).Select(lesson => lesson.Id).ToArray();
            
            var attendances = db.Attendances.GetAttendancesByLessonsArray(lessonsIdArray);

            if (attendances == null)
            {
                return null;
            }

            var attendanceDtos = new List<AttendanceDTO>();
            foreach (var attendance in attendances)
            {
                attendanceDtos.Add(AttendanceModelToDTO(attendance));
            }
            return attendanceDtos;
        }

        private AttendanceDTO AttendanceModelToDTO(Attendance attendanceModel) => new AttendanceDTO(
            attendanceModel.Id,
            attendanceModel.LessonId,
            attendanceModel.PresentStudentId);
    }
}
