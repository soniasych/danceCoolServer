using System.Collections.Generic;
using DanceCoolDataAccessLogic.EfStructures.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IGroupRepository : IRepository<Group>
    {
        IEnumerable<Group> GetAllGroups();
        Group GetGroupById(int groupId);
        IEnumerable<Group> GetGroupsByUserId(int userId);

        void AddGroup(Group group);

        bool ChangeGroupLevel(int groupId, int levelId);
        bool ChangeGroupMentors(int groupId, int newPrimaryMentorId, int newSecMentorId);

    }
}
