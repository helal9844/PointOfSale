using Microsoft.Extensions.Configuration;
using BCrypt.Net;
using POS.Repository.Interfaces;
using POS.Service.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using POS.Domain.Models;
using POS.Domain.Models.Enum;

namespace POS.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public UserService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<object> Authenticate(string userName, string password)
        {
            var user = await _userRepository.GetUserByUsername(userName);
            var userBranches = user.UserBranches
                       .Select(ub => new { ub.BranchId, BranchName = ub.Branches?.Name })
                       .ToList();
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var expiration = DateTime.UtcNow.AddHours(1);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role.ToString()),

                }),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return new { Token = tokenHandler.WriteToken(token), Expiration = expiration,Role = user.Role.ToString(),UserName = user.Username,Branches= userBranches };
        }

        public async Task Register(string userName, string password,UserRole userRole)
        {
            var existingUser = await _userRepository.GetUserByUsername(userName);
            if (existingUser != null)
                throw new Exception("Username already exists.");

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);
            var user = new User { Username = userName, PasswordHash = hashedPassword,Role = userRole };
            await _userRepository.AddUser(user);
        }
        public async Task<bool> UpdateUserRole(string username, UserRole newRole)
        {
            var user = await _userRepository.GetUserByUsername(username);
            if (user == null) return false;

            user.Role = newRole;
            await _userRepository.UpdateUserRole(user.Username,user.Role);
            return true;
        }

    }
}
