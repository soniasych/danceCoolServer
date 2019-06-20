namespace DanceCoolDTO.Attendance
{
    public class PresenceDto
    {
        public int LessonId { get; set; }
        public bool WasPresent { get; set; }

        public PresenceDto(int lessonId, bool wasPresent)
        {
            LessonId = lessonId;
            WasPresent = wasPresent;
        }
    }
}
