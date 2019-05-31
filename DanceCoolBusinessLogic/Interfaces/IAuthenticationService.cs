using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDTO;
using System.Security.Claims;

namespace DanceCoolBusinessLogic.Interfaces
{
    public interface IAuthenticationService
    {
        UserCredential RegisterUser(RegistrationUserIdentityDto newCredentials, string password);
        ClaimsIdentity Authenticate(string email, string password);
        UserCredential GetCredentialsByMail(string email);
    }
}
