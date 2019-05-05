using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class UserRoleMapper : PasBase
    {
        [Key]
        public long Id { get; set; }

        [ForeignKey("UserId")]
        public long UserId { get; set; }

        [ForeignKey("UserRoleId")]
        public long UserRoleId { get; set; }

    }
}
