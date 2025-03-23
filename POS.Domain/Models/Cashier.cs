using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS.Domain.Models
{
    public class Cashier
    {
        public int Id { get; set; }
        public string CashierUser { get; set; }
        public string PasswordHash { get; set;}
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public bool IsActive { get; set; }
        public decimal SessionTotal { get; set; }
    }
}
