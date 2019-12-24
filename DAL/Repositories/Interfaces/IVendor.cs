using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{


    public interface IVendor : IRepository<Vendor>
    {
        IEnumerable<Vendor> GetVendors();
        IEnumerable<object> GetVendorsAuditHistory(long vendorId);
        IEnumerable<Vendor> GetVendorsLite();


        IEnumerable<object> GetVendorListDetails(bool isActive);
        IEnumerable<object> GetvendorPurchaseOrderList(long id);
        IEnumerable<object> Getvendorrepairunit(long vendorId);

        IEnumerable<object> GetVendorWithid(long vendorId);

        IEnumerable<object> GetPayments();
        IEnumerable<object> GetVendorListByName(string vendorname);
        IEnumerable<object> GetmanagementSiteList(long id);

        IEnumerable<object> vendorCapabilityTypeGet(long id);
        IEnumerable<object> vendorAircraftManufacturerGet(long id);
        IEnumerable<object> vendorAircraftManufacturerModelGet(long id);
        IEnumerable<object> getVendorCapabilityData(long id);
        IEnumerable<object> getVendorByID(long vendorid, bool isDContact);

        long CreateVendorBillingAddress(VendorBillingAddress billingAddress);
        void UpdateVendorBillingAddress(VendorBillingAddress billingAddress);
        void DeleteVendorBillingAddress(long billingAddressId, string updatedBy);
        void DeleteVendorShippingAddress(long shippingAddressId, string updatedBy);
        bool DeleteVendorShippingViaAddress(long vendorShippingId, string updatedBy);
        void VendorBillingAddressStatus(long billingAddressId, bool status, string updatedBy);
        IEnumerable<object> GetVendorBillingAddress();
        object VendorBillingAddressById(long billingAddressId);

        //  void CreateAction(DAL.Models.Action action);

        IEnumerable<object> GetVendorBillingSiteNames(long vendorId);
        IEnumerable<Vendor> getVendorsForDropdown();

        IEnumerable<object> GetVendorBillingAddressAudit(long vendorId, long vendorBillingaddressId);

        IEnumerable<object> GetVendorPOMemoList(long vendorId);
        IEnumerable<object> GetVendorROMemoList(long vendorId);
        void UpdateVendorMemoText(long id, string type, string memoText, string updatedBy);
        VendorDocumentDetails GetVendorDocumentDetailById(long id);

        IEnumerable<object> GetVendorProcessList(int companyId);
        List<VendorDocumentDetailsAudit> GetVendorDocumentDetailsAudit(long id);
        IEnumerable<object> GetVendorCapabilityAudit(long VendorCapabilityId, long VendorId);
        IEnumerable<object> GetAllBillingAddressDetails(long id);
        void VendorProcess1099Save(Master1099 vendorProcess1099);
        void VendorProcess1099StatusUpdate(long id, bool status, string updatedBy);
        void VendorProcess1099Delete(long id, string updatedBy);
        List<Master1099Audit> GetVendorProcess1099Audit(long id);

        IEnumerable<object> GetVendorGeneralDocumentDetailById(long id, int moduleId);
        bool GetVendorGeneralDocumentDelete(long id, string updatedBy);
        IEnumerable<object> GetVendorProcessListForFinance(int companyId);
        IEnumerable<object> GetVendorProcessListFromTransaction(long vendorId);

        IEnumerable<VendorCapabilityAircraft> VendorAircraft(VendorCapabilityAircraft[] vendorAircraftMapping);
        IEnumerable<object> VendorAircraftDataByCapsId(long vendorCapabilityId);
        bool EditVendorAircraft(long id, string memo, string updatedBy);
        bool DeleteVendorAircraft(long id, string updatedBy);

        IEnumerable<object> searchItemAircraftMappingDataByMultiTypeIdModelIDDashID(long VendorCapabilityId, string AircraftTypeId, string AircraftModelId, string DashNumberId);

    }
}
