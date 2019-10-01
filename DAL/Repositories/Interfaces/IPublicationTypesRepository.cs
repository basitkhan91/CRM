using DAL.Common;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IPublicationTypesRepository : IRepository<PublicationType>
    {
        GetData<PublicationType> GetPublicationTypesList(string name, int pageNumber, int pageSize);
        long CreatePublicationType(PublicationType publicationType);
        object GetPublicationTypeById(long publicationTypeId);
        void DeletePublicationType(long publicationTypeId, string updatedBy);
        void PublicationTypeStatus(long publicationTypeId, bool status, string updatedBy);
        IEnumerable<PublicationTypes_Audit> PublicationTypeHistory(long publicationTypeId);
        IEnumerable<PublicationType> UploadCustomData(IFormFile file);
    }
}
