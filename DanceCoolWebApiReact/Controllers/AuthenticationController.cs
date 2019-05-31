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
        [HttpPost]
        [Route("api/register")]
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

            var now = DateTime.UtcNow;

            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: creds.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                name = creds.Name
            };
            return Ok(response);
        }
    }
}