using System;
using System.Collections.Generic;
using System.Text;


namespace DAL.Repositories.Interfaces
{
    public interface ITaxTypeRepository : IRepository<DAL.Models.TaxType>
    {
        
            IEnumerable<DAL.Models.TaxType> GetAllTaxTypeData();
    }
}
