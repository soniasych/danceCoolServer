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

        void AddUser(User user);
        void AddUserRange(IEnumerable<User> users);
        

    }
}
