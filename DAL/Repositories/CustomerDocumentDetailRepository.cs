
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Models;
using Remotion.Linq.Clauses;


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

        public IEnumerable<object> GetAllDataById(long Id)
        {

            var data = (from v in _appContext.CustomerDocumentDetails
                join x in _appContext.AttachmentDetails on v.AttachmentId equals x.AttachmentId 
                where v.CustomerId == Id
                select new
                {
                    v.CustomerDocumentDetailId,
                    v.AttachmentId,
                    x.Link,
                    v.MasterCompanyId,
                    v.CreatedBy,
                    v.UpdatedBy,
                    v.CreatedDate,
                    v.CustomerId,
                    v.DocDescription,
                    v.DocMemo,
                    v.DocName,
                    v.UpdatedDate,
                    v.IsActive,
                    v.IsDeleted
                }).ToList();
            return data;


        }

        public IEnumerable<object> GetAttachedDocumentById(long id)
        {

            var data = (from v in _appContext.AttachmentDetails
                        where v.AttachmentId == id
                        select new
                {
                    v.Link
                }).ToList();
            return data;





        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}