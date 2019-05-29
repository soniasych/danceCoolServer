using DanceCoolDTO.Infrastructure;
using System.ComponentModel.DataAnnotations;

namespace DanceCoolDTO
{
    public class UserIdentityDto
    {
        public UserIdentityDto(string email, string password, int id, string firstName, string lastName, string role)
        {
            Email = email;
            Password = password;
            LastName = lastName;
            FirstName = firstName;
            Id = id;
            Role = role;
        }

        public int Id { set; get; }
        [Required]
        [StringLength(ValidationRules.MAX_LENGTH_NAME,
           ErrorMessage = "FirstName too long")]
        [RegularExpression(ValidationRules.ONLY_LETTERS,
           ErrorMessage = "FirstName not valid")]
        public string FirstName { set; get; }
        [Required]
        [StringLength(ValidationRules.MAX_LENGTH_NAME,
            ErrorMessage = "LastName too long")]
        [RegularExpression(ValidationRules.ONLY_LETTERS,
            ErrorMessage = "LastName not valid")]
        public string LastName { set; get; }
        [Required]
        [RegularExpression(ValidationRules.EMAIL_REGEX,
            ErrorMessage = "Email not valid")]
        public string Email { set; get; }
        [Required]
        public string Password { get; set; }
        public string Role { set; get; }
    }
}
