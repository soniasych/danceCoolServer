using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IGroupRepository : IRepository<Group>
    {
        IEnumerable<Group> GetAllGroups();
        Group GetGroupById(int groupId);
        IEnumerable<Group> GetGroupsByLevelId(int levelId);
        IEnumerable<Group> GetGroupsByDirectionId(int directionId);
        IEnumerable<Group> GetGroupsByUserId(int userId);
    }
}
