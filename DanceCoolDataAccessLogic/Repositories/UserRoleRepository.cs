using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DanceCoolDataAccessLogic.Repositories
{
    class UserRoleRepository : BaseRepository<UserRole>, IUserRoleRepository
    {
        public UserRoleRepository(DanceCoolContext context) : base(context)
        {
        }

        public async Task<IEnumerable<UserRole>> GetAllUserRolesAsync() => Context.UserRoles;

        public Task<UserRole> GetAsync(int id)
        {
            return Context.UserRoles.FirstOrDefaultAsync(userRole => userRole.Id == id);
        }
    }
}
