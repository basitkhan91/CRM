using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class NhaTlaAltEquAudit
    {
        [Key]
        public long NhaTlaAltEquAuditId { get; set; }
        public long ItemMappingId { get; set; }
        public long ItemMasterId { get; set; }
        public long MappingItemMasterId { get; set; }
        public string Memo { get; set; }
        public int MappingType { get; set; } //NHA,TLA,ALT,EQU
        public int? MasterCompanyId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
