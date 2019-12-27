using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class Nha_Tla_Alt_Equ_ItemMapping
    {
        [Key]
        public long ItemMappingId { get; set; }
        [ForeignKey("MasterCompanyId")]
        public long ItemMasterId { get; set; }
        public long MappingItemMasterId { get; set; }
        
        public string Memo { get; set; }
        public int MappingType { get; set; } //NHA,TLA,ALT,EQU
        [ForeignKey("MasterCompanyId")]
        public int? MasterCompanyId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

    }

    
}
