using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using houzez_api.Data;
using houzez_api.DTO;
using houzez_api.Models;
using houzez_api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace houzez_api.Controllers
{
    [Route("api/token")]
    [ApiController]
    //[EnableCors(""_myAllowSpecificOrigins"")]
    public class TokenController : ControllerBase
    {
        private IUserService _userService;
        public IConfiguration _configuration;
        private readonly HouzezDbContext _context;

        public TokenController(IConfiguration config, HouzezDbContext context, IUserService service)
        {
            _configuration = config;
            _context = context;
            _userService = service;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(UserDTO _userData)
        {
            var userCheck = await GetUser(_userData.Email);

            if (userCheck is not null)
            {
                throw new ArgumentException($"User with email {userCheck.Email} already exists.");
            }

            _userData.Password = BCrypt.Net.BCrypt.HashPassword(_userData.Password);
            _userData = _userService.Create(_userData);
            await Login(new LoginDTO { Email = _userData.Email, Password = _userData.Password });
            return Ok(_userData);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginDTO _userData)
        {
            if (_userData != null && _userData.Email != null)
            {
                var user = await GetUser(_userData.Email);

                if (user == null || !BCrypt.Net.BCrypt.Verify(_userData.Password, user.Password))
                {
                    throw new ArgumentException("Email or password is incorrect");
                }


                if (user != null)
                {
                    //create claims details based on the user information
                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserId", user.Id.ToString()),
                        //new Claim("Role", user.Role),
                        new Claim("Email", user.Email)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: signIn);
                    var encodedJwt = new JwtSecurityTokenHandler().WriteToken(token);

                    var resp = new AuthorizationResponse
                    {
                        UserId = user.Id.ToString(),
                        AuthorizationToken = encodedJwt,
                        RefreshToken = string.Empty
                    };

                    return Ok(resp);
                }
                else
                {
                    //return BadRequest("Invalid credentials");
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest();
            }
        }

        private async Task<User> GetUser(string Email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == Email);
        }

        public class AuthorizationResponse
        {
            public string UserId { get; set; }
            public string AuthorizationToken { get; set; }
            public string RefreshToken { get; set; }
        }

    }
}
