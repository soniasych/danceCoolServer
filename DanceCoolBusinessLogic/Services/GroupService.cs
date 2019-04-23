using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.UnitOfWork;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    class GroupService : BaseService
    {
        public GroupService(IUnitOfWork db) : base(db)
        {
        }

        public async Task<IEnumerable<GroupDTO>> GetAllGroupsAsync()
        {
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

        private async Task<UserDTO> GroupModelToGroupDTOAsync(Group groupModel)
        {
            var task = new Task<UserDTO>(() =>
            {
                var userDto = new UserDTO(userModel.Id,
                    groupModel.FirstName,
                    groupModel.LastName,
                    groupModel.PhoneNumber);
                return userDto;
            });

            task.Start();
            return await task;
        }
    }
}
