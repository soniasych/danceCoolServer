using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    interface IUserCredentialsRepository : IRepository<UserCredentials>
    {
        Task<IEnumerable<UserCredentials>> GetAllUserCredentialsAsync();
        Task<UserCredentials> GetAsync(int id);
    }
}
