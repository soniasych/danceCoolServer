using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IUserCredentialsRepository : IRepository<UserCredentials>
    {
        Task<IEnumerable<UserCredentials>> GetAllUserCredentialsAsync();
        Task<UserCredentials> GetUserCredentialsByIdAsync(int id);
        Task<UserCredentials> GetUserCredentialsByUserIdAsync(int userId);
    }
}
