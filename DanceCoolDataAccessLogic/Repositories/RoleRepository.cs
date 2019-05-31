using System.Collections.Generic;
using System.Linq;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DanceCoolDataAccessLogic.Repositories
{
    class RoleRepository : BaseRepository<Role>, IRoleRepository
    {
        public RoleRepository(DanceCoolContext context) : base(context)
        {
        }

        public IEnumerable<Role> GetAllRoles() => Context.Roles;

        public Role GetRoleById(int id) => Context.Roles.Find(id);

        public Role GetRoleByCredentails(string email)
        {
            var credentials = Context.UserCredentials.FirstOrDefault(uc => uc.Email == email);
            var user = Context.Users.Find(credentials.Id);
            return Context.Roles.Find(user.RoleId);
        }
    }
}