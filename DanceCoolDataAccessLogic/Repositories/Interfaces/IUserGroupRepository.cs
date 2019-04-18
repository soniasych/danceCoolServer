using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    interface IUserGroupRepository : IRepository<UserGroup>
    {
        Task<IEnumerable<UserGroup>> GetAllUserGroupsAsync();
        Task<UserGroup> GetAsync(int id);
    }
}
