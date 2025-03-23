using POS.Domain.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS.Service.Interfaces
{
    public interface IUserService
    {
        Task<object> Authenticate(string userName,string password);
        Task Register(string userName,string password,UserRole userRole);
        Task<bool> UpdateUserRole(string username, UserRole newRole);

    }
}
