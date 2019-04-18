using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    interface IUserRoleRepository : IRepository<UserRole>
    {
        Task<IEnumerable<UserRole>> GetAllUserRolesAsync();
        Task<UserRole> GetAsync(int id);
    }
}
