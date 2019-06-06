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
        bool ChangeGroupMentors(int groupId, int newPrimaryMentorId, int newSecMentorId);
        IEnumerable<UserDTO> GetStudentsNotInCurrentGroup(int groupId);
        IEnumerable<LessonDTO> GetLessons();
        IEnumerable<AttendanceDTO> GetPresentStudentsOnLesson(int lessonId);

    }
}