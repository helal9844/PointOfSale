using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POS.Domain.DTOs;
using POS.Domain.Models.Enum;
using POS.Service.Interfaces;

namespace PointOfSale.Controllers.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserWriteDto userDto)
        {
            await _userService.Register(userDto.Username, userDto.Password,userDto.UserRole);
            return Ok(new { message = "User registered successfully!" });
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserReadDto userDto)
        {
            var token = await _userService.Authenticate(userDto.Username, userDto.Password);
            if (token == null) return Unauthorized("Invalid credentials");

            return Ok(new { token });
        }

        [Authorize(Roles = nameof(UserRole.Admin))]
        [HttpGet("admin-dashboard")]
        public IActionResult AdminDashboard()
        {
            return Ok("Welcome Admin!");
        }
        [Authorize(Roles = nameof(UserRole.Cashier))]
        [HttpGet("cashier-dashboard")]
        public IActionResult CashierDashboard()
        {
            return Ok("Welcome Cashier!");
        }
        [Authorize(Roles = nameof(UserRole.Admin))]
        [HttpPut("update-role/{username}")]
        public async Task<IActionResult> UpdateUserRole(string username, [FromBody] UserRole newRole)
        {
            var updated = await _userService.UpdateUserRole(username, newRole);
            if (!updated) return NotFound("User not found.");

            return Ok("User role updated successfully.");
        }
    }
}
