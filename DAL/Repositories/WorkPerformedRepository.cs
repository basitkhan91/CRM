﻿
using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using DAL;
using DAL.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;


namespace DAL.Repositories
{
    public class WorkPerformedRepository : Repository<WorkPerformed>, IWorkPerformedRepository
    {
        public WorkPerformedRepository(ApplicationDbContext context) : base(context)
        { }


        public IEnumerable<WorkPerformed> GetAllWorkPerformedData()
        {
            try
            {
                var result = _appContext.WorkPerformed.Include("MasterCompany").Where(c => c.IsDeleted == false || c.IsDeleted == null).OrderBy(c => c.Description).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public IEnumerable<WorkPerformedAudit> GetWorkPerformedHistory(long workPerformedId)
        {
            try
            {
                return _appContext.WorkPerformedAudit.Where(p => p.WorkPerformedId == workPerformedId).OrderByDescending(p => p.UpdatedDate).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
