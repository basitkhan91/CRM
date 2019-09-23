using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class Publication :IAudit
    {

        [Key]
        public long PublicationRecordId { get; set; }
        public string  PublicationId { get; set; }

        
        public string Memo { get; set; }

        public string Description { get; set; }

        public string Platform { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public DateTime EntryDate { get; set; }

        public bool? IsActive { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }

        public bool? IsDeleted { get; set; }

        public DateTime revisionDate { get; set; }
        public DateTime nextreviewDate { get; set; }

        public string ASD { get; set; }
        public string publishby { get; set; }
        public string location { get; set; }
        public string revision { get; set; }

        public string verifiedby { get; set; }
        public Nullable<DateTime> verifieddate { get; set; }
        public string employee { get; set; }
        public string docpath { get; set; }

        public int PublicationTypeId { get; set; }

        [NotMapped]
        public string PublicationType { get; set; }
    }
}



