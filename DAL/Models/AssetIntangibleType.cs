using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
  public  class AssetIntangibleType : PasBase
    {
        [Key]
        public long AssetIntangibleTypeId { get; set; }

        public string IntangibleTypeName { get; set; }

        public string AmortizationMethod { get; set; }

        public int? IntangibleLife { get; set; }

        public string AmortizationFrequency { get; set; }

        public long? IntangibleGLAccountId { get; set; }

        public long? AmortExpenseGLAccountId { get; set; }

        public long? AccAmortDeprGLAccountId { get; set; }

        public long? IntangibleWriteDownGLAccountId { get; set; }

        public long? IntangibleWriteOffGLAccountId { get; set; }

        public long? ManagementStructureId { get; set; }

        public int? MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }

    }
}
