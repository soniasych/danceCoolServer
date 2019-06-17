using System.Collections.Generic;
using DanceCoolBusinessLogic.Interfaces;
using DanceCoolDataAccessLogic.EfStructures.Entities;
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

        public GroupDTO GetGroupById(int groupId)
        {
            var groupModel = db.Groups.GetGroupById(groupId);
            return groupModel == null ? null : GroupModelToGroupDTO(groupModel);
        }

        public IEnumerable<GroupDTO> GetGroupsByUserId(int userId)
        {
            var groupModels = db.Groups.GetGroupsByUserId(userId);

            if (groupModels == null)
                return null;

            var groupDtos = new List<GroupDTO>();

            foreach (var model in groupModels)
                groupDtos.Add(GroupModelToGroupDTO(model));

            return groupDtos;
        }

        public bool ChangeGroupMentors(int groupId, int newPrimaryMentorId, int newSecMentorId)
        {
            return db.Groups.ChangeGroupMentors(groupId, newPrimaryMentorId, newSecMentorId);
        }

        public IEnumerable<SkillLevel> GetAllSkillLevels()
        {
            return db.SkillLevels.GetAllSkillLevels();
        }

        public void ChangeGroupLevel(int groupId, int targetLevelId)
        {
            db.Groups.ChangeGroupLevel(groupId, targetLevelId);
        }

        

        private GroupDTO GroupModelToGroupDTO(Group groupModel) => new GroupDTO(
            groupModel.Id,
            groupModel.Direction.Name,  
            groupModel.PrimaryMentorId,
            groupModel.PrimaryMentor.FirstName,
            groupModel.PrimaryMentor.LastName,
            groupModel.SecondaryMentorId ?? 0,
            groupModel.SecondaryMentor?.FirstName,
            groupModel.SecondaryMentor?.LastName,
            groupModel.Level?.Name);
    }
}