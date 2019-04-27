using System.Collections.Generic;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using System.Linq;

namespace DanceCoolDataAccessLogic.Repositories
{
    class UserCredentialsRepository : BaseRepository<UserCredentials>, IUserCredentialsRepository
    {
        public UserCredentialsRepository(DanceCoolContext context) : base(context)
        {
        }

        public IEnumerable<UserCredentials> GetAllUserCredentials()
        {
            return Context.UserCredentials;
        }

        public UserCredentials GetUserCredentialsById(int id)
        {
            return Context.UserCredentials.Find(id);
        }

        public UserCredentials GetUserCredentialsByUserId(int userId)
        {
            return Context.UserCredentials.First(ucreds => ucreds.UserId == userId);
        }
    }
}
