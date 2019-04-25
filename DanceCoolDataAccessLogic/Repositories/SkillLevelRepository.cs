using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public IEnumerable<SkillLevel> GetAllSkillLevels()
        {
            return  Context.SkillLevel.ToList();
        }

        public SkillLevel GetSkillLevelById(int id)
        {
            return Context.SkillLevel.Find(id);
        }
    }
}
