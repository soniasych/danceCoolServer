using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DanceCoolDataAccessLogic.EfStructures.Entities
{
    public partial class Abonnement
    {
        public Abonnement()
        {
            Payments = new HashSet<Payment>();
        }

        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string AbonnementName { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal Price { get; set; }

        [InverseProperty("Abonnement")]
        public virtual ICollection<Payment> Payments { get; set; }
    }
}