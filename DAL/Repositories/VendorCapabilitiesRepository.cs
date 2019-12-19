using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class VendorCapabilitiesRepository : Repository<DAL.Models.VendorCapabiliy>, IVendorCapabilitiesRepository
    {
        public VendorCapabilitiesRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<Models.VendorCapabiliy> GetVendorCapabilitiesData()
        {
            return _appContext.VendorCapabiliy.Include("MasterCompany").Where(a => a.IsDeleted == false || a.IsDeleted == null).OrderByDescending(a => a.VendorCapabilityId).ToList();

        }
        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        public IEnumerable<object> GetvendorCapabilityListByVendorId(long vendorId)
        {
            var data = (from vc in _appContext.VendorCapabiliy
                        join v in _appContext.Vendor on vc.VendorId equals v.VendorId
                        join im in _appContext.ItemMaster on vc.ItemMasterId equals im.ItemMasterId
                        join vct in _appContext.vendorCapabilityType on vc.VendorCapabilityId equals vct.VendorCapabilityId
                        join vcat in _appContext.capabilityType on vct.CapabilityTypeId equals vcat.CapabilityTypeId
                        where vc.VendorId == vendorId
                        select new
                        {
                            v.VendorName,
                            v.VendorCode,
                            im.PartNumber,
                            im.PartDescription,
                            im.ManufacturerId,
                            manufacturerName = im.Manufacturer.Name,
                            vc.VendorCapabilityId,
                            vc.VendorId,
                            vc.VendorRanking,
                            vc.PMA_DER,
                            vc.ItemMasterId,
                            vc.TAT,
                            vc.Cost,
                            vc.AlternatePartId,
                            vc.ATAChapterId,
                            vc.ATASubchapterId,
                            vc.Memo,
                            vc.CreatedDate,
                            vc.UpdatedDate,
                            vc.capabilityDescription,
                            vc.IsActive,
                            CapabilityType = vcat.Description
                        }).OrderByDescending(p=>p.UpdatedDate).ToList();
            return data;


        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }

}
