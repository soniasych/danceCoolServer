using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Interfaces
{
    public interface IAuthenticationService
    {
        UserCredential RegisterUser(RegistrationUserIdentityDto newCredentials, string password);
    }
}
