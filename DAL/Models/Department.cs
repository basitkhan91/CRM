using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
 public   class Department: PasBase
    {
        public int DepartmentId { get; set; }
        public int DivisionId { get; set; }
        public int BusinessUnitId { get; set; }
        public int CompanyId { get; set; }
        [ForeignKey("MasterCompanyId")]
        public int MasterCompanyId { get; set; }
        public string DepartmentCode { get; set; }
        public string DepartmentName { get; set; }
        public int ContactId { get; set; }
        public DateTime RecordCreateDate { get; set; }
        public DateTime RecordModifiedDate { get; set; }
        public int LastModifiedBy { get; set; }
        public bool? IsActive { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }

    }
}