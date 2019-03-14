using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
     public interface IDocument : IRepository<DAL.Models.Document>
    {
        IEnumerable<DAL.Models.Document> GetDocuments();


      //  void CreateAction(DAL.Models.Action action);
       
    }
}
