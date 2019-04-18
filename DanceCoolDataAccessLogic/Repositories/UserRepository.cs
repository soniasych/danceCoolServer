using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DanceCoolDataAccessLogic.Repositories
{
    class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(DanceCoolContext context) : base(context)
        {
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return Context.Users;
        }

        public async Task<User> GetAsync(int id)
        {
            return await Context.Users.FirstOrDefaultAsync(user => user.Id == id);
        }
    }
}
