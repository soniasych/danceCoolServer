using System.Collections.Generic;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.UnitOfWork;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    public class UserService : BaseService, IUserService
    {
        public UserService(IUnitOfWork db) : base(db)
        {

        }

        public void AddUser(UserDTO userDTO)
        {
            var user = UserDTOToUserModel(userDTO);
            db.Users.AddUser(user);
        }
       
        public void AddUserToGroup(UserDTO user, GroupDTO group)
        {
            db.UserGroups.AddUserToGroup(user.Id, group.GroupId);
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

        private UserDTO UserModelToUserDTO(User userModel) => 
            new UserDTO(userModel.Id,
                    userModel.FirstName,
                    userModel.LastName,
                    userModel.PhoneNumber);

        private User UserDTOToUserModel(UserDTO userDto) =>
            new User
            {
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                PhoneNumber = userDto.PhoneNumber 
            };

    }
}
