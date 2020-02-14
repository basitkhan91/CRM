using DAL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class CustomerClassificationViewModel : IAudit
    {
        public Int32 CustomerClassificationId { get; set; }

        public string Description { get; set; }
        public string Memo { get; set; }

        public Int32 MasterCompanyId { get; set; }

        public bool IsActive { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public MasterCompany MasterCompany { get; set; }

        public bool IsDeleted { get; set; }


    }

    public class CustomerClassificationViewModelValidator : AbstractValidator<CustomerClassificationViewModel>
    {
        public CustomerClassificationViewModelValidator()
        {
        }
    }
}