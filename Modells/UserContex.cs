using Microsoft.EntityFrameworkCore;

namespace CmdApi.Models
{
    public class UserContex : DbContext
    {
        public UserContex(DbContextOptions<UserContex> options) : base (options)
        {

        }
        public DbSet<User> User {get; set;}
    }
}