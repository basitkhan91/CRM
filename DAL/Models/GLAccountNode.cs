using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;


namespace DAL.Models
{
  public class GLAccountNode :PasBase
    {
        public long GLAccountNodeId { get; set; }
        
        public string LedgerName { get; set; }

        [Required(ErrorMessage = "NodeCode Is Required.")]
        public string NodeCode { get; set; }

        [Required(ErrorMessage = "NodeName Is Required.")]
        public string NodeName { get; set; }

        public long ParentNodeId { get; set; }

        public bool LeafNodeCheck { get; set; }

        [Required(ErrorMessage = "NodeCode Is Required.")]
        public long GLAccountTypeId { get; set; }

        [Required(ErrorMessage = "NodeCode Is Required.")]
        public string FSType { get; set; }

        public string Description { get; set; }

        public bool IsActive { get; set; }

        public bool IsDelete { get; set; }

        public Int32 MasterCompanyId { get; set; }

        public long LedgerNameMgmStructureId { get; set; }
    }
}
