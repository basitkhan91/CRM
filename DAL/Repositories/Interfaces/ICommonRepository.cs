using DAL.Common;
using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface ICommonRepository
    {
        IEnumerable<ContactList> GetVendorContactsList(long vendorId);

        IEnumerable<CustomerContactList> GetCustomerContactsList(long customerId);

        void CreateMasterParts(MasterParts masterPart);
        void UpdateMasterParts(MasterParts masterPart);
        void DeleteMasterParts(long itemMasterId, string updatedBy);
        List<MasterParts> GetMasterParts();

        void CreateRestrictedParts(List<RestrictedParts> restrictedParts, long? referenceId);
        void UpdateRestrictedParts(List<RestrictedParts> restrictedParts, long? referenceId);
        List<RestrictedParts> GetRestrictedParts(int moduleId, long? referenceId, string partType);
        void CreateClassificationMappings(List<ClassificationMapping> classificationMappings, long referenceId);
        void UpdateClassificationMappings(List<ClassificationMapping> classificationMappings, long referenceId);
        List<ClassificationMapping> GetCustomerClassificationMappings(int moduleId, int referenceId);
        List<ClassificationMapping> GetVendorClassificationMappings(int moduleId, int referenceId);
    }
}
