using System.Collections.Generic;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using System.Linq;

namespace DanceCoolDataAccessLogic.Repositories
{
    class UserCredentialsRepository : BaseRepository<UserCredential>, IUserCredentialsRepository
    {
        public UserCredentialsRepository(DanceСoolContext context) : base(context)
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
    }
}
