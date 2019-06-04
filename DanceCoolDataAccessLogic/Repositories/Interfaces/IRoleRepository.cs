using DanceCoolDataAccessLogic.EfStructures.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IRoleRepository : IRepository<Role>
    {
        Role GetRoleByCredentails(string email);
    }
}
