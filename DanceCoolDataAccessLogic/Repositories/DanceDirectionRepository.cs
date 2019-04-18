using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DanceCoolDataAccessLogic.Repositories
{
    class DanceDirectionRepository : BaseRepository<DanceDirection>, IDanceDirectionRepository
    {
        public DanceDirectionRepository(DanceCoolContext context) : base(context)
        {
        }

        public Task<DanceDirection> GetDanceDirectionAsync(int id)
        {
            return Context.DanceDirection.FirstOrDefaultAsync(dd => dd.Id == id);
        }
    }
}
