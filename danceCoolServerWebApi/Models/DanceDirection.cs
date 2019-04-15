using System;
using System.Collections.Generic;

namespace danceCoolServer.Models
{
    public partial class DanceDirection
    {
        public DanceDirection()
        {
            Group = new HashSet<Group>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Group> Group { get; set; }
    }
}
