using System;

namespace DanceCoolDTO
{
    public class LessonDTO
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Room { get; set; }
        public string LessonGroup { get; set; }

        public LessonDTO(int id, DateTime date, string room, string lessonGroup)
        {
            Id = id;
            Date = date;
            Room = room;
            LessonGroup = lessonGroup;
        }
    }
}
