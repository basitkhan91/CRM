using DAL.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IItemClassification : IRepository<DAL.Models.ItemClassfication>
    {
        IEnumerable<DAL.Models.ItemClassfication> getItemClassification();
        new IQueryable<ItemClassfication> GetPaginationData();

        IEnumerable<ItemClassfication> UploadCustomData(IFormFile file);

        //  void CreateAction(DAL.Models.Action action);

    }
}
