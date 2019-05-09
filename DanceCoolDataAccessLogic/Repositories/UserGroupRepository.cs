using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using System.Linq;

namespace DanceCoolDataAccessLogic.Repositories
{
    class UserGroupRepository : BaseRepository<UserGroup>, IUserGroupRepository 
    {
        public UserGroupRepository(DanceCoolContext context) : base(context)
        {
        }

        public bool AddUserToGroup(int userId, int groupId)
        {
            Context.UserGroups.Add(new UserGroup
            {
                UserId = userId,
                GroupId = groupId
            });
            return true;
        }
    }
}
