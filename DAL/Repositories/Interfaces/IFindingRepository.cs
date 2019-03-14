﻿using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;

namespace DAL.Repositories.Interfaces
{
    public interface IFindingRepository : IRepository<Finding>
    {
        IEnumerable<Finding> GetAllFindingData();
    }
}
