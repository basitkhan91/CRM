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
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{

    public partial class Capability
    {
       
    
        public long CapabilityId { get; set; }
        public long? CompanyId { get; set; }
        public long? BuisinessUnitId { get; set; }
        public long? DepartmentId { get; set; }
        public long? DivisionId { get; set; }
        public Nullable<int> CapabilityTypeId { get; set; }
        public string Description { get; set; }
        public Nullable<int> AircraftTypeId { get; set; }
        public Nullable<long> AircraftModelId { get; set; }
        public string AircraftManufacturer { get; set; }
        public Nullable<long> PartId { get; set; }
        public Nullable<long> ATAMainId { get; set; }
        public Nullable<System.DateTime> EntryDate { get; set; }
        public Nullable<bool> IsCMMExist { get; set; }
        public Nullable<bool> IsVerified { get; set; }
        public string VerifiedBy { get; set; }
        public Nullable<System.DateTime> DateVerified { get; set; }
        public string Memo { get; set; }
        public string ComponentDescription { get; set; }
        public string CLCFNumber { get; set; }
        public string CAT { get; set; }
        public string ATA { get; set; }
        public string CLCF_COMP_RATING_CATG { get; set; }
        public Nullable<short> LOC { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDelete { get; set; }
        public long? ManufacturerId { get; set; }


    }
}
