using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IUserRoleRepository : IRepository<UserRole>
    {
        IEnumerable<UserRole> GetAllUserRoles();
        UserRole GetUserRoleById(int id);
    }
}
