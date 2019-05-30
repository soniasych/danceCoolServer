using DanceCoolBusinessLogic.Interfaces;
using DanceCoolDTO;
using System;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using DanceCoolBusinessLogic.Helpers;

namespace DanceCoolWebApiReact.Controllers
{
    [Authorize]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            this._authenticationService = authenticationService;
        }

        [AllowAnonymous]
        [HttpPost("api/register")]
        public IActionResult Register([FromBody] RegistrationUserIdentityDto newCredsDto)
        {
           
            try
            {
                // save 
                _authenticationService.RegisterUser(newCredsDto, newCredsDto.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("api/autorize")]
        public IActionResult Autorize([FromBody] AutorizationUserIdentityDto credsDto)
        {
            var creds = _authenticationService.Authenticate(credsDto.email, credsDto.password);

            if (creds == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(AuthOptions.KEY);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, creds.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store client side
            return Ok(new
            {
                Id = creds.Id,
                Username = creds.Email,
                Token = tokenString
            });
        }
    }
}