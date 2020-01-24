using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public partial class AspNetUsers
    {
        [Key]
        public string Id { get; set; }

        public string UserName { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string JobTitle { get; set; }

        public string PhoneNumber { get; set; }

        public string Configuration { get; set; }

        public bool IsEnabled { get; set; }

        public bool IsLockedOut { get; set; }
        public string Password { get; set; }

        public long? EmployeeId { get; set; }
        


    }
}
