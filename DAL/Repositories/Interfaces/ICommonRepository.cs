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
        void UpdateRestrictedParts(List<RestrictedParts> restrictedParts, long referenceId, int moduleId);
        List<RestrictedParts> GetRestrictedParts(int moduleId, long? referenceId, string partType);

        void CreateCustomerTaxTypeRateMapping(List<CustomerTaxTypeRateMapping> customerTaxTypeRateMappings ,long referenceId);

        void CreateRestrictPmaList(List<RestrictsPMAList> restrictsPmaLists, long referenceId);
        void UpdateRestrictPmaList(List<RestrictsPMAList> restrictsPmaLists, long referenceId);
        List<RestrictsPMAList> GetRestrictPmaList(int itemMasterId, long? customerId);

        void CreateRestrictDerList(List<RestrictsBERList> restrictsDerLists, long referenceId);
        void UpdateRestrictDerList(List<RestrictsBERList> restrictsDerLists, long referenceId);
        List<RestrictsBERList> GetRestrictDerList(int itemMasterId, long? customerId);

        void CreateClassificationMappings(List<ClassificationMapping> classificationMappings, long referenceId);
        void UpdateClassificationMappings(List<ClassificationMapping> classificationMappings, long referenceId);
        List<ClassificationMapping> GetCustomerClassificationMappings(int moduleId, int referenceId);
        List<ClassificationMapping> GetVendorClassificationMappings(int moduleId, int referenceId);

        dynamic UpdateEntity(dynamic uiModel, dynamic dbModel, ref IDictionary<string, object> keyValuePairs);

        IEnumerable<object> BindDropdowns(string tableName, string primaryColumn, string textColumn,long count);

        long CreateShippingVia(ShippingVia shippingVia);
        void UpdateShippingVia(ShippingVia shippingVia);
        object GetShippingViaDetails(long shippingViaId);
        IEnumerable<object> BindShipViaDetails(int userType, long referenceId);

        long? CreateAddress(Address address);
        void UpdateAddress(Address address);
        object GetAddressDetails(long addressId);


    }
}
