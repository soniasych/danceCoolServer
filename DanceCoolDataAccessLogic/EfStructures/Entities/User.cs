using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DanceCoolDataAccessLogic.EfStructures.Entities
{
    public partial class User
    {
        public User()
        {
            Attendances = new HashSet<Attendance>();
            GroupPrimaryMentors = new HashSet<Group>();
            GroupSecondaryMentors = new HashSet<Group>();
            PaymentUserReceivers = new HashSet<Payment>();
            PaymentUserSenders = new HashSet<Payment>();
            UserGroups = new HashSet<UserGroup>();
        }

        public int Id { get; set; }
        [Required]
        [StringLength(512)]
        public string FirstName { get; set; }
        [Required]
        [StringLength(512)]
        public string LastName { get; set; }
        [StringLength(17)]
        public string PhoneNumber { get; set; }
        public int RoleId { get; set; }
        public int PayedLessons { get; set; }

        [ForeignKey("RoleId")]
        [InverseProperty("Users")]
        public virtual Role Role { get; set; }
        [InverseProperty("User")]
        public virtual UserCredential UserCredential { get; set; }
        [InverseProperty("PresentStudent")]
        public virtual ICollection<Attendance> Attendances { get; set; }
        [InverseProperty("PrimaryMentor")]
        public virtual ICollection<Group> GroupPrimaryMentors { get; set; }
        [InverseProperty("SecondaryMentor")]
        public virtual ICollection<Group> GroupSecondaryMentors { get; set; }
        [InverseProperty("UserReceiver")]
        public virtual ICollection<Payment> PaymentUserReceivers { get; set; }
        [InverseProperty("UserSender")]
        public virtual ICollection<Payment> PaymentUserSenders { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<UserGroup> UserGroups { get; set; }
    }
}