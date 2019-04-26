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
            return  Context.DanceDirection.ToList();
        }
        
        public DanceDirection GetDanceDirectionById(int id)
        {
            return Context.DanceDirection.Find(id);
        }

        public string GetDanceDirectionNameById(int id)
        {
            var danceDirectioin = GetDanceDirectionById(id);
            return danceDirectioin.Name;
        }
    }
}
