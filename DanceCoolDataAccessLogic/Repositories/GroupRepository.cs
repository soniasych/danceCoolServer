using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DanceCoolDataAccessLogic.Repositories
{
    class GroupRepository : BaseRepository<Group>, IGroupRepository
    {
        public GroupRepository(DanceCoolContext context) : base(context)
        {
        }

        public IEnumerable<Group> GetAllGroups()
        {
            return Context.Groups;
        }

        public Task<Group> GetGroupByIdAsync(int id)
        {
            return Context.Groups.FirstOrDefaultAsync(group => group.Id == id);
        }

        public async Task<IEnumerable<Group>> GetGroupsByLevelIdAsync(int id)
        {
            return  Context.Groups.Where(group => group.LevelId == id).ToList();
        }

        public async Task<IEnumerable<Group>> GetGroupsByDirectionIdAsync(int id)
        {
            return Context.Groups.Where(group => group.DirectionId == id).ToList();
        }
    }
}
