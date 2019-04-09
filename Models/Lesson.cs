using System;
using System.Collections.Generic;

namespace danceCoolServer.Models
{
    public partial class Lesson
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Room { get; set; }
        public int LessonTypeId { get; set; }
        public int? GroupId { get; set; }

        public virtual Group Group { get; set; }
        public virtual LessonType LessonType { get; set; }
    }
}
