using System;
using System.Collections.Generic;

namespace DanceCoolDataAccessLogic.Entities
{
    public partial class Attendance
    {
        public int Id { get; set; }
        public int LessonId { get; set; }
        public int PresntStudentId { get; set; }

        public virtual Lesson Lesson { get; set; }
        public virtual User PresntStudent { get; set; }
    }
}
