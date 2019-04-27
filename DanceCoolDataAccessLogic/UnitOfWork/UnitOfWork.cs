using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.Repositories;
using DanceCoolDataAccessLogic.Repositories.Interfaces;

namespace DanceCoolDataAccessLogic.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DanceCoolContext _context;

        private IUserRepository users;
        private IDanceDirectionRepository danceDirections;
        private IGroupRepository groups;
        private IRoleRepository roles;
        private ISkillLevelRepository skillLevels;
        private IUserCredentialsRepository userCredentials;
        private IUserRoleRepository userRoles;
        private IUserGroupRepository userGroups;

        public UnitOfWork(DanceCoolContext context) => _context = context;

        public IUserRepository Users => users ?? (users = new UserRepository(_context));
        public IDanceDirectionRepository DanceDirections => danceDirections ?? (danceDirections = new DanceDirectionRepository(_context));
        public IGroupRepository Groups => groups ?? (groups = new GroupRepository(_context));
        public IRoleRepository Roles => roles ?? (roles = new RoleRepository(_context));
        public ISkillLevelRepository SkillLevels => skillLevels ?? (skillLevels = new SkillLevelRepository(_context));
        public IUserCredentialsRepository UserCredentials => userCredentials ?? (userCredentials = new UserCredentialsRepository(_context));
        public IUserRoleRepository UserRoles => userRoles ?? (userRoles = new UserRoleRepository(_context));
        public IUserGroupRepository UserGroups => userGroups ?? ( userGroups = new UserGroupRepository(_context));

        public void Complete()
        {
            _context.SaveChanges();
        }


        public void Dispose()
        {
            _context.Dispose();
        }
    }
}