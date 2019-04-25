using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    interface IUserService
    {
        Task<IEnumerable<UserDTO>> GetAllUsersAsync();
        Task<UserDTO> GetUserByIdAsync(int id);
    }
}