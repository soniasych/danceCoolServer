using System.Collections.Generic;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDataAccessLogic.UnitOfWork;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    public class UserService : BaseService, IUserService
    {
        public UserService(IUnitOfWork db) : base(db)
        {

        }

        public void AddUser(NewUserDTO userDTO)
        {
            var user = NewUserDTOToUserModel(userDTO);
            db.Users.AddEntity(user);
            db.Save();
        }
       
        public void AddUserToGroup(int userId, int groupId)
        {
            db.UserGroups.AddUserToGroup(userId, groupId);
        }

        public IEnumerable<UserDTO> GetAllUsers()
        {
            var users = db.Users.GetAllUsers();
            if (users == null)
            {
                return null;
            }

            var dtos = new List<UserDTO>();

            foreach (var user in users)
            {
                dtos.Add(UserModelToUserDTO(user));
            }

            return dtos;
        }

        public UserDTO GetUserById(int id)
        {
            var userModel = db.Users.GetUserById(id);
            if (userModel == null)
            {
                return null;
            }

            return UserModelToUserDTO(userModel);
        }

        public IEnumerable<UserDTO> GetUsersFromGroup(int groupId)
        {           
            var userModelsInGroup = db.Users.GetUsersByGroupId(groupId);
            
            if (userModelsInGroup == null)
            {
                return null;
            }

            var usersInGroup = new List<UserDTO>();

            foreach (var item in userModelsInGroup)
            {
                usersInGroup.Add(UserModelToUserDTO(item));
            }

            return usersInGroup;
        }

        public IEnumerable<UserDTO> GetAllStudents()
        {
            var studentModels = db.Users.GetStudents();

            if (studentModels == null)
            {
                return null;
            }

            var studentsDtos = new List<UserDTO>();

            foreach (var item in studentModels)
            {
                studentsDtos.Add(UserModelToUserDTO(item));
            }
            return studentsDtos;

        }

        public IEnumerable<UserDTO> Search(string key)
        {
            var users = db.Users.Search(key);
            var dtos = new List<UserDTO>();

            foreach (var user in users)
            {
                dtos.Add(UserModelToUserDTO(user));
            }

            return dtos;
        }

        private UserDTO UserModelToUserDTO(User userModel) => 
            new UserDTO(userModel.Id,
                    userModel.FirstName,
                    userModel.LastName,
                    userModel.PhoneNumber);

        private User NewUserDTOToUserModel(NewUserDTO userDto) =>
            new User
            {
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                PhoneNumber = userDto.PhoneNumber 
            };
    }
}
