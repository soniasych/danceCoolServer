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
            return Context.Users.Include(user => user.Role).ToList();
        }

        public User GetUserById(int userId)
        {
            return Context.Users
                .Include(user=> user.Role)
                .SingleOrDefault(user => user.Id == userId);
        }

        public User GetUserByPhoneNumber(string phoneNumber)
        {
            return Context.Users
                .Include(user => user.Role)
                .FirstOrDefault(user => user.PhoneNumber.Contains(phoneNumber));
        }

        public IEnumerable<User> GetStudents()
        {
            return Context.Users
                .Include(user =>user.Role)
                .Where(user => user.RoleId == 1).ToList();
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
            var engagedStudentsIds = GetStudentsByGroupId(groupId).Select(student => student.Id).ToArray();
            return Context.Users.Include(user => user.Role)
                .Where(user => !engagedStudentsIds.Contains(user.Id) && user.RoleId == 1);
        }

        public IEnumerable<User> GetMentors()
        {
            return Context.Users
                .Include(user => user.Role)
                .Where(user => user.RoleId == 2).ToList();
        }

        public IEnumerable<User> GetMentorsNotInGroup(int[] actualMentors)
        {
            var unUsedMentors = Context.Users
                .Include(user => user.Role)
                .Where(user => !actualMentors.Contains(user.Id) && (user.RoleId == 2 || user.RoleId == 3));

            return unUsedMentors;
        }

        public IEnumerable<User> Search(string key)
        {
            return Context.Users
                .Include(user => user.Role)
                .Where(user => user.LastName.Contains(key.ToLower()));
        }

        public User GetUserByEmail(string email)
        {
            var credentials = Context.UserCredentials.FirstOrDefault(uc => uc.Email == email);
            return credentials == null ? null : Context.Users.Find(credentials.UserId);
        }

        public bool ChangeUserRole(int userId, int newRoleId)
        {
            var userModel = Context.Users.Find(userId);
            userModel.RoleId = newRoleId;
            Context.SaveChanges();
            return true;
        }
    }
}