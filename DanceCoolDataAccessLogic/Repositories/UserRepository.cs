using System.Collections.Generic;
using System.Linq;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

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
            return Context.Users.ToList();
        }

        public User GetUserById(int userId)
        {
            return Context.Users.Find(userId);
        }

        public IEnumerable<User> GetUsersByGroupId(int groupId)
        {
            return Context.Users
                .Where(user => user.UserGroups.Any(ug => ug.GroupId == groupId) || user.UserGroups.Count == 0)
                .ToList();
        }

        public IEnumerable<User> GetStudents()
        {
            return Context.Users.Include(u => u.UserRoles.Where(ur => ur.RoleId == 1)).ToList();
        }

        public IEnumerable<User> GetStudentsNotInGroup(int groupId)
        {
            return Context.Users
                .Where(user => user.UserGroups.Any(ug => ug.GroupId != groupId) || user.UserGroups.Count == 0)
                .ToList();
        }

        public IEnumerable<User> GetMentors()
        {
            return Context.Users.Include(u => u.UserRoles.Where(ur => ur.RoleId == 2)).ToList();
        }

        public IEnumerable<User> Search(string key)
        {
            return Context.Users.Where(user => user.LastName.Contains(key.ToLower()));
        }
    }
}