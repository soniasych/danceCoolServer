using System.Collections.Generic;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    public interface IGroupService
    {
        IEnumerable<GroupDTO> GetAllGroups();
        GroupDTO GetGroupById(int groupId);
        IEnumerable<GroupDTO> GetGroupsByUserId(int userId);
    }
}