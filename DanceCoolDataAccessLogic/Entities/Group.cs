using System;
using System.Collections.Generic;

namespace DanceCoolDataAccessLogic.Entities
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

        public virtual DanceDirection Direction { get; set; }
        public virtual SkillLevel Level { get; set; }
        public virtual User PrimaryMentor { get; set; }
        public virtual User SecondaryMentor { get; set; }
        public virtual ICollection<Lesson> Lessons { get; set; }
        public virtual ICollection<UserGroup> UserGroups { get; set; }
    }
}
