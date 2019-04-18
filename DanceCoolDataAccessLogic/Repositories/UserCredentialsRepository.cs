using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DanceCoolDataAccessLogic.Repositories
{
    class UserCredentialsRepository : BaseRepository<UserCredentials>, IUserCredentialsRepository
    {
        public UserCredentialsRepository(DanceCoolContext context) : base(context)
        {
        }

        public async Task<IEnumerable<UserCredentials>> GetAllUserCredentialsAsync()
        {
            return Context.UserCredentials;
        }

        public Task<UserCredentials> GetAsync(int id)
        {
            return Context.UserCredentials.FirstOrDefaultAsync(credentials => credentials.Id == id);
        }
    }
}
