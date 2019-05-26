using System.Collections.Generic;
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

        public void ChangeGroupLevel(int groupId, int targetLevelId)
        {
            db.Groups.ChangeGroupLevel(groupId, targetLevelId);
        }

        public IEnumerable<UserDTO> GetStudentsNotInCurrentGroup(int groupId)
        {
            var studentsNotInCurrentGroup = db.Users.GetStudentsNotInGroup(groupId);
            if (studentsNotInCurrentGroup == null)
            {
                return null;
            }
            var dtos = new List<UserDTO>();

            foreach (var student in studentsNotInCurrentGroup)
            {
                dtos.Add(new UserDTO(student.Id,
                    student.FirstName,
                    student.LastName,
                    student.PhoneNumber));
            }

            return dtos;
        }

        private GroupDTO GroupModelToGroupDTO(Group groupModel) => new GroupDTO(
                groupModel.Id,
                groupModel.Direction.Name,
                $"{groupModel.PrimaryMentor.FirstName} {groupModel.PrimaryMentor.LastName}",
                groupModel.SecondaryMentor
                == null 
                ? null 
                : $"{groupModel.SecondaryMentor.FirstName} {groupModel.SecondaryMentor.LastName}",
                groupModel.Level?.Name);
        
    }
}