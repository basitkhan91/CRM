using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories.Interfaces
{
     public interface IDocument : IRepository<DAL.Models.Document>
    {
        IEnumerable<DAL.Models.Document> GetDocuments();

       new  IQueryable<Document> GetPaginationData();
        //  void CreateAction(DAL.Models.Action action);

    }
}
