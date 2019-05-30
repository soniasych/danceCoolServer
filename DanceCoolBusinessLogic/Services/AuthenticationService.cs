using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolBusinessLogic.Helpers;
using System;
using System.Text;
using DanceCoolBusinessLogic.Interfaces;
using DanceCoolDataAccessLogic.UnitOfWork;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    public class AuthenticationService : BaseService, IAuthenticationService
    {
        public AuthenticationService(IUnitOfWork db) : base(db)
        {
        }

        public UserCredential RegisterUser(RegistrationUserIdentityDto newCredentials, string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (db.UserCredentials.IsEmailReserved(newCredentials.Email))
                throw new AppException($"Username \\ {newCredentials.Email} \\ is already taken");

            byte[] passwordHash, passwordSalt;
            int existingUserId;

            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            if (db.Users.GetUserByPhoneNumber(newCredentials.PhoneNumber) != null)
            {
                existingUserId = db.Users.GetUserByPhoneNumber(newCredentials.PhoneNumber).Id;
            }
            else
            {
                db.Users.AddEntity(new User
                {
                    FirstName = newCredentials.FirstName,
                    LastName = newCredentials.LastName,
                    PhoneNumber = newCredentials.PhoneNumber
                });
                existingUserId = db.Users.GetUserByPhoneNumber(newCredentials.PhoneNumber).Id;
            }

            var formedCredentials = new UserCredential
            {
                Email = newCredentials.Email,
                UserId = existingUserId,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            db.UserCredentials.AddEntity(formedCredentials);

            return formedCredentials;
        }

        public UserCredential Authenticate(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                return null;

            var userCredentials = db.UserCredentials.GetCredentialsByEmail(email);

            // check if username exists
            if (userCredentials == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, userCredentials.PasswordHash, userCredentials.PasswordSalt))
                return null;

            // authentication successful
            return userCredentials;
        }


        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null)
                throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null)
                throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i])
                        return false;
                }
            }
            return true;
        }
    }
}
