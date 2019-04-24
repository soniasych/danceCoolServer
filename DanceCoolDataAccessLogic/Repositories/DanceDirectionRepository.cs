using System.Collections.Generic;
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

        public async Task<IEnumerable<DanceDirection>> GetAllDanceDirectionsAsync()
        {
            return await Context.DanceDirection.ToListAsync();
        }
        
        public async Task<DanceDirection> GetDanceDirectionAsync(int id)
        {
            return await Context.DanceDirection.FindAsync(id);
        }
    }
}
