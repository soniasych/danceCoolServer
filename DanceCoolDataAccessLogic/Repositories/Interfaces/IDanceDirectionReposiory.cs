using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    interface IDanceDirectionReposiory : IRepository<DanceDirection>
    {
        Task<IEnumerable<DanceDirection>> GetAllDanceDirectionsAsync();
        Task<DanceDirection> GetAsync(int id);
    }
}
