﻿using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DanceCoolDataAccessLogic.Repositories
{
    class UserGroupRepository : BaseRepository<UserGroup>, IUserGroupRepository 
    {
        public UserGroupRepository(DanceCoolContext context) : base(context)
        {
        }

        public IEnumerable<UserGroup> GetAllUserGroups()
        {
            throw new NotImplementedException();
        }

        public UserGroup GetUserGroupById(int userGruoupId)
        {
            throw new NotImplementedException();
        }

        public int[] GetUsersIdByGroupId(int groupId) =>
            Context.UserGroups.Where(ug => ug.GroupId == groupId)
            .Select(ug => ug.UserId)
            .ToArray();

        public int[] GetAllGroupsByUserId(int userId) =>
            Context.UserGroups.Where(ug => ug.UserId == userId)
            .Select(ug => ug.GroupId).ToArray();
    }
}
