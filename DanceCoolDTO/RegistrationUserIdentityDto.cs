using DanceCoolDTO.Infrastructure;
using System.ComponentModel.DataAnnotations;

namespace DanceCoolDTO
{
    public class RegistrationUserIdentityDto
    {
        public RegistrationUserIdentityDto(string firstName, string lastName, string phoneNumber, string email, string password)
        {
            FirstName = firstName;
            LastName = lastName;
            PhoneNumber = phoneNumber;
            Email = email;
            Password = password;
        }

        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        [RegularExpression(ValidationRules.EMAIL_REGEX,
            ErrorMessage = "Email not valid")]
        public string Email { set; get; }
        [Required]
        public string Password { get; set; }
    }
}
