using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IDanceDirectionRepository : IRepository<DanceDirection>
    {
        Task<DanceDirection> GetDanceDirectionAsync(int id);
    }
}
