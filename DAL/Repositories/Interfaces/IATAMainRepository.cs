﻿using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IATAMainRepository : IRepository<ATAChapter>
    {
        IEnumerable<ATAChapter> GetAllATAMainnData();
        IEnumerable<ATAChapter> GetAllATAMainData();
    }
}
