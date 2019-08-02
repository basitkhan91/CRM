//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{

    public partial class ItemMasterAircraftMapping
    {
        [Key]
        public long ItemMasterAircraftMappingId { get; set; }
        public long ItemMasterId { get; set; }
        public long AircraftModelId { get; set; }
        public long AircraftTypelId { get; set; }
        public long DashNumberId { get; set; }
        public string PartNumber { get; set; }
        public string DashNumber { get; set; }
        public string AircraftType { get; set; }
        public string AircraftModel { get; set; }
        public string Memo { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
    
    }
}
