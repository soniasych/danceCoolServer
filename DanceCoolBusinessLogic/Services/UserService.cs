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

        public async Task<IEnumerable<UserDTO>> GetAllUsersAsync()
        {
            var users = await db.Users.GetAllUsersAsync();
            if (users == null)
            {
                return null;
            }

            var dtos = new List<UserDTO>();

            foreach (var user in users)
            {
                dtos.Add(await UserModelToUserDTOAsync(user));
            }

            return dtos;
        }

        public async Task<UserDTO> GetUserByIdAsync(int id)
        {
            var userModel = await db.Users.GetAsync(id);
            if (userModel != null)
            {
                return null;
            }

            return await UserModelToUserDTOAsync(userModel);
        }

        private async Task<UserDTO> UserModelToUserDTOAsync(User userModel)
        {
            var task = new Task<UserDTO>(() =>
            {
                var userDto = new UserDTO(userModel.Id,
                    userModel.FirstName,
                    userModel.LastName,
                    userModel.PhoneNumber);
                return userDto;
            });

            task.Start();
            return await task;
        }
    }
}
