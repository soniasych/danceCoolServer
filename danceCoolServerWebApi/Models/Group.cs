using System;
using System.Collections.Generic;

namespace danceCoolServer.Models
{
    public partial class Group
    {
        public Group()
        {
            Lesson = new HashSet<Lesson>();
            UserGroup = new HashSet<UserGroup>();
        }

        public int Id { get; set; }
        public int DirectionId { get; set; }
        public int LevelId { get; set; }

        public virtual DanceDirection Direction { get; set; }
        public virtual SkillLevel Level { get; set; }
        public virtual ICollection<Lesson> Lesson { get; set; }
        public virtual ICollection<UserGroup> UserGroup { get; set; }
    }
}
