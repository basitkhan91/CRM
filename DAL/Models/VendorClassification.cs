using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
  public  class VendorClassification : PasBase
    {
        public long VendorClassificationId { get; set; }

        public string ClassificationName { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }
        public string Memo { get; set; }

        public bool? IsActive { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
        public bool? IsDelete { get; set; }

    }
}
