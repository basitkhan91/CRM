using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
   public class BusinessUnit:PasBase
   {
        public int BusinessUnitId { get; set; }

        public int CompanyId { get; set; }
        [ForeignKey("MasterCompanyId")]
        public int MasterCompanyId { get; set; }

        public string BusinessUnitCode { get; set; }

        public string BusinessUnitName { get; set; }

        public DateTime RecordCreateDate { get; set; }

        public DateTime RecordModifiedDate { get; set; }

        public int LastModifiedBy { get; set; }

        public bool? IsActive { get; set; }
        public virtual MasterCompany MasterCompany { get; set; }

    }
}