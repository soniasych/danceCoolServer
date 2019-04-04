using System.Collections.Generic;

namespace danceCoolServer.Models
{
    public partial class User
    {
        public User()
        {
            UserCredentials = new HashSet<UserCredentials>();
            UserGroup = new HashSet<UserGroup>();
            UserRole = new HashSet<UserRole>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public virtual ICollection<UserCredentials> UserCredentials { get; set; }
        public virtual ICollection<UserGroup> UserGroup { get; set; }
        public virtual ICollection<UserRole> UserRole { get; set; }
    }
}
