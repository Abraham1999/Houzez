using houzez_api.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using houzez_api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JWTAuth.WebApi.Controllers
{
    [Route("api/token")]
    [ApiController]
    //[EnableCors(""_myAllowSpecificOrigins"")]
    public class TokenController : ControllerBase
    {
        public IConfiguration _configuration;
        private readonly HouzezDbContext _context;

        public TokenController(IConfiguration config, HouzezDbContext context)
        {
            _configuration = config;
            _context = context;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(User _userData)
        {
            if (_userData != null && _userData.Email != null && _userData.Password != null)
            {
                var user = await GetUser(_userData.Email, _userData.Password);

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

        private async Task<User> GetUser(string Email, string password)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == Email && u.Password == password);
        }

        public class AuthorizationResponse {
            public string UserId { get; set; }
            public string AuthorizationToken { get; set; }
            public string RefreshToken { get; set; }
        }

    }
}
