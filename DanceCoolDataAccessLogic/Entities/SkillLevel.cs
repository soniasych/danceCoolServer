using System;
using System.Collections.Generic;

namespace DanceCoolDataAccessLogic.Entities
{
    public partial class SkillLevel
    {
        public SkillLevel()
        {
            Group = new HashSet<Group>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Group> Group { get; set; }
    }
}
