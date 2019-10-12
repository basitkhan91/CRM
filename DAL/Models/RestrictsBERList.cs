using System;
using System.ComponentModel.DataAnnotations;
namespace DAL.Models
{
    public class RestrictsBERList
    {
        [Key]
        public long RestrictedBERId { get; set; }
        public long CustomerId { get; set; }
        public long ItemMasterId { get; set; }
        public string PartNumber { get; set; }
        public string Memo { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}



