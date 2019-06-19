using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DanceCoolDataAccessLogic.EfStructures.Entities
{
    public partial class Group
    {
        public Group()
        {
            Lessons = new HashSet<Lesson>();
            UserGroups = new HashSet<UserGroup>();
        }

        public int Id { get; set; }
        public int PrimaryMentorId { get; set; }
        public int? SecondaryMentorId { get; set; }
        public int DirectionId { get; set; }
        public int? LevelId { get; set; }
        [StringLength(256)]
        public string GroupName { get; set; }

        [ForeignKey("DirectionId")]
        [InverseProperty("Groups")]
        public virtual DanceDirection Direction { get; set; }
        [ForeignKey("LevelId")]
        [InverseProperty("Groups")]
        public virtual SkillLevel Level { get; set; }
        [ForeignKey("PrimaryMentorId")]
        [InverseProperty("GroupPrimaryMentors")]
        public virtual User PrimaryMentor { get; set; }
        [ForeignKey("SecondaryMentorId")]
        [InverseProperty("GroupSecondaryMentors")]
        public virtual User SecondaryMentor { get; set; }
        [InverseProperty("Group")]
        public virtual ICollection<Lesson> Lessons { get; set; }
        [InverseProperty("Group")]
        public virtual ICollection<UserGroup> UserGroups { get; set; }
    }
}