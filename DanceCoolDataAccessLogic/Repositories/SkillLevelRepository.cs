using System.Collections.Generic;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;

namespace DanceCoolDataAccessLogic.Repositories
{
    class SkillLevelRepository : BaseRepository<SkillLevel>, ISkillLevelRepository
    {
        public SkillLevelRepository(DanceCoolContext context) : base(context)
        {
        }

        public IEnumerable<SkillLevel> GetAllSkillLevels()
        {
            return  Context.SkillLevels;
        }

        public SkillLevel GetSkillLevelById(int? id)
        {
            return Context.SkillLevels.Find(id);
        }
    }
}
