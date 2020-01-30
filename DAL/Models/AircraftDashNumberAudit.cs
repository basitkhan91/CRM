using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class AircraftDashNumberAudit : PasBaseAudit
    {

        [Key]
        public Int32? DashNumberAuditId { get; set; }

        public long DashNumberId { get; set; }

        public Int32? AircraftTypeId { get; set; }

        public long AircraftModelId { get; set; }

        public string DashNumber { get; set; }
        public string Memo { get; set; }
        public Int32? MasterCompanyId { get; set; }
    }
}
