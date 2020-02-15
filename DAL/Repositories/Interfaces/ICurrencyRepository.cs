using DAL.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface ICurrencyRepository : IRepository<Currency>
    {
        IEnumerable<Currency> GetAllCurrencyData();
        new IQueryable<Currency> GetPaginationData();

        IEnumerable<DAL.Models.Currency> UploadCurrencyCustomData(IFormFile file);
        Object GetCurrencyAuditDetails(long id);
    }
}
