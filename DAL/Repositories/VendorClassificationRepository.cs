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
   public class VendorClassificationRepository : Repository<VendorClassification>, IVendorClassificationRepository
    {
        public VendorClassificationRepository(ApplicationDbContext context) : base(context)
        { }
        
        public IEnumerable<VendorClassification> GetAllVendorClassificationData()
        {
            try
            {
                var result = _appContext.VendorClassification.Include("MasterCompany").Where(c => c.IsDeleted == false).OrderBy(c => c.ClassificationName).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<VendorClassification> GetAllActiveVendorClassificationData()
        {
            try
            {
                var result = _appContext.VendorClassification.Include("MasterCompany").Where(c => c.IsDeleted == false && c.IsActive==true).OrderBy(c => c.ClassificationName).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public IEnumerable<DAL.Models.VendorClassificationAudit> GetVendorClassificationAuditDetails(long vendorClassificationId)
        {
            return _appContext.VendorClassificationAudit.Where(c => c.VendorClassificationId == vendorClassificationId).OrderByDescending(p => p.UpdatedDate).ToList();

        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
