using System.Collections.Generic;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IUserGroupRepository : IRepository<UserGroup>
    {
        bool AddUserToGroup(int userId, int groupId);
    }
}
