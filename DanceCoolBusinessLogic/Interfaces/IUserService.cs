using System.Collections.Generic;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    interface IUserService
    {
        IEnumerable<UserDTO> GetAllUsers();
        UserDTO GetUserById(int userId);
        IEnumerable<UserDTO> GetUsersFromGroup(int groupId);
    }
}