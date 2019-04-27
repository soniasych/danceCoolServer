using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IGroupRepository : IRepository<Group>
    {
        IEnumerable<Group> GetAllGroups();
        Group GetGroupById(int id);
        IEnumerable<Group> GetGroupsByLevelId(int id);
        IEnumerable<Group> GetGroupsByDirectionId(int id);

    }
}
