using System;
using DAL.Models;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface ISiteRepository : IRepository<Site>
    {
        IEnumerable<object> GetAllSiteData();
    }

}
