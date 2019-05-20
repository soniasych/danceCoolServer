using System;
using System.Collections.Generic;

namespace DanceCoolDataAccessLogic.Entities
{
    public partial class LessonType
    {
        public LessonType()
        {
            Lessons = new HashSet<Lesson>();
        }

        public int Id { get; set; }
        public string LessonTypeName { get; set; }

        public virtual ICollection<Lesson> Lessons { get; set; }
    }
}
