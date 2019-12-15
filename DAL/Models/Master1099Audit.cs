using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class Master1099Audit
    {
        [Key]
        public long AuditMaster1099Id { get; set; }
        public long Master1099Id { get; set; }
      
        public string Description { get; set; }
        public Int32? MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public string Memo { get; set; }
       



    }
}
