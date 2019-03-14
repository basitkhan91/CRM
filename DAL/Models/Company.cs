using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
  public  class Company:PasBase
    {
        public int CompanyId { get; set; }

        public string CompanyName { get; set; }
        public string TaxId { get; set; }

        public string EmailAddress { get; set; }
        public string Address { get; set; }
        public DateTime RecordCreateDate { get; set; }
        public DateTime RecordModifiedDate { get; set; }
        public int LastModifiedBy { get; set; }
        public bool? IsActive { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }

    }
}