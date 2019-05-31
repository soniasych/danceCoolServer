using System.Collections.Generic;
using DanceCoolDataAccessLogic.EfStructures.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IUserCredentialsRepository : IRepository<UserCredential>
    {
        IEnumerable<UserCredential> GetAllUserCredentials();
        UserCredential GetUserCredentialsById(int id);
        UserCredential GetUserCredentialsByUserId(int userId);
        bool IsEmailReserved(string checkedEmail);
        UserCredential GetCredentialsByEmail(string email);
    }
}
