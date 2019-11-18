using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
   public class Document
    {
            [Key]
            public long DocumentId { get; set; }
            public string DocumentCode { get; set; }
            public string Description { get; set; }
            public string Memo { get; set; }
            public string Link { get; set; }
            [ForeignKey("MasterCompanyId")]
            public Int32 MasterCompanyId { get; set; }
            public string CreatedBy { get; set; }
            public string UpdatedBy { get; set; }
            public DateTime CreatedDate { get; set; }
            public DateTime UpdatedDate { get; set; }
            public bool IsActive { get; set; }
            public bool IsDeleted { get; set; }


	}
    }

