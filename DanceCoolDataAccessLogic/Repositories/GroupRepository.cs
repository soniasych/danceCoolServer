using System.Collections.Generic;
using System.ComponentModel;
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

        public Group GetGroupById(int groupId)
        {
            return Context.Groups.Find(groupId);
        }

        public IEnumerable<Group> GetGroupsByLevelId(int levelId)
        {
            return  Context.Groups.Where(group => group.LevelId == levelId).ToList();
        }

        public IEnumerable<Group> GetGroupsByDirectionId(int directionId)
        {
            return Context.Groups.Where(group => group.DirectionId == directionId).ToList();
        }

        public IEnumerable<Group> GetGroupsByUserId(int userId)
        {
            var groupsWithUSerArray = Context.UserGroups.Where(ug => ug.UserId == userId)
                .ToArray()
                .Select(user => user.Id);

            return Context.Groups.Where(group => groupsWithUSerArray.Contains(group.Id));
        }

        public void AddGroup(Group group)
        {
            Context.Groups.Add(group);
        }

        public void ChangeGroupLevel(int groupId, int levelId)
        {
            var groupModel = GetGroupById(groupId);
            groupModel.LevelId = levelId;
            Context.SaveChanges();

        }
    }
}
