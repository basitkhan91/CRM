using DAL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class CustomerAircraftMappingViewModel
    {
        public long CustomerAircraftMappingId { get; set; }
        public long CustomerId { get; set; }
        public int AircraftTypeId { get; set; }
        public long? AircraftModelId { get; set; }
        public long? DashNumberId { get; set; }
        public string DashNumber { get; set; }
        public string ModelNumber { get; set; }
        public string AircraftType { get; set; }
        public string AircraftModel { get; set; }
        public string Memo { get; set; }
        public int MasterCompanyId { get; set; }
        public int? Inventory { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }

      

    }
    public class CustomerAircraftMappingViewModelValidator : AbstractValidator<CustomerAircraftMappingViewModel>
    {
        public CustomerAircraftMappingViewModelValidator()
        {
        }
    }
}