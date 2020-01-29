using DAL.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IPublicationTypeRepository : IRepository<PublicationType>
    {
        IEnumerable<object> GetPublicationTypesList();
        PublicationType CreatePublicationType(PublicationType publicationType);
        object GetPublicationTypeById(long publicationTypeId);
        void DeletePublicationType(long publicationTypeId, string updatedBy);
        void PublicationTypeStatus(long publicationTypeId, bool status, string updatedBy);
        IEnumerable<PublicationTypeAudit> PublicationTypeHistory(long publicationTypeId);
        IEnumerable<PublicationType> UploadCustomData(IFormFile file);
    }
}
