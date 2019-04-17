using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    interface IGroupRepository : IRepository<Group>
    {
        Task<IEnumerable<Group>> GetAllGroupsAsync();
        Task<Group> GetAsync(int id);
    }
}
