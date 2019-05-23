using System;
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
            GroupsPrimaryMentor = new HashSet<Group>();
            GroupsSecondaryMentor = new HashSet<Group>();
            PaymentsUserReceiver = new HashSet<Payment>();
            PaymentsUserSender = new HashSet<Payment>();
            UserCredentials = new HashSet<UserCredentials>();
            UserGroups = new HashSet<UserGroup>();
            UserRoles = new HashSet<UserRole>();
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

        [InverseProperty("PresentStudent")]
        public virtual ICollection<Attendance> Attendances { get; set; }
        [InverseProperty("PrimaryMentor")]
        public virtual ICollection<Group> GroupsPrimaryMentor { get; set; }
        [InverseProperty("SecondaryMentor")]
        public virtual ICollection<Group> GroupsSecondaryMentor { get; set; }
        [InverseProperty("UserReceiver")]
        public virtual ICollection<Payment> PaymentsUserReceiver { get; set; }
        [InverseProperty("UserSender")]
        public virtual ICollection<Payment> PaymentsUserSender { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<UserCredentials> UserCredentials { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<UserGroup> UserGroups { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
