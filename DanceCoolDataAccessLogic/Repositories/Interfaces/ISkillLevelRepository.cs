using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public  interface ISkillLevelRepository : IRepository<SkillLevel>
    {
        IEnumerable<SkillLevel> GetAllSkillLevels();
        SkillLevel GetSkillLevelById(int id);
    }
}
