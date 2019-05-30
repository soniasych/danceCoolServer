using System.Collections.Generic;
using System.Linq;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;
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

        public string GetDanceDirectionNameById(int id)
        {
            var danceDirectioin = GetDanceDirectionById(id);
            return danceDirectioin.Name;
        }
    }
}
