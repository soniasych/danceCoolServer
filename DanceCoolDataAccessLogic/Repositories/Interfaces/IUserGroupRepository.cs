using System.Collections.Generic;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IUserGroupRepository : IRepository<UserGroup>
    {
        int[] GetUsersIdByGroupId(int groupId);
        int[] GetAllGroupsByUserId(int userId);
    }
}
