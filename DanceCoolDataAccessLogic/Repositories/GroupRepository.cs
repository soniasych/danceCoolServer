using System.Collections.Generic;
using System.Linq;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;
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
            return Context.Groups
                .Include(g => g.Direction)
                .Include(g => g.Level)
                .Include(g => g.PrimaryMentor)
                .Include(g => g.SecondaryMentor);
        }

        public Group GetGroupById(int groupId)
        {
            return Context.Groups
                .Include(g => g.Direction)
                .Include(g => g.Level)
                .Include(g => g.PrimaryMentor)
                .Include(g => g.SecondaryMentor)
                .First(group => group.Id == groupId);
        }

        public IEnumerable<Group> GetGroupsByLevelId(int levelId)
        {
            return Context.Groups
                .Include(g => g.Direction)
                .Include(g => g.Level)
                .Include(g => g.PrimaryMentor)
                .Include(g => g.SecondaryMentor)
                .Where(group => group.LevelId == levelId).ToList();
        }

        public IEnumerable<Group> GetGroupsByDirectionId(int directionId)
        {
            return Context.Groups
                .Include(g => g.Direction)
                .Include(g => g.Level)
                .Include(g => g.PrimaryMentor)
                .Include(g => g.SecondaryMentor)
                .Where(group => group.DirectionId == directionId).ToList();
        }

        public IEnumerable<Group> GetGroupsByUserId(int userId)
        {
            var groupsWithUSerArray = Context.UserGroups.Where(ug => ug.UserId == userId)
                .Select(ug => ug.Id)
                .ToArray();

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
