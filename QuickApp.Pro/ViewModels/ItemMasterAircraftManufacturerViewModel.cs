using DAL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class ItemMasterAircraftManufacturerViewModel
    {

        public long ItemMasterAircraftManufacturerId { get; set; }

        public long ItemMasterId { get; set; }

        public int AircraftTypeId { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }

        public bool? IsActive { get; set; }
    }
}
