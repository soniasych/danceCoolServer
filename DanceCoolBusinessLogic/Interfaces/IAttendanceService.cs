using System.Collections.Generic;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Interfaces
{
    public interface IAttendanceService
    {
        IEnumerable<AttendanceDTO> GetAttendancesByMonth(int groupId, int month);
    }
}
