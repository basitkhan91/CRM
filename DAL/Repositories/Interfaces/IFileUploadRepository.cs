using DAL.Common;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IFileUploadRepository
    {
        void UploadFiles(IFormFileCollection files, List<AttachmentDetails> attachmentDetailList, long? referenceId, int moduleId, string entityName, string uploadedBy, int? masterCompanyId);
        List<AttachmentDetails> GetAttachmentDetails(long attachmentId, long? referenceId, int moduleId);
        void DeleteAttachement(List<long> attachmentDetailIds, string deletedBy);
    }
}
