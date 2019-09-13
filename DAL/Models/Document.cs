using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
   public class Document: IAudit
    {
            [Key]
            public long DocumentId { get; set; }
            public string DocumentCode { get; set; }
            public string Description { get; set; }
            public bool? Customer { get; set; }
            public bool? ItemMaster { get; set; }
            public bool? PurchaseOrder { get; set; }
            public bool? RepairOrder { get; set; }
            public bool? SL { get; set; }
            public bool? SalesOrder { get; set; }
            public string Memo { get; set; }
            public string Link { get; set; }
            public bool? WorkOrder { get; set; }
            public bool? Vendor { get; set; }
            [ForeignKey("MasterCompanyId")]
            public Int32 MasterCompanyId { get; set; }
            public string CreatedBy { get; set; }
            public string UpdatedBy { get; set; }
            public DateTime CreatedDate { get; set; }
            public DateTime UpdatedDate { get; set; }
            public bool? IsActive { get; set; }
            public virtual MasterCompany MasterCompany { get; set; }
            public bool? IsDelete { get; set; }

    }
    }

