
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace DAL.Repositories
{
    public class CustomerDocumentDetailRepository : Repository<DAL.Models.CustomerDocumentDetail>, ICustomerDocumentDetail
    {
        public CustomerDocumentDetailRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.CustomerDocumentDetail> GetAllData()
        {
            return _appContext.CustomerDocumentDetails.OrderByDescending(c => c.CustomerDocumentDetailId).ToList();

        }



        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}