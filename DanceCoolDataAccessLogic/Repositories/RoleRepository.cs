using System.Collections.Generic;
using System.Linq;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;

namespace DanceCoolDataAccessLogic.Repositories
{
    class RoleRepository : BaseRepository<Role>, IRoleRepository
    {
        public RoleRepository(DanceCoolContext context) : base(context)
        {
        }

        public Role GetRoleByCredentails(string email)
        {
            var credentials = Context.UserCredentials.FirstOrDefault(uc => uc.Email == email);
            if (credentials == null)
            {
                return null;
            }
            var user = Context.Users.Find(credentials.UserId);
            return user == null ? null : Context.Roles.Find(user.RoleId);
        }
    }
}