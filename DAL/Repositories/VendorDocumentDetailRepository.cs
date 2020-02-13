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
                            v.IsDeleted,
                            //AttachmentDetails = (from vdd in _appContext.VendorDocumentDetails
                            //                     join atd in _appContext.AttachmentDetails on v.AttachmentId equals atd.AttachmentId into atdd
                            //                     from atd in atdd.DefaultIfEmpty()
                            //                     where vdd.VendorId == v.VendorId
                            //                     select atd).ToList()

                            AttachmentDetails = _appContext.VendorDocumentDetails
                     .Join(_appContext.AttachmentDetails,
                           custDoc => custDoc.AttachmentId,
                           atd => atd.AttachmentId,
                           (custDoc, atd) => new {

                               atd.AttachmentDetailId,
                               atd.AttachmentId,
                               atd.FileName,
                               atd.Link,
                               atd.FileSize,
                               atd.CreatedBy,
                               atd.CreatedDate,
                               atd.UpdatedBy,
                               atd.UpdatedDate,
                               atd.Description,
                               atd.IsActive,
                               atd.IsDeleted,                     
                           }
                          ).Where(p => p.AttachmentId == v.AttachmentId && p.IsActive == true && p.IsDeleted == false)



                        }).OrderByDescending(p=>p.UpdatedDate).ToList();
            return data;


        }

        public IEnumerable<object> GetAttachedDocumentById(long id)
        {

            var data = (from v in _appContext.AttachmentDetails
                        where v.AttachmentId == id && v.IsActive==true && v.IsDeleted==false
                        select new
                        {
                            v.Link
                        }).ToList();
            return data;





        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
