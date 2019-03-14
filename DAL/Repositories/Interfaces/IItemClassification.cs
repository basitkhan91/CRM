using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IItemClassification : IRepository<DAL.Models.ItemClassfication>
    {
        IEnumerable<DAL.Models.ItemClassfication> getItemClassification();


        //  void CreateAction(DAL.Models.Action action);

    }
}
