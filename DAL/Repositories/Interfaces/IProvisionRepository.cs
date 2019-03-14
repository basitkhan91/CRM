using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IProvisionRepository : IRepository<Provision>
    {
        IEnumerable<Provision> GetAllProvisionData();
    }
}
