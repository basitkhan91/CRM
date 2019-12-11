using DAL.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class VendorDocumentDetailRepository : Repository<DAL.Models.VendorDocumentDetails>, IVendorDocumentDetailRepository
    {
        public VendorDocumentDetailRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.VendorDocumentDetails> GetAllData()
        {
            return _appContext.VendorDocumentDetails.OrderByDescending(c => c.VendorDocumentDetailId).ToList();

        }

        public IEnumerable<object> GetAllDataById(long Id)
        {

            var data = (from v in _appContext.VendorDocumentDetails
                        //join x in _appContext.AttachmentDetails on v.AttachmentId equals x.AttachmentId
                        where v.VendorId == Id && v.IsActive==true && v.IsDeleted==false
                        select new
                        {
                            v.VendorDocumentDetailId,
                            v.AttachmentId,
                            //x.Link,
                            v.MasterCompanyId,
                            v.CreatedBy,
                            v.UpdatedBy,
                            v.CreatedDate,
                            v.VendorId,
                            v.DocDescription,
                            v.DocMemo,
                            v.DocName,
                            v.UpdatedDate,
                            v.IsActive,
                            v.IsDeleted
                        }).OrderByDescending(p=>p.UpdatedDate).ToList();
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
