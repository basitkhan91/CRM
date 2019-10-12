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

        void CreateRestrictedParts(List<RestrictedParts> restrictedParts, long? referenceId);
        void UpdateRestrictedParts(List<RestrictedParts> restrictedParts, long? referenceId);
        List<RestrictedParts> GetRestrictedParts(int moduleId, long? referenceId, string partType);

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
    }
}
