using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Carrier
    {
        [Key]
        public byte CarrierId { get; set; }
        public string Description { get; set; }
        public string Memo { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
