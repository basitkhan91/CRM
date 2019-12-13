using System;
using System.Collections.Generic;
using DAL.Core;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
  public class AssetIntangibleAttributeType : PasBase,IAudit
    {
        [Key]
        public long AssetIntangibleAttributeTypeId { get; set; }
        public long AssetIntangibleTypeId { get; set; }
        public long AssetDepreciationMethodId { get; set; }
        public int IntangibleLifeYears { get; set; }
        public long AssetAmortizationIntervalId { get; set; }
        public long IntangibleGLAccountId { get; set; }
        public long AmortExpenseGLAccountId { get; set; }
        public long AccAmortDeprGLAccountId { get; set; }
        public long IntangibleWriteDownGLAccountId { get; set; }
        public long IntangibleWriteOffGLAccountId { get; set; }
        public long ManagementStructureId { get; set; }
        public int MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }

        public bool? IsDeleted { get; set; }

        [NotMapped]
        public UploadTag UploadTag { get; set; }
    }
}
