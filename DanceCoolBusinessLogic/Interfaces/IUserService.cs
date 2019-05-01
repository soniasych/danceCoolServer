using System.Collections.Generic;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    public interface IUserService
    {
        IEnumerable<UserDTO> GetAllUsers();
        UserDTO GetUserById(int userId);
        IEnumerable<UserDTO> GetUsersFromGroup(int groupId);

        void AddUser(UserDTO user);
        void AddUserToGroup(UserDTO user, GroupDTO group);
    }
}