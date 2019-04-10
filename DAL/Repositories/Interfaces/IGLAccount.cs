using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IGLAccount : IRepository<GLAccount>
    {
        IEnumerable<GLAccount> GetAllglacoounts();

    }
}