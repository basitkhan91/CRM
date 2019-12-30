using DAL.Common;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IFileUploadRepository
    {
        long UploadFiles(IFormFileCollection files, long? referenceId, int moduleId, string moduleName, string uploadedBy, int? masterCompanyId);
        long UploadFiles(IFormFileCollection files, long? referenceId, int moduleId, string moduleName, string uploadedBy, int? masterCompanyId,long attachmentId);
        List<AttachmentDetails> GetAttachmentDetails(long attachmentId, long? referenceId, int moduleId);
        void DeleteAttachement(List<long> attachmentDetailIds, string deletedBy);

        void UploadCustomFile(string moduleName, IFormFile file);
        IEnumerable<object> GetDocumentDetailById(long id, int moduleId);
        bool GetDocumentDelete(long id, string updatedBy);
    }
}
