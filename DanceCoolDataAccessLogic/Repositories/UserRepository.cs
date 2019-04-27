using System.Collections.Generic;
using System.Linq;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;

namespace DanceCoolDataAccessLogic.Repositories
{
    class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(DanceCoolContext context) : base(context)
        {
        }

        public IEnumerable<User> GetAllUsers()
        {
            return Context.Users;
        }

        public User GetUserById(int userId)
        {
            return Context.Users.Find(userId);
        }

        public IEnumerable<User> GetUserByGroupId(int groupId)
        {
            var usersInGroupArray = Context.UserGroups.Where(ug => ug.GroupId == groupId)
            .Select(ug => ug.UserId).ToArray();
            var usersInGroup = Context.Users.OrderBy(user => usersInGroupArray.Contains(user.Id)).ToList();
            return usersInGroup;
        }
    }
}
