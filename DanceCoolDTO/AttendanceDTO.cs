using System;


namespace DanceCoolDTO
{
    public class AttendanceDTO
    {
        public int Id { get; set; }
        public string Lesson { get; set; }
        public int PresentStudentId { get; set; }

        public AttendanceDTO(int id, string lesson, int presentStudentId)
        {
            Id = id;
            Lesson = lesson;
            PresentStudentId = presentStudentId;
        }

    }
}
