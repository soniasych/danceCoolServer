using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        IEnumerable<User> GetAllUsers();
        User GetUserById(int userId);
        IEnumerable<User> GetUsersByGroupId(int groupId);
        IEnumerable<User> GetStudents();
        void AddUser(User user);
        void AddUserRange(IEnumerable<User> users);
        IEnumerable<User> Search(string key);
    }
}
