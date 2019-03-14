﻿using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class VendorContactRepository : Repository<VendorContact>, IVendorContactRepository
    {
            public VendorContactRepository(ApplicationDbContext context) : base(context)
            { }

            public IEnumerable<VendorContact> GetVendorContacts()
            {
                return _appContext.VendorContact.Include("MasterCompany").OrderByDescending(c => c.VendorContactId).ToList();
            }


            //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

            private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        }
    }

