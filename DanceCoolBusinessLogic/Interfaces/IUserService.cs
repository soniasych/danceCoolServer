using System.Collections.Generic;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    public interface IUserService
    {
        IEnumerable<UserDTO> GetAllUsers();
        UserDTO GetUserById(int userId);
        IEnumerable<UserDTO> GetUsersFromGroup(int groupId);
        IEnumerable<UserDTO> GetAllStudents();
        void AddUser(NewUserDTO userDTO);
        void AddUserToGroup(int userId, int groupId);
        IEnumerable<UserDTO> Search(string key);
        IEnumerable<User> GetAllUserModels();
    }
}