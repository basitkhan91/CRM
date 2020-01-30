using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class AircraftTypeAudit : PasBaseAudit
    {
        [Key]
        public int AircraftTypeAuditId { get; set; }
        public int AircraftTypeId { get; set; }
        public string Description { get; set; }
        public string Memo { get; set; }

        public Int32? MasterCompanyId { get; set; }

    }
}
