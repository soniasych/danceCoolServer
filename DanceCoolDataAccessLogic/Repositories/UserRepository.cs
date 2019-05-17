using System.Collections.Generic;
using System.Linq;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;

namespace DanceCoolDataAccessLogic.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(DanceCoolContext context) : base(context)
        {
        }

        public void AddUserRange(IEnumerable<User> users)
        {
            Context.Users.AddRange(users);
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
                .Select(user => user.UserId)
                .ToArray();

            var usersInGroup = Context.Users.Where(user => usersInGroupArray.Contains(user.Id));
            return usersInGroup;
        }

        public IEnumerable<User> GetStudents()
        {
            var studentsIdArray = Context.UserRoles.Where(ur => ur.RoleId == 1)
                .Select(ur => ur.UserId)
                .ToArray();

            return Context.Users.Where(user => studentsIdArray.Contains(user.Id));
        }

        public IEnumerable<User> GetMentors()
        {
            var mentorsIdArray = Context.UserRoles.Where(ur => ur.RoleId == 2)
                .Select(ur => ur.UserId)
                .ToArray();

            return Context.Users.Where(user => mentorsIdArray.Contains(user.Id));
        }

        public IEnumerable<User> Search(string key)
        {
            return Context.Users.Where(user => user.FirstName.Contains(key.ToLower()));
        }
    }
}