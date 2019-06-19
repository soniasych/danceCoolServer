using System;
using DanceCoolDataAccessLogic.Repositories.Interfaces;

namespace DanceCoolDataAccessLogic.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IDanceDirectionRepository DanceDirections { get; }
        IGroupRepository Groups { get; }
        IRoleRepository Roles { get; }
        ISkillLevelRepository SkillLevels { get; }
        IUserCredentialsRepository UserCredentials { get; }
        IUserRepository Users { get; }
        IUserGroupRepository UserGroups { get; }
        ILessonRepository Lessons { get; }
        IAttendanceRepository Attendances { get; }
        IPaymentRepository Payments { get; }
        IAbonnementRepository Abonnements { get; }
        void Save();
    }
}