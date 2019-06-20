using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DanceCoolDataAccessLogic.EfStructures.Entities
{
    public partial class Lesson
    {
        public Lesson()
        {
            Attendances = new HashSet<Attendance>();
        }

        public int Id { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime Date { get; set; }
        [Required]
        [StringLength(1024)]
        public string Room { get; set; }
        public int? GroupId { get; set; }

        [ForeignKey("GroupId")]
        [InverseProperty("Lessons")]
        public virtual Group Group { get; set; }
        [InverseProperty("Lesson")]
        public virtual ICollection<Attendance> Attendances { get; set; }
    }
}