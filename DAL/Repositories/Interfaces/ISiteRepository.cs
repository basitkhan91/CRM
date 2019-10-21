using System;
using DAL.Models;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;  

namespace DAL.Repositories.Interfaces
{
    public interface ISiteRepository : IRepository<Site>
    {
        IEnumerable<object> GetAllSiteData();

        IEnumerable<Site> BulkUpload(IFormFile file);
    }

}
