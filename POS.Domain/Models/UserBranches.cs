using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS.Domain.Models
{
    public class UserBranches
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int BranchId { get; set; }
        public Branches Branches { get; set; }
    }
}
