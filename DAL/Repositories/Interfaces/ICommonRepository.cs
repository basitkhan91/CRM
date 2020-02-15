using DAL.Common;
using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ICommonRepository
    {
        IEnumerable<VendorContactList> GetVendorContactsList(long vendorId);

        IEnumerable<CustomerContactList> GetCustomerContactsList(long customerId);

        long CreateMasterParts(MasterParts masterPart);
        void UpdateMasterParts(MasterParts masterPart);
        void DeleteMasterParts(long itemMasterId, string updatedBy);
        void MasterPartsStatus(long masterPartId, bool status, string updatedBy);
        List<MasterParts> GetMasterParts();

        void CreateRestrictedParts(List<RestrictedParts> restrictedParts, long referenceId, int moduleId);
        void UpdateRestrictedParts(List<RestrictedParts> restrictedParts, long referenceId, int moduleId,string partType="");
        List<RestrictedParts> GetRestrictedParts(long moduleId, long? referenceId, string partType);

        void CreateCustomerTaxTypeRateMapping(List<CustomerTaxTypeRateMapping> customerTaxTypeRateMappings ,long referenceId);

        void CreateRestrictPmaList(List<RestrictsPMAList> restrictsPmaLists, long referenceId);
        void UpdateRestrictPmaList(List<RestrictsPMAList> restrictsPmaLists, long referenceId);
        List<RestrictsPMAList> GetRestrictPmaList(int itemMasterId, long? customerId);

        void CreateRestrictDerList(List<RestrictsBERList> restrictsDerLists, long referenceId);
        void UpdateRestrictDerList(List<RestrictsBERList> restrictsDerLists, long referenceId);
        List<RestrictsBERList> GetRestrictDerList(int itemMasterId, long? customerId);

        void CreateClassificationMappings(List<ClassificationMapping> classificationMappings, int moduleId, long referenceId, string createdBy);
        void UpdateClassificationMappings(List<ClassificationMapping> classificationMappings, int moduleId, long referenceId, string createdBy);
        IEnumerable<object> GetCustomerClassificationMappings(int moduleId, long referenceId);
        IEnumerable<object> GetVendorClassificationMappings(int moduleId, long referenceId);

        dynamic UpdateEntity(dynamic uiModel, dynamic dbModel, ref IDictionary<string, object> keyValuePairs);

        IEnumerable<object> BindDropdowns(string tableName, string primaryColumn, string textColumn,long count);

        long CreateShippingVia(ShippingVia shippingVia);
        void UpdateShippingVia(ShippingVia shippingVia);
        object GetShippingViaDetails(long shippingViaId, int userType);
        IEnumerable<object> BindShipViaDetails(int userType, long referenceId);

        long? CreateAddress(Address address);
        void UpdateAddress(Address address);
        object GetAddressDetails(long addressId);

        Dictionary<string, long> GetManagementStructure(long manmgStrucId);
        Dictionary<string, string> GetManagementStructureCodes(long manmgStrucId);

        object GetDefaultCurrency(long legalEntityId);
        void CreateIntegrationMappings(List<IntegrationPortalMapping> integrationMappings, int moduleId, long referenceId, string createdBy);
        IEnumerable<object> GetIntegrationMappings(long referenceId, int moduleId);

        IEnumerable<object> ManagementStructureLevelOneData();
        IEnumerable<object> ManagementStructureLevelTwoData(long parentId);
        IEnumerable<object> ManagementStructureLevelThreeData(long parentId);
        IEnumerable<object> ManagementStructureLevelFourData(long parentId);
        IEnumerable<object> GetRestrictedPartsWithDescription(long moduleId, long? referenceId, string partType);
        void CreateHistory(dynamic obj, int moduleId, long referenceId, long addressId, int addressType, bool isFromGenInfo,bool status=false);
        IEnumerable<object> GetShippingBillingAddressAudit(long referenceId, long addressId, long addressType, int moduleId);
        void CreateContactHistory(dynamic obj, int moduleId, long referenceId, long contactId);
        IEnumerable<object> GetContactAudit(long referenceId, int moduleId, long contactId);
        void ShippingBillingAddressHistory(long referenceId, int moduleId, long billingShippingId, int addressType, string updatedBy);
        void ContactsHistory(long referenceId, int moduleId, long contactId, string updatedBy);
        object GetPartPurchaseSaleDetails(long itemMasterId, string condition);

        IEnumerable<object> GetEmployeesByJobTitle(long jobTitleId);
        IEnumerable<object> GetEmployeesByExpertise(long expertiseId);
        IEnumerable<object> GetEmployeeStation(long employeeId);
        IEnumerable<object> GetJobTitleTypes(long masterCompanyId);
        IEnumerable<object> GetExpertiseTypes(long masterCompanyId);
        bool GetDelete(long id, string updatedBy);
    }
}
