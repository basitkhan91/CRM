
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
                            // join x in _appContext.AttachmentDetails on v.AttachmentId equals x.AttachmentId 
                        where v.CustomerId == Id && v.IsDeleted == false
                        select new
                        {
                            v.CustomerDocumentDetailId,
                            v.AttachmentId,
                            // x.Link,
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
                            v.IsDeleted,
                            //AttachmentDetails = (from cdd in _appContext.CustomerDocumentDetails
                            //                     join atd in _appContext.AttachmentDetails on cdd.AttachmentId equals atd.AttachmentId into atdd
                            //                     from atd in atdd.DefaultIfEmpty()
                            //                     where cdd.CustomerId == v.CustomerId select atd).ToList()
                            AttachmentDetails = _appContext.CustomerDocumentDetails
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
                               atd.IsDeleted}
                           ).Where(p=>p.AttachmentId== v.AttachmentId && p.IsActive==true && p.IsDeleted == false)



                        });
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
        public IEnumerable<object> GetAllAudotHistoryById(long Id,long customerId,int moduleId)
        {

            var data = (from v in _appContext.DocumentsAudit
                        where v.AttachmentId == Id && v.ReferenceId == customerId && v.ModuleId==moduleId
                        select new
                        {
                            v.AuditDocumentId,
                             v.AttachmentId,
                            v.MasterCompanyId,                           
                            v.DocDescription,
                            v.DocMemo,
                            v.DocName,                           
                            v.IsActive,                          
                            v.FileName,
                            v.Link,
                            v.Description,
                            v.CreatedBy,
                            v.UpdatedBy,
                            v.CreatedDate,
                            v.UpdatedDate,
                            //                    AttachmentDetails = _appContext.CustomerDocumentDetails
                            //.Join(_appContext.AttachmentDetails,
                            //      custDoc => custDoc.AttachmentId,
                            //      atd => atd.AttachmentId,
                            //      (custDoc, atd) => new
                            //      {
                            //          atd.AttachmentDetailId,
                            //          atd.AttachmentId,
                            //          atd.FileName,
                            //          atd.Link,
                            //          atd.IsActive,
                            //          atd.Description,
                            //          atd
                            //      .IsDeleted
                            //      }
                            // ).



                        }).OrderByDescending(p => p.AuditDocumentId).ToList();
            return data;
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}