using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IUserCredentialsRepository : IRepository<UserCredential>
    {
        IEnumerable<UserCredential> GetAllUserCredentials();
        UserCredential GetUserCredentialsById(int id);
        UserCredential GetUserCredentialsByUserId(int userId);
    }
}
