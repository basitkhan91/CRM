using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface ICompany : IRepository<Company>
    {
        IEnumerable<Company> GetAllCompanyData();


        long CreateCompanyBillingAddress(CompanyBillingAddress billingAddress);
        void UpdateCompanyBillingAddress(CompanyBillingAddress billingAddress);
        void DeleteCompanyBillingAddress(long billingAddressId, string updatedBy);
        void CompanyBillingAddressStatus(long billingAddressId, bool status, string updatedBy);
        IEnumerable<object> GetCompanyBillingAddress();
        object CompanyBillingAddressById(long billingAddressId);


        long CreateCompanyShippingAddress(CompanyShippingAddress ShippingAddress);
        void UpdateCompanyShippingAddress(CompanyShippingAddress ShippingAddress);
        void DeleteCompanyShippingAddress(long ShippingAddressId, string updatedBy);
        void CompanyShippingAddressStatus(long ShippingAddressId, bool status, string updatedBy);
        IEnumerable<object> GetCompanyShippingAddress();
        object CompanyShippingAddressById(long ShippingAddressId);

    }
}
