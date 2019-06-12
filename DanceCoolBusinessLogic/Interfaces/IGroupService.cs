﻿using System.Collections.Generic;
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
        IEnumerable<SkillLevel> GetAllSkillLevels();
        void ChangeGroupLevel(int groupId, int targetLevelId);
        bool ChangeGroupMentors(int groupId, int newPrimaryMentorId, int newSecMentorId);
        IEnumerable<LessonDTO> GetLessons();
        IEnumerable<AttendanceDTO> GetPresentStudentsOnLesson(int lessonId);

    }
}