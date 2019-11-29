using System;
namespace DAL.Models
{

    public partial class Capability
    {      
    
        public long CapabilityId { get; set; }
        public Nullable<int> CapabilityTypeId { get; set; }
        public string Description { get; set; }
        public Nullable<int> AircraftTypeId { get; set; }
        public Nullable<long> AircraftModelId { get; set; }
        public string AircraftManufacturer { get; set; }
        //public Nullable<long> PartId { get; set; }
        public Nullable<long> ATAChapterId { get; set; }
        public Nullable<System.DateTime> EntryDate { get; set; }
        public Nullable<bool> IsCMMExist { get; set; }
        public Nullable<bool> IsVerified { get; set; }
        public string VerifiedBy { get; set; }
        public Nullable<System.DateTime> DateVerified { get; set; }
        public string Memo { get; set; }
        public string ComponentDescription { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDelete { get; set; }
        public long? ManufacturerId { get; set; }
        public long? ManagementStructureId { get; set; }
        public long? ItemMasterId { get; set; }
        public long AssetRecordId { get; set; }

        public long AircraftDashNumberId { get; set; }

        public virtual Asset Asset { get; set; }
        public virtual AircraftModel AircraftModel { get; set; }
        public virtual AircraftType AircraftType { get; set; }
        public virtual CapabilityType CapabilityType { get; set; }
       
    }
}
