using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IDefaultMessage : IRepository<DAL.Models.DefaultMessage>
    {
        IEnumerable<DAL.Models.DefaultMessage> GetAllDefaultMessageData();


        //  void CreateAction(DAL.Models.Action action);

    }
}