using System.ComponentModel.DataAnnotations.Schema;

namespace DanceCoolDataAccessLogic.EfStructures.Entities
{
    public partial class Attendance
    {
        public int Id { get; set; }
        public int LessonId { get; set; }
        public int PresentStudentId { get; set; }

        [ForeignKey("LessonId")]
        [InverseProperty("Attendances")]
        public virtual Lesson Lesson { get; set; }
        [ForeignKey("PresentStudentId")]
        [InverseProperty("Attendances")]
        public virtual User PresentStudent { get; set; }
    }
}