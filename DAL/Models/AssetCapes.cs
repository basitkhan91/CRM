using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;


namespace DAL.Models
{
    public class AssetCapes : PasBase,IAudit
    {
        [Key]
        public long AssetCapesId { get; set; }
        public long AssetRecordId { get; set; }
        public long CapabilityId { get; set; }
        public int MasterCompanyId { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public long AircraftTypeId { get; set; }
        public Nullable<long> AircraftModelId { get; set; }
        public Nullable<long> AircraftDashNumberId { get; set; }
        public string AircraftType { get; set; }
        public string AircraftModel { get; set; }
        public string AircraftDashNumber { get; set; }
        //public virtual Asset Asset { get; set; }
    }
}