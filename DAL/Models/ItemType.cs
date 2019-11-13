using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace DAL.Models
{
    public class ItemType
    {
        [Key]
        public int ItemTypeId { get; set; }
        public string Description { get; set; }
    }
}
