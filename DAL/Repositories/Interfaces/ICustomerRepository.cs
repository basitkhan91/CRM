// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

using DAL.Common;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories.Interfaces
{
    public interface ICustomerRepository : IRepository<Customer>
    {
        // IEnumerable<Customer> GetTopActiveCustomers(int count);
        IEnumerable<object> GetAllCustomersData();

        IEnumerable<object> GetCustomerWithid(long customerId);

        IEnumerable<object> GetAircraftMapped(long customerId);
        IEnumerable<object> GetTaxTypeRateMapped(long customerId);
        IEnumerable<object> GetATAMapped(long customerId);
        IEnumerable<object> GetATAContactMapped(long customerId);

        //IEnumerable <object> GetCustomerBynameList(string name);
        IEnumerable<object> GetCustomerBynameList(string name);
        IEnumerable<object> getIntegrationData(long id);
        IEnumerable<object> Getdescriptionbypart(string name);

        IEnumerable<Customer> getAllCustomer();
        IEnumerable<Customer> getAllCustomersInfo();
        IEnumerable<object> GetCustomerRowByid(long customerId);
        new IQueryable<Customer> GetPaginationData();

        void CreateCustomerInternationalShippingDetails(CustomerInternationalShipping model);
        void UpdateCustomerInternationalShippingDetails(CustomerInternationalShipping model);
        void DeleteCustomerInternationalShippingDetails(long id, string updatedBy);
        void CustomerInternationalShippingDetailsStatus(long id, bool status, string updatedBy);
        GetData<CustomerInternationalShipping> GetCustomerInternationalShippingDetails(CustomerInternationalShipping model);
        GetData<CustomerInternationalShipping> GetCustomerInternationalShippingDetails(long customerId, int pageNumber, int pageSize);
        CustomerInternationalShipping GetCustomerInternationalShippingDetailsById(long id);


        void CreateShippingViaDetails(ShippingViaDetails model);
        void UpdateShippingViaDetails(ShippingViaDetails model);
        void DeleteShippingViaDetails(long id, string updatedBy);
        void ShippingViaDetailsStatus(long id, bool status, string updatedBy);
        GetData<ShippingViaDetails> GetShippingViaDetails(ShippingViaDetails model);
        GetData<ShippingViaDetails> GetShippingViaDetails(long internationalShippingId, int pageNumber, int pageSize);
        ShippingViaDetails GetShippingViaDetailsById(long id);
        IEnumerable<object> searchCustomerAircraftMappingDataByMultiTypeIdModelIDDashID(long CustomerId, string AircraftTypeId, string AircraftModelId, string DashNumberId);
        IEnumerable<object> searchgetCustomerATAMappingDataByMultiTypeIdATAIDATASUBID(long CustomerId, string ATAChapterId, string ATASubChapterID);

    }
}
