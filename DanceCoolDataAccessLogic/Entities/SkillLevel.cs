using System;
using System.Collections.Generic;

namespace DanceCoolDataAccessLogic.Entities
{
    public partial class SkillLevel
    {
        public SkillLevel()
        {
            Groups = new HashSet<Group>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Group> Groups { get; set; }
    }
}
