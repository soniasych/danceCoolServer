using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IGroupRepository : IRepository<Group>
    {
        IEnumerable<Group> GetAllGroups();
        Task<Group> GetGroupByIdAsync(int id);
        Task<IEnumerable<Group>> GetGroupsByLevelIdAsync(int id);
    }
}
