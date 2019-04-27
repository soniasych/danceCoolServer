using System.Collections.Generic;
using System.Linq;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;

namespace DanceCoolDataAccessLogic.Repositories
{
    public class GroupRepository : BaseRepository<Group>, IGroupRepository
    {
        public GroupRepository(DanceCoolContext context) : base(context)
        {
        }

        public IEnumerable<Group> GetAllGroups()
        {
            return Context.Groups;
        }

        public Group GetGroupById(int id)
        {
            return Context.Groups.FirstOrDefault(group => group.Id == id);
        }

        public IEnumerable<Group> GetGroupsByLevelId(int id)
        {
            return  Context.Groups.Where(group => group.LevelId == id).ToList();
        }

        public IEnumerable<Group> GetGroupsByDirectionId(int id)
        {
            return Context.Groups.Where(group => group.DirectionId == id).ToList();
        }
    }
}
