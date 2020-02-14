//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class AssetWarrantyStatus
    {           
        [Key]
        public long? AssetWarrantyStatusId { get; set; }
        public string warrantyStatus { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        public Int32? MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? CreatedDate { get; set; }

    }
}
