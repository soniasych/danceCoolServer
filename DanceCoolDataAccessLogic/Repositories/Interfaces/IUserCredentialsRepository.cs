using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IUserCredentialsRepository : IRepository<UserCredentials>
    {
        IEnumerable<UserCredentials> GetAllUserCredentials();
        UserCredentials GetUserCredentialsById(int id);
        UserCredentials GetUserCredentialsByUserId(int userId);
    }
}
