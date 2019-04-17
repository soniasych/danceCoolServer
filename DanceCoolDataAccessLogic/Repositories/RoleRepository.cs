using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    class RoleRepository : BaseRepository<Role>, IRoleRepository
    {
        public RoleRepository(DanceCoolContext context) : base(context)
        {
        }

        public Task<IEnumerable<Role>> GetAllRolesAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Role> GetAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
