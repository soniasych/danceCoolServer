using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Interfaces
{
    interface IAuthenticationService
    {
        UserCredential RegisterUser(RegistrationUserIdentityDto newCredentials, string password);
    }
}
