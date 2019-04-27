using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.UnitOfWork;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    class UserService : BaseService, IUserService
    {
        public UserService(IUnitOfWork db) : base(db)
        {

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

        public UserDTO GetUserByIdAsync(int id)
        {
            var userModel = db.Users.GetUserById(id);
            if (userModel != null)
            {
                return null;
            }

            return UserModelToUserDTO(userModel);
        }

        private UserDTO UserModelToUserDTO(User userModel) => 
            new UserDTO(userModel.Id,
                    userModel.FirstName,
                    userModel.LastName,
                    userModel.PhoneNumber);
    }
}
