﻿using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IWorkScopeRepository : IRepository<WorkScope>
    {
        IEnumerable<WorkScope> GetAllWorkScopeData();
        IEnumerable<WorkScopeAudit> GetWorkScopeHistory(long workScopeId);  
    }
}
