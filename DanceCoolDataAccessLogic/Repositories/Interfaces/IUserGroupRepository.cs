using System.Collections.Generic;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IUserGroupRepository : IRepository<UserGroup>
    {
        bool AddUserToGroup(int userId, int groupId);
    }
}
