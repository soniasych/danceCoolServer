using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    interface IDanceDirectionRepository : IRepository<DanceDirection>
    {
        Task<DanceDirection> GetDanceDirectionAsync(int id);
    }
}
