using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class GlClassFlowClassification : PasBase,IAudit
    {
        [Key]
        public long GlClassFlowClassificationId { get; set; }
        public long GLCID { get; set; }
        public string GLClassFlowClassificationName { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }

        //public virtual MasterCompany MasterCompany { get; set; }
        //GlCashFlowClassificationId used
    }
}
