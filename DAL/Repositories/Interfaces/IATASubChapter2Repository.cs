using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IATASubChapter2Repository : IRepository<ATASubChapter2>
    {
        IEnumerable<ATASubChapter2> GetAllATAMainnData();
    }
}
