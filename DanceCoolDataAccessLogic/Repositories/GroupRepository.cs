using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DanceCoolDataAccessLogic.Repositories
{
    public class GroupRepository : BaseRepository<Group>, IGroupRepository
    {
        public GroupRepository(DanceCoolContext context) : base(context)
        {
        }

        public IEnumerable<Group> GetAllGroups()
        {
            return Context.Group;
        }

        public Group GetGroupById(int id)
        {
            return Context.Group.FirstOrDefault(group => group.Id == id);
        }

        public IEnumerable<Group> GetGroupsByLevelId(int id)
        {
            return  Context.Group.Where(group => group.LevelId == id).ToList();
        }

        public IEnumerable<Group> GetGroupsByDirectionId(int id)
        {
            return Context.Group.Where(group => group.DirectionId == id).ToList();
        }
    }
}
