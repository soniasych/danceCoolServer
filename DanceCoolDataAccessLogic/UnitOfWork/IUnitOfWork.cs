using DanceCoolDataAccessLogic.Repositories.Interfaces;

namespace DanceCoolDataAccessLogic.UnitOfWork
{
    public interface IUnitOfWork
    {
        IDanceDirectionRepository DanceDirections { get; }
        IGroupRepository Groups { get; }
        IRoleRepository Roles { get; }
        ISkillLevelRepository SkillLevels { get; }
        IUserCredentialsRepository UserCredentials { get; }
        IUserRoleRepository UserRoles { get; }
        IUserRepository Users { get; }

        void Dispose();
    }
}