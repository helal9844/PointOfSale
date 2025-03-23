using POS.Domain.Models;
using POS.Domain.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS.Repository.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetUserByUsername(string username);
        Task  AddUser(User user);
        Task<bool> UpdateUserRole(string username, UserRole newRole);
    }
}
