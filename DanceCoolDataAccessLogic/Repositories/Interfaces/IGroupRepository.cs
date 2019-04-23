using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IGroupRepository : IRepository<Group>
    {
        Task<IEnumerable<Group>> GetAllGroupsAsync();
        Task<Group> GetGroupByIdAsync(int id);
        Task<IEnumerable<Group>> GetGroupsByLevelIdAsync(int id);
        Task<IEnumerable<Group>> GetGroupsByDirectionIdAsync(int id);
    }
}
