using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrderStage : PasBase
    {
        public Int64 ID { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public int Sequence { get; set; }
        public long? ManagementStructureId { get; set; }
        public string ETC { get; set; }
        public string Memo { get; set; }
        public int MasterCompanyId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
