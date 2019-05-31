using System.Collections.Generic;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using System.Linq;

namespace DanceCoolDataAccessLogic.Repositories
{
    public class UserCredentialsRepository : BaseRepository<UserCredential>, IUserCredentialsRepository
    {
        public UserCredentialsRepository(DanceCoolContext context) : base(context)
        {
        }

        public IEnumerable<UserCredential> GetAllUserCredentials()
        {
            return Context.UserCredentials;
        }

        public UserCredential GetUserCredentialsById(int id)
        {
            return Context.UserCredentials.Find(id);
        }

        public UserCredential GetUserCredentialsByUserId(int userId)
        {
            return Context.UserCredentials.First(ucreds => ucreds.UserId == userId);
        }

        public bool IsEmailReserved(string checkedEmail)
        {
            return Context.UserCredentials.Any(credential => credential.Email == checkedEmail);
        }
        public UserCredential GetCredentialsByEmail(string email)
        {
            return Context.UserCredentials.FirstOrDefault(credential => credential.Email == email);
        }
    }
}
