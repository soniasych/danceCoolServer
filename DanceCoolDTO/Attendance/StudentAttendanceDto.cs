using System.Collections.Generic;

namespace DanceCoolDTO.Attendance
{
    public class StudentAttendanceDto
    {
        public int StudentId { get; set; }
        public string StudentFirstName { get; set; }
        public string StudentLastName { get; set; }
        public List<PresenceDto> Presences { get; set; }

        public StudentAttendanceDto(int studentId, string studentFirstName, string studentLastName, List<PresenceDto> presences)
        {
            StudentId = studentId;
            StudentFirstName = studentFirstName;
            StudentLastName = studentLastName;
            Presences = presences;
        }
    }
}
