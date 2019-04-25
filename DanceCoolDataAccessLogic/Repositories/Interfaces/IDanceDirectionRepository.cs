using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IDanceDirectionRepository : IRepository<DanceDirection>
    {
        IEnumerable<DanceDirection> GetAllDanceDirections();
        DanceDirection GetDanceDirectionById(int id);
    }
}
