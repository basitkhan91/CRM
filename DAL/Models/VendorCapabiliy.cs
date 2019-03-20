using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
   public class VendorCapabiliy
    {
       // public EntityState State { get; set; }

        [Key]
        public long VendorCapabilityId { get; set; }

        public long CapabilityId { get; set; }

        public string CapabilityName { get; set; }

        public long VendorId { get; set; }

        public string VendorRanking { get; set; }

        public string PMA_DER { get; set; }

        public long ItemMasterId { get; set; }

        public Int32? TAT { get; set; }

        public Decimal Cost { get; set; }

        public long AlternatePartId { get; set; }

        public long ATAChapterId { get; set; }

        public long ATASubchapterId { get; set; }

        public string Memo { get; set; }

        public string capabilityDescription { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32? MasterCompanyId { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
    }
}
