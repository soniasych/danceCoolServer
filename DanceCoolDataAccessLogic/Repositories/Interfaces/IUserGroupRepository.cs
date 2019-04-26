using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IUserGroupRepository : IRepository<UserGroup>
    {
        IEnumerable<UserGroup> GetAllUserGroups();
        UserGroup GetUserGrouupById(int id);
    }
}
