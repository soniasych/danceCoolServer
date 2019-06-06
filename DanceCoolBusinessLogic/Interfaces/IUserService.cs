using System.Collections.Generic;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    public interface IUserService
    {
        IEnumerable<UserDTO> GetAllUsers();
        UserDTO GetUserById(int userId);
        UserDTO GetUserByEmail(string email);
        UserDTO GetUserByPhoneNumber(string phoneNumber);
        IEnumerable<UserDTO> GetUsersFromGroup(int groupId);
        IEnumerable<UserDTO> GetAllStudents();
        IEnumerable<UserDTO> GetMentors();
        void AddUser(NewUserDTO userDTO);
        void AddUserToGroup(int userId, int groupId);
        IEnumerable<UserDTO> Search(string key);
        IEnumerable<User> GetAllUserModels();
        
    }
}