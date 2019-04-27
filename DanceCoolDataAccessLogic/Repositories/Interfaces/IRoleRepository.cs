using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IRoleRepository : IRepository<Role>
    {
        IEnumerable<Role> GetAllRoles();
        Role GetRoleById(int id);
    }
}
