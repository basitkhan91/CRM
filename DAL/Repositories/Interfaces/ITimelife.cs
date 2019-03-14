using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface ITimeLife : IRepository<DAL.Models.TimeLife>
    {
        IEnumerable<DAL.Models.TimeLife> GetAllTimelifeData();


        

    }
}
