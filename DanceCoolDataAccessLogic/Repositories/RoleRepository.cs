using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using Microsoft.EntityFrameworkCore;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    class RoleRepository : BaseRepository<Role>, IRoleRepository
    {
        public RoleRepository(DanceCoolContext context) : base(context)
        {
        }

        public IEnumerable<Role> GetAllRoles() => Context.Roles;

        public Role GetRoleById(int id) => Context.Roles.Find(id);
    }
}