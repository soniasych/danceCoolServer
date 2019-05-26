using System.Collections.Generic;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public  interface ISkillLevelRepository : IRepository<SkillLevel>
    {
        IEnumerable<SkillLevel> GetAllSkillLevels();
        SkillLevel GetSkillLevelById(int? id);
        string GetSkillLevelNameById(int? id);
    }
}
