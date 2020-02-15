using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public partial class CustomerAircraftMapping
    {
        [Key]
        public long CustomerAircraftMappingId { get; set; }
        public long CustomerId { get; set; }
        public long? AircraftModelId { get; set; }
        public int AircraftTypeId { get; set; }
        public long? DashNumberId { get; set; }
        public string DashNumber { get; set; }
        //public string ModelNumber { get; set; }
        public string AircraftType { get; set; }
        public string AircraftModel { get; set; }
        public string Memo { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsDeleted { get; set; } = false;
        public int? Inventory { get; set; }
        public bool IsActive { get; set; } = true;
    }
}