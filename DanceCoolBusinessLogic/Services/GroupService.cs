using System.Collections.Generic;
using System.Threading.Tasks;
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

        //private IEnumerable<Group> _groups;
        //private bool _initialized = false;

        //private async void CheckInit()
        //{
        //    if (_initialized)
        //        return;
        //    _groups = await db.Groups.GetAll();
        //    _initialized = true;
        //}

        public IEnumerable<GroupDTO> GetAllGroups()
        {
            //CheckInit();
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
