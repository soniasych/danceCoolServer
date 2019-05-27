using System.Collections.Generic;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    public interface IGroupService
    {
        IEnumerable<GroupDTO> GetAllGroups();
        GroupDTO GetGroupById(int groupId);
        IEnumerable<GroupDTO> GetGroupsByUserId(int userId);

        //void AddGroup(GroupDTO group);
        void ChangeGroupLevel(int groupId, int targetLevelId);
        IEnumerable<UserDTO> GetStudentsNotInCurrentGroup(int groupId);
        IEnumerable<LessonDTO> GetLessons();
    }
}