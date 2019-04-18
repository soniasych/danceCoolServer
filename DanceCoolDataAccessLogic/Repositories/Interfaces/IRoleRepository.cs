using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    interface IRoleRepository : IRepository<Role>
    {
        Task<IEnumerable<Role>> GetAllRolesAsync();
        Task<Role> GetAsync(int id);
    }
}
