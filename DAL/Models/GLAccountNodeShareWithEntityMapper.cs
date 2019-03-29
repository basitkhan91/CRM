using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class GLAccountNodeShareWithEntityMapper : BaseEntity
    {
        public long GLAccountNodeShareWithEntityMapperId { get; set; }

        public long ManagementStructureId { get; set; }

        public long GLAccountNodeId { get; set; }

        public long MasterCompanyId { get; set; }
    }
}
