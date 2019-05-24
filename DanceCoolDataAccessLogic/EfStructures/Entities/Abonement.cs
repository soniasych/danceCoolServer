using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DanceCoolDataAccessLogic.EfStructures.Entities
{
    [Table("Abonements")]
    public partial class Abonement
    {
        public Abonement()
        {
            Payments = new HashSet<Payment>();
        }

        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string AbonementName { get; set; }

        [InverseProperty("Abonement")]
        public virtual ICollection<Payment> Payments { get; set; }
    }
}