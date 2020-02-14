using DAL.Common;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{


    public interface IVendor : IRepository<Vendor>
    {

        IEnumerable<object> GetVendorsList(Filters<VendorFilters> vendorFilters);
        IEnumerable<object> VendorGlobalSearch(string filterText, int pageNumber, int pageSize,bool isActive);
        object GetVendorDataById(long vendorId);
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

        VendorCapabilityAircraft VendorAircraft(VendorCapabilityAircraft vendorAircraftMapping);
        IEnumerable<object> VendorAircraftDataByCapsId(long vendorCapabilityId);
        bool EditVendorAircraft(long id, string memo, string updatedBy);
        bool DeleteVendorAircraft(long id, string updatedBy);
        IEnumerable<object> GetVendorsCheckAuditHistory(long id);

        IEnumerable<object> searchItemAircraftMappingDataByMultiTypeIdModelIDDashID(long VendorCapabilityId, string AircraftTypeId, string AircraftModelId, string DashNumberId, string memo);


        IEnumerable<object> UploadVendorBillingAddressCustomData(IFormFile file, long vendorId);
        IEnumerable<object> UploadVendorShippingAddressCustomData(IFormFile file, long vendorId);
        IEnumerable<object> UploadVendorContactsCustomData(IFormFile file, long vendorId);
        IEnumerable<object> UploadVendorPaymentAddressCustomData(IFormFile file, long vendorId);
        IEnumerable<object> UploadVendorInternationalCustomData(IFormFile file, long vendorId);
        IEnumerable<object> getVendorShipVia(long id);

        VendorInternationalShipping CreateVendorInternationalShippingDetails(VendorInternationalShipping model);
        object VendorInternationalShippingDetailsById(long id);
        void VendorInternationalShippingDetailsStatus(long id, bool status, string updatedBy);
        void DeleteVendorInternationalShippingDetails(long id, string updatedBy);
        IEnumerable<object> GetVendorInternationalShippingDetails(long VendorId);
        IEnumerable<object> GetVendorInternationalShippingDetailsAudit(long VendorInternationalShippingId);

        VendorInternationalShipViaDetails CreateVendorInternationalShipViaDetails(VendorInternationalShipViaDetails model);
        object VendorInternationalShipViaDetailsById(long id);
        void VendorInternationalShipViaDetailsStatus(long id, bool status, string updatedBy);
        void DeleteVendorInternationalShipViaDetails(long id, string updatedBy);
        IEnumerable<object> GetVendorInternationalShipViaDetails(long VendorInternationalShippingId);
        IEnumerable<object> GetVendorInternationalShipViaDetailsAudit(long VendorInternationalShipViaDetailsId);
        IEnumerable<object> GetATAContactMapped(long contactId);
        IEnumerable<object> GetATAContactMappedAudit(long VendorContactATAMappingId);
        void VendorShippingStatus(long id, bool status, string updatedBy);
    }
}
