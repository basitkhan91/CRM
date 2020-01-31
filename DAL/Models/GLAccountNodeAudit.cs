using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class GLAccountNodeAudit
    {
        [Key]
        public long GLAccountNodeAuditId { get; set; }
        public long GLAccountNodeId { get; set; }

        public string LedgerName { get; set; }

        public string NodeCode { get; set; }

        public string NodeName { get; set; }

        public long? ParentNodeId { get; set; }

        public bool LeafNodeCheck { get; set; }

        public string GLAccountNodeType { get; set; }

        public string FSType { get; set; }

        public string Description { get; set; }

        public bool IsActive { get; set; }

        public bool IsDelete { get; set; }

        public Int32 MasterCompanyId { get; set; }

        public long LedgerNameMgmStructureId { get; set; }

        public virtual GLAccountNode ParentNode { get; set; }
    }
}
