using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    interface IUserService
    {
        IEnumerable<UserDTO> GetAllUsers();
        UserDTO GetUserByIdAsync(int id);
    }
}