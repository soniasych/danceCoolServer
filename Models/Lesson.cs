using System;
using System.Collections.Generic;

namespace danceCoolServer.Models
{
    public partial class Lesson
    {
        public Lesson()
        {
            InverseGroup = new HashSet<Lesson>();
            InverseLessonType = new HashSet<Lesson>();
        }

        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Room { get; set; }
        public int LessonTypeId { get; set; }
        public int? GroupId { get; set; }

        public virtual Lesson Group { get; set; }
        public virtual Lesson LessonType { get; set; }
        public virtual ICollection<Lesson> InverseGroup { get; set; }
        public virtual ICollection<Lesson> InverseLessonType { get; set; }
    }
}
