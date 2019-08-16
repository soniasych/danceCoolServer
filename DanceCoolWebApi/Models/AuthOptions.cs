using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace DanceCoolWebApi
{
    public class AuthOptions
    {
        public const string ISSUER = "MyAuthServer";
        public const string KEY = "I'veJustwatchedL@l@L@nd!11";
        public const string AUDIENCE = "http://localhost:5000/";
        public const int LIFETIME = 60; 
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
