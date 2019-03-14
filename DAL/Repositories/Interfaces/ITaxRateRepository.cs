using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;

namespace DAL.Repositories.Interfaces
{
    public interface ITaxRateRepository : IRepository<TaxRates>
    {
        IEnumerable<TaxRates> GetAllTaxRateData();
    }
}
