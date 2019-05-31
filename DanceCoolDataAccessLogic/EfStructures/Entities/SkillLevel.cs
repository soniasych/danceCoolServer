using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DanceCoolDataAccessLogic.EfStructures.Entities
{
    public partial class SkillLevel
    {
        public SkillLevel()
        {
            Groups = new HashSet<Group>();
        }

        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(1024)]
        public string Description { get; set; }

        [InverseProperty("Level")]
        public virtual ICollection<Group> Groups { get; set; }
    }
}