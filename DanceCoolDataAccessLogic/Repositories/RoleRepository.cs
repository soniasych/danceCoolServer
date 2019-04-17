using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;
using Microsoft.EntityFrameworkCore;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    class RoleRepository : BaseRepository<Role>, IRoleRepository
    {
        public RoleRepository(DanceCoolContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Role>> GetAllRolesAsync() => Context.Roles;

        public async Task<Role> GetAsync(int id) => await Context.Roles.FirstOrDefaultAsync(role => role.Id == id);
    }
}