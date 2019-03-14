using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IWarning : IRepository<DAL.Models.Warning>
    {
        IEnumerable<DAL.Models.Warning> GetAllData();




    }
}
