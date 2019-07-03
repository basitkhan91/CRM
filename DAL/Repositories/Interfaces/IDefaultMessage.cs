using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IDefaultMessage : IRepository<DAL.Models.DefaultMessage>
    {
        IEnumerable<DAL.Models.DefaultMessage> GetAllDefaultMessageData();

        new IQueryable<DefaultMessage> GetPaginationData();
        //  void CreateAction(DAL.Models.Action action);

    }
}