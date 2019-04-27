using System.Collections.Generic;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    public interface IUserService
    {
        IEnumerable<UserDTO> GetAllUsers();
        UserDTO GetUserById(int userId);
        IEnumerable<UserDTO> GetUsersFromGroup(int groupId);
    }
}