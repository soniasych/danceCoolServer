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

        public User GetUserByPhoneNumber(string phoneNumber)
        {
            return Context.Users.FirstOrDefault(user => user.PhoneNumber == phoneNumber);
        }

        public IEnumerable<User> GetStudents()
        {
            return Context.Users.Where(user => user.RoleId == 1).ToList();
        }

        public IEnumerable<User> GetStudentsByGroupId(int groupId)
        {
            var groupStudents = Context.Users
                .Include(user => user.Role)
                .Include(user => user.UserGroups).ThenInclude(ug => ug.Group)
                .Where(user => user.RoleId == 1 && user.UserGroups.Any(ug => ug.GroupId == groupId))
                .ToList();

            return groupStudents;
        }

        public IEnumerable<User> GetStudentsNotInGroup(int groupId)
        {
            var group = Context.Groups.Find(groupId);
            int[] engagedStudentsIds = GetStudentsByGroupId(groupId).Select(student => student.Id).ToArray();
            return Context.Users.Include(user => user.Role)
                .Where(user => !engagedStudentsIds.Contains(user.Id) && user.RoleId == 1);
        }

        public IEnumerable<User> GetMentors()
        {
            return null;
            //return Context.Users.Where(user => user.UserRoles.
            //        Any(ur => ur.RoleId == 2));
        }

        public IEnumerable<User> Search(string key)
        {
            return Context.Users.Where(user => user.LastName.Contains(key.ToLower()));
        }
    }
}