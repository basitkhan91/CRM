using DAL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class CreditTermsViewModel
    {
        public Int16 CreditTermsId { get; set; }

        public string Memo { get; set; }

        public string Name { get; set; }

        public decimal  Percentage { get; set; }

        public byte Days { get; set; }

        public byte NetDays { get; set; }

        public Int32 MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public MasterCompany MasterCompany { get; set; }

        public bool? IsDeleted { get; set; }


    }

    public class CreditTermsViewModelValidator : AbstractValidator<CreditTermsViewModel>
    {
        public CreditTermsViewModelValidator()
        {
        }
    }
}