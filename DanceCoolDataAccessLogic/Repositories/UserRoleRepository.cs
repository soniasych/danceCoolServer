﻿using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DanceCoolDataAccessLogic.Repositories
{
    class UserRoleRepository : BaseRepository<UserRole>, IUserRoleRepository
    {
        public UserRoleRepository(DanceCoolContext context) : base(context)
        {
        }

        public IEnumerable<UserRole> GetAllUserRoles() => Context.UserRole;

        public UserRole GetUserRoleById(int id)
        {
            return Context.UserRole.Find(id);
        }
    }
}
