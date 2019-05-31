using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DanceCoolDataAccessLogic.EfStructures.Entities
{
    public partial class UserCredential
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        [Required]
        [StringLength(254)]
        public string Email { get; set; }
        [Required]
        public byte[] PasswordHash { get; set; }
        [Required]
        public byte[] PasswordSalt { get; set; }

        [ForeignKey("UserId")]
        [InverseProperty("UserCredential")]
        public virtual User User { get; set; }
    }
}