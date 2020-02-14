using System;
using System.ComponentModel.DataAnnotations;


namespace DAL.Models
{
    public partial class CustomerContactATAMapping
    {
        [Key]
        public long CustomerContactATAMappingId { get; set; }
        public long CustomerContactId { get; set; }
        public long CustomerId { get; set; }
        public long ATAChapterId { get; set; }
        public long ATASubChapterId { get; set; }
        public int ATAChapterCode { get; set; }
        public string ATAChapterName { get; set; }
        public string ATASubChapterDescription { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsDeleted { get; set; } = false;
        public bool IsActive { get; set; } = true;
    }
}


