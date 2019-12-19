using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace DAL.Repositories.Interfaces
{
    public interface ITaxTypeRepository : IRepository<DAL.Models.TaxType>
    {
        
            IEnumerable<DAL.Models.TaxType> GetAllTaxTypeData();
            new IQueryable<TaxType> GetPaginationData();

        IEnumerable<DAL.Models.TaxTypeAudit> GetTaxTypeAuditDetails(long Id);


    }
}
