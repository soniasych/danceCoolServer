using System;
using System.Collections.Generic;

namespace DanceCoolDataAccessLogic.Entities
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
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }

        public virtual ICollection<Attendance> Attendances { get; set; }
        public virtual ICollection<Group> GroupsPrimaryMentor { get; set; }
        public virtual ICollection<Group> GroupsSecondaryMentor { get; set; }
        public virtual ICollection<Payment> PaymentsUserReceiver { get; set; }
        public virtual ICollection<Payment> PaymentsUserSender { get; set; }
        public virtual ICollection<UserCredentials> UserCredentials { get; set; }
        public virtual ICollection<UserGroup> UserGroups { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
