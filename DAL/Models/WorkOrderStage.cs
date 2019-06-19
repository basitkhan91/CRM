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
        public int MasterCompanyId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
    }
}
