using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class UserRoleMapper
    {
        [Key]
        public long Id { get; set; }

        public Guid UserId { get; set; }

        [ForeignKey("UserRoleId")]
        public long UserRoleId { get; set; }

    }
}
