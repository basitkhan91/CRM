using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
  public  class AssetIntangibleType : PasBase
    {
        [Key]
        public long? AssetIntangibleTypeId { get; set; }

        public string IntangibleTypeName { get; set; }

        public string AmortizationMethod { get; set; }

        public int? IntangibleLife { get; set; }

        public string AmortizationFrequency { get; set; }

        //[ForeignKey("IntangibleGLAccountId")]
        public long? IntangibleGLAccountId { get; set; }
        //[ForeignKey("AmortExpenseGLAccountId")]
        public long? AmortExpenseGLAccountId { get; set; }
        //[ForeignKey("AccAmortDeprGLAccountId")]
        public long? AccAmortDeprGLAccountId { get; set; }
        //[ForeignKey("IntangibleWriteDownGLAccountId")]
        public long? IntangibleWriteDownGLAccountId { get; set; }
        //[ForeignKey("IntangibleWriteOffGLAccountId")]
        public long? IntangibleWriteOffGLAccountId { get; set; }

        public long? ManagementStructureId { get; set; }

        public int? MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }

        //public virtual ICollection<GLAccount> GLAccount { get; set; }

    }
}
