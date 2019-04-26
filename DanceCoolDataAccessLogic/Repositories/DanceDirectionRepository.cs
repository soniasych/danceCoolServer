using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DanceCoolDataAccessLogic.Repositories
{
    public class DanceDirectionRepository : BaseRepository<DanceDirection>, IDanceDirectionRepository
    {
        public DanceDirectionRepository(DanceCoolContext context) : base(context)
        {
        }

        public IEnumerable<DanceDirection> GetAllDanceDirections()
        {
            return  Context.DanceDirections.ToList();
        }
        
        public DanceDirection GetDanceDirectionById(int id)
        {
            return Context.DanceDirections.Find(id);
        }
    }
}
