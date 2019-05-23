using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DanceCoolDataAccessLogic.EfStructures.Entities
{
    public partial class UserCredentials
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        [Required]
        [StringLength(254)]
        public string Email { get; set; }
        [Required]
        [Column(TypeName = "text")]
        public string Password { get; set; }

        [ForeignKey("UserId")]
        [InverseProperty("UserCredentials")]
        public virtual User User { get; set; }
    }
}
