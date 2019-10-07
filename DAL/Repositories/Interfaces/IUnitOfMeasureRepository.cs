using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Models;
using Microsoft.AspNetCore.Http;

namespace DAL.Repositories.Interfaces
{

    public interface IUnitOfMeasureRepository : IRepository<UnitOfMeasure>
    {
        IEnumerable<UnitOfMeasure> getUnitOfMeasureData();
       new IQueryable<UnitOfMeasure> GetPaginationData();

        IEnumerable<DAL.Models.UnitOfMeasureAudit> GetUnitOfMeasureAuditDetails(long unitOfMeasureId);
        IEnumerable<UnitOfMeasure> UploadUOMCustomData(IFormFile file);

        //  void CreateAction(DAL.Models.Action action);

    }
}

