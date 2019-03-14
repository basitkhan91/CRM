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
    public class ReasonRepository : Repository<Reason>, IReasonRepository
    {
        public ReasonRepository(ApplicationDbContext context) : base(context)
        { }


        public IEnumerable<Reason> GetAllReasonData()
        {
            try
            {
                var result = _appContext.Reason.Include("MasterCompany").Where(c => c.IsDelete == false || c.IsDelete == null).OrderBy(c => c.ReasonForRemoval).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }


        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
