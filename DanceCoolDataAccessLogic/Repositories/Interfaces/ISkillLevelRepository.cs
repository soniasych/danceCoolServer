﻿using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    interface ISkillLevelRepository : IRepository<SkillLevel>
    {
        Task<SkillLevel> GetAsync(int id);
    }
}