﻿using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DanceCoolDataAccessLogic.Repositories
{
    class SkillLevelRepository : BaseRepository<SkillLevel>, ISkillLevelRepository
    {
        public SkillLevelRepository(DanceCoolContext context) : base(context)
        {
        }

        public Task<SkillLevel> GetAsync(int id)
        {
            return Context.SkillLevel.FirstOrDefaultAsync(sl => sl.Id == id);
        }
    }
}