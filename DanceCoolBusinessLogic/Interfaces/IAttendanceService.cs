using System.Collections.Generic;
using DanceCoolDTO.Attendance;

namespace DanceCoolBusinessLogic.Interfaces
{
    public interface IAttendanceService
    {
        IEnumerable<StudentAttendanceDto> GetPresentStudents(int groupId, int month);
        bool AddAttendancesFromLesson(int lessonId, int[] checkedStudents);
    }
}
