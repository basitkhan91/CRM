using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
   public class ItemNonStockClassification
    {
        [Key]
        public long ItemNonStockClassificationId { get; set; }

        public string ItemNonStockClassificationCode { get; set; }
        public string Description { get; set; }
        public string ItemType { get; set; }
        public string Memo { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
       
    }
}
