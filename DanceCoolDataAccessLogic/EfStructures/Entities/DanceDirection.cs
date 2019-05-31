using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DanceCoolDataAccessLogic.EfStructures.Entities
{
    public partial class DanceDirection
    {
        public DanceDirection()
        {
            Groups = new HashSet<Group>();
        }

        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [InverseProperty("Direction")]
        public virtual ICollection<Group> Groups { get; set; }
    }
}