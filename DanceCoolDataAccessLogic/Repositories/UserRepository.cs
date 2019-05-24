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
            var students = Context.Users.Include(u => u.UserRoles.Where(ur => ur.RoleId == 1)).ToList();
            return students;
        }

        public IEnumerable<User> GetStudentsNotInGroup(int groupId)
        {
            var students = GetStudents();
            var usersInGroupArray = Context.UserGroups.Where(ug => ug.GroupId != groupId)
                .Select(ug => ug.UserId)
                .ToArray();

            return students.Where(user => usersInGroupArray.Contains(user.Id));
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
            return Context.Users.Where(user => user.LastName.Contains(key.ToLower()));
        }
    }
}