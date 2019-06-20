using System.Collections.Generic;
using DanceCoolDataAccessLogic.EfStructures.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        IEnumerable<User> GetAllUsers();
        User GetUserById(int userId);
        IEnumerable<User> GetStudents();
        IEnumerable<User> GetStudentsByGroupId(int groupId);
        IEnumerable<User> GetStudentsNotInGroup(int groupId);
        IEnumerable<User> GetMentors();
        IEnumerable<User> GetMentorsNotInGroup(int[] actualMentors);
        void AddUserRange(IEnumerable<User> users);
        IEnumerable<User> Search(string key);
        
        User GetUserByPhoneNumber(string phoneNumber);
        User GetUserByEmail(string email);
        bool ChangeUserRole(int userId, int newRoleId);
    }
}
