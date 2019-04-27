using System.Collections.Generic;
using System.Linq;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;

namespace DanceCoolDataAccessLogic.Repositories
{
    internal class UserRepository : BaseRepository<User>, IUserRepository
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

        public IEnumerable<User> GetUsersByGroupId(int groupId)
        {
            var usersInGroupArray = Context.UserGroups.Where(ug => ug.GroupId == groupId)
                .ToArray()
                .Select(user => user.Id);

            var usersInGroup = Context.Users.Where(user => usersInGroupArray.Contains(user.Id));
            return usersInGroup;
        }
    }
}