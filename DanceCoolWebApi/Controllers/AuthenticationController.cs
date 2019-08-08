using DanceCoolBusinessLogic.Interfaces;
using DanceCoolDTO;
using System;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using DanceCoolBusinessLogic.Helpers;
using DanceCoolWebApi;

namespace DanceCoolWebApiReact.Controllers
{
    [Authorize]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        IAuthenticationService _authenticationService;
        IUserService _userService;

        public AuthenticationController(IAuthenticationService authenticationService, 
                                        IUserService userService)
        {
            this._authenticationService = authenticationService;
            this._userService = userService;
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
                
                var regedCreds = _authenticationService.Authenticate(newCredsDto.Email, newCredsDto.Password);
                var now = DateTime.UtcNow;

                // создаем JWT-токен
                var jwt = new JwtSecurityToken(
                        issuer: AuthOptions.ISSUER,
                        audience: AuthOptions.AUDIENCE,
                        notBefore: now,
                        claims: regedCreds.Claims,
                        expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                        signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

                var response = new
                {
                    access_token = encodedJwt,
                    token_lifeTime = 3600000,
                    email = regedCreds.Name,
                    firstName = newCredsDto.FirstName,
                    lastName = newCredsDto.LastName
                };
                return Ok(response);

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
            var user = _userService.GetUserByEmail(credsDto.email);

            if (creds == null || user== null)
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
                token_lifeTime = 3600000,
                email = creds.Name,
                userId = user.Id,
                firstName = user.FirstName,
                lastName = user.LastName,
                roleName = user.RoleName
            };
            return Ok(response);
        }
    }
}