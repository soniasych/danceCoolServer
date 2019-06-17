namespace DanceCoolDTO
{
    public class AttendanceDTO
    {
        public int Id { get; set; }
        public int LessonId { get; set; }
        public int PresentStudentId { get; set; }

        public AttendanceDTO(int id, int lessonId, int presentStudentId)
        {
            Id = id;
            LessonId = lessonId;
            PresentStudentId = presentStudentId;
        }
    }
}
