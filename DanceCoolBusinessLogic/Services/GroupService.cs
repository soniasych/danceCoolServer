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

        public async Task<List<GroupDTO>> GetAllGroupsAsync()
        {
            //CheckInit();
            var groups = await db.Groups.GetAllGroupsAsync();
            if (groups == null)
            {
                return null;
            }

            var dtos = new List<GroupDTO>();

            foreach (var group in groups)
            {
                dtos.Add(await GroupModelToGroupDTOAsync(group));
            }

            return dtos;
        }

        private async Task<GroupDTO> GroupModelToGroupDTOAsync(Group groupModel)
        {
            var level = await db.SkillLevels.GetAsync(groupModel.LevelId);
            var directions = await db.DanceDirections.GetDanceDirectionAsync(groupModel.DirectionId);

            return new GroupDTO(
                groupModel.Id,
                directions.Name,
                level.Name);
        }
    }
}
