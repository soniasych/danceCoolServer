using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IDanceDirectionRepository : IRepository<DanceDirection>
    {
        IEnumerable<DanceDirection> GetAllDanceDirections();
        DanceDirection GetDanceDirectionById(int id);
        string GetDanceDirectionNameById(int id);
    }
}
