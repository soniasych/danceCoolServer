using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;

namespace DanceCoolDataAccessLogic.Repositories
{
    class UserGroupRepository : BaseRepository<UserGroup>, IUserGroupRepository 
    {
        public UserGroupRepository(DanceСoolContext context) : base(context)
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
