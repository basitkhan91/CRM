using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class CustomerClassificationRepository : Repository<CustomerClassification>, ICustomerClassificationRepository
    {
        public CustomerClassificationRepository(ApplicationDbContext context) : base(context)
        { }


        public IEnumerable<DAL.Models.CustomerClassification> GetAllCustomerClassificationData()
        {
         
           
                return _appContext.CustomerClassification.Include("MasterCompany").Where(c => c.IsDeleted == false || c.IsDeleted == null).OrderByDescending(c => c.CustomerClassificationId).ToList();

       }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}

