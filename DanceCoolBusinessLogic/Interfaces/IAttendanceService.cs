using System.Collections.Generic;
using DanceCoolDTO;
using DanceCoolDTO.Attendance;

namespace DanceCoolBusinessLogic.Interfaces
{
    public interface IAttendanceService
    {
        IEnumerable<AttendanceDTO> GetAttendancesByMonth(int groupId, int month);
        IEnumerable<StudentAttendanceDto> GetPresentStudents(int groupId, int month);
    }
}
