using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{


    public interface IPublication : IRepository<DAL.Models.Publication>
    {
        IEnumerable<DAL.Models.Publication> GetPublications();


        //  void CreateAction(DAL.Models.Action action);

    }
}
