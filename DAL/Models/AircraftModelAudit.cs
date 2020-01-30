using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class AircraftModelAudit : PasBaseAudit
    {
        [Key]
        public long? AircraftModelAuditId { get; set; }
        public long? AircraftModelId { get; set; }
        public int? AircraftTypeId { get; set; }
        public string ModelName { get; set; }
        public string Memo { get; set; }
        public Int32? MasterCompanyId { get; set; }
    }
}
