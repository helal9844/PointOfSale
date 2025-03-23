using POS.Domain.Models.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace POS.Domain.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string PasswordHash { get; set; } 
        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))] 
        [Column(TypeName = "nvarchar(20)")]
        public UserRole Role { get; set; }
        [JsonIgnore]
        public ICollection<UserBranches> UserBranches { get; set; }
    }
}
