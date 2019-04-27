using System.Collections.Generic;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.UnitOfWork;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    public class GroupService : BaseService, IGroupService
    {
        public GroupService(IUnitOfWork db) : base(db)
        {
        }

        public IEnumerable<GroupDTO> GetAllGroups()
        {
            var groups = db.Groups.GetAllGroups();
            if (groups == null)
            {
                return null;
            }

            var dtos = new List<GroupDTO>();

            foreach (var group in groups)
            {
                dtos.Add(GroupModelToGroupDTO(group));
            }

            return dtos;
        }

        public IEnumerable<GroupDTO> GetGroupsByUserId(int userId)
        {
            var groupModels = db.Groups.GetGroupsByUserId(userId);

            if (groupModels == null)
            {
                return null;
            }

            var groupDtos = new List<GroupDTO>();

            foreach (var model in groupModels)
            {
                groupDtos.Add(GroupModelToGroupDTO(model));
            }

            return groupDtos;
        }

        private GroupDTO GroupModelToGroupDTO(Group groupModel)
        {
            var level = db.SkillLevels.GetSkillLevelById(groupModel.LevelId);
            var directions = db.DanceDirections.GetDanceDirectionById(groupModel.DirectionId);

            return new GroupDTO(
                groupModel.Id,
                directions.Name,
                level.Name);
        }
    }
}