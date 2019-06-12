﻿using System.Collections.Generic;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    public interface IUserService
    {
        IEnumerable<UserDTO> GetAllUsers();
        UserDTO GetUserById(int userId);
        UserDTO GetUserByEmail(string email);
        UserDTO GetUserByPhoneNumber(string phoneNumber);
        IEnumerable<UserDTO> GetAllStudents();
        IEnumerable<UserDTO> GetUsersFromGroup(int groupId);
        IEnumerable<UserDTO> GetStudentsNotInCurrentGroup(int groupId);
        IEnumerable<UserDTO> GetMentors();
        IEnumerable<UserDTO> GetMentorsNotInGroup(int[] usedMentors);
        void AddUser(NewUserDTO userDTO);
        void AddUserToGroup(int userId, int groupId);
        IEnumerable<UserDTO> Search(string key);
    }
}