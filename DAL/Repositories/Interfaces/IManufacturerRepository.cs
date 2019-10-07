using DAL.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories.Interfaces
{
  public interface IManufacturerRepository : IRepository<DAL.Models.Manufacturer>
    {
        IEnumerable<DAL.Models.Manufacturer> GetAllManufacturerData();
       new IQueryable<Manufacturer> GetPaginationData();
        IEnumerable<ManufacturerAudit> GetManufacturerHistory(long manufacturerId);
        IEnumerable<Manufacturer> UploadCustomData(IFormFile file);
    }
    
}
