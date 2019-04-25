using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    public interface IGroupService
    {
        IEnumerable<GroupDTO> GetAllGroups();
    }
}