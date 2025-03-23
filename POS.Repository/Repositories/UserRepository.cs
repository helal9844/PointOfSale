using Microsoft.EntityFrameworkCore;
using POS.Domain.Models;
using POS.Domain.Models.Enum;
using POS.Repository.DataContext;
using POS.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS.Repository.Repositories
{
    public class UserRepository:IUserRepository
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User?> GetUserByUsername(string username)
        {
            return await _context.Users.Include(e=>e.UserBranches).ThenInclude(ub => ub.Branches).FirstOrDefaultAsync(u => u.Username == username);
        }
        public async Task<bool> UpdateUserRole(string username, UserRole newRole)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user == null)
                return false;

            user.Role = newRole;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
