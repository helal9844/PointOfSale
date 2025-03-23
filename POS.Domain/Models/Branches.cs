using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS.Domain.Models
{
    public class Branches
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<UserBranches> UserBranches { get; set; }
    }
}
