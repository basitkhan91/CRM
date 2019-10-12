using DAL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace QuickApp.Pro.ViewModels
{
    public class VendorClassificationViewModel
    {
        public long VendorClassificationId { get; set; }

        public string ClassificationName { get; set; }
        public string Memo { get; set; }

        public Int32 MasterCompanyId { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public MasterCompany MasterCompany { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }
        public string UploadStatus { get; set; }
    }
    public class VendorClassificationViewModelValidator : AbstractValidator<VendorClassificationViewModel>
    {
        public VendorClassificationViewModelValidator()
        {
        }
    }
}