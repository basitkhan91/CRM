using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class BaseEntity
    {
        [Key]
        public long Id { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<DateTime> CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<DateTime> UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
    }
}
