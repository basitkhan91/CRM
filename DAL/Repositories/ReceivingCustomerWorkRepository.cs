using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class ReceivingCustomerWorkRepository : Repository<DAL.Models.ReceivingCustomerWork>, IReceivingCustomerWork
    {
        public ReceivingCustomerWorkRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<object> GetAllreceivingCustomerWork()
        {
            try
            {
                var result = (from stl in _appContext.ReceivingCustomerWork

                              join im in _appContext.ItemMaster on stl.PartNumber equals im.PartNumber


                              join co in _appContext.Condition on stl.ConditionId equals co.ConditionId


                              join si in _appContext.Site on stl.SiteId equals si.SiteId into sit
                              from si in sit.DefaultIfEmpty()

                              join w in _appContext.Warehouse on stl.WarehouseId equals w.WarehouseId into ware
                              from w in ware.DefaultIfEmpty()

                              join l in _appContext.Location on stl.LocationId equals l.LocationId into loc
                              from l in loc.DefaultIfEmpty()

                              join sh in _appContext.Shelf on stl.ShelfId equals sh.ShelfId into she
                              from sh in she.DefaultIfEmpty()

                              join bi in _appContext.Bin on stl.BinId equals bi.BinId into bin
                              from bi in bin.DefaultIfEmpty()


                              join customer in _appContext.Customer on stl.CustomerId equals customer.CustomerId into cus
                              from customer in cus.DefaultIfEmpty()


                              join employee in _appContext.Employee on stl.EmployeeId equals employee.EmployeeId into emp
                              from employee in emp.DefaultIfEmpty()
                                  //join com in _appContext.Company on stl.CompanyId equals com.CompanyId into compe
                                  //from com in compe.DefaultIfEmpty()

                              join ti in _appContext.TimeLife on stl.TimeLifeCyclesId equals ti.TimeLifeCyclesId into time
                              from ti in time.DefaultIfEmpty()

                              join contact in _appContext.Contact on stl.WorkPhone equals contact.WorkPhone into con
                              from contact in con.DefaultIfEmpty()


                              select new
                              {
                                  stl,
                                  stl.ReceivingCustomerWorkId,
                                  im,
                                  employee,
                                  customer,
                                  employee.FirstName,
                                  customer.Name,
                                  contact.WorkPhone,
                                  contact.ContactId,
                                  partNumber = stl.PartNumber,
                                  stl.IsTimeLife,
                                  stl.IsExpirationDate,
                                  stl.IsMFGDate,
                                  stl.IsCustomerStock,
                                  stl.TimeLifeOrigin,
                                  stl.TimeLifeDate,
                                  stl.ReceivingCustomerNumber,
                                  stl.TagDate,
                                  location = l.Name,
                                  warehouse = w.Name,
                                  im.ExpirationDate,
                                  stl.SerialNumber,
                                  conditionId = co.ConditionId,
                                  stl.ChangePartNumber,
                                  partDescription = im.PartDescription,
                                  stl.Quantity,
                                  stl.CreatedDate,
                                  stl.UpdatedDate,
                                  stl.CreatedBy,
                                  stl.UpdatedBy,
                                  stl.ManufacturingLotNumber,
                                  stl.ManufacturingTrace,
                                  stl.ObtainFromType,
                                  stl.CustomerReference,
                                  condition = co.Description,
                                  stl.Shelf,
                                  stl.Bin,
                                  siteName = si.Name,
                                  shelfName = sh.Name,
                                  binName = bi.Name,
                                  siteId = stl.SiteId,
                                  stl.ShelfId,
                                  stl.BinId,
                                  warehouseId = stl.WarehouseId,
                                  locationId = stl.LocationId,
                                  stl.ObtainFrom,
                                  stl.Owner,
                                  stl.OwnerType,
                                  stl.TraceableTo,
                                  stl.Manufacturer,
                                  stl.ManufacturerLotNumber,
                                  stl.ManufacturingDate,
                                  stl.PartCertificationNumber,
                                  stl.CertifiedBy,
                                  stl.TagType,
                                  stl.TraceableToType,
                                  stl.TimeLifeCyclesId,

                                  //ti.CyclesRemaining,
                                  //ti.CyclesSinceNew,
                                  //ti.CyclesSinceOVH,
                                  //ti.CyclesSinceRepair,
                                  //ti.CyclesSinceInspection,
                                  //ti.TimeRemaining,
                                  //ti.TimeSinceInspection,
                                  //ti.TimeSinceNew,
                                  //ti.TimeSinceOVH,
                                  //ti.TimeSinceRepair,
                                  //ti.LastSinceInspection,
                                  //ti.LastSinceNew,
                                  //ti.LastSinceOVH,
                                  co,
                                  w,
                                  l,
                                  ti,
                                  //com,
                                 
                                  conditionType = co.Description,
                                  im.ItemTypeId,

                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IEnumerable<object> GetAllTimeLifeData(long id)
        {
            try
            {
                var result = (from ti in _appContext.TimeLife
                              where ti.TimeLifeCyclesId == id

                              select new
                              {
                                  ti.CyclesRemaining,
                                  ti.CyclesSinceNew,
                                  ti.CyclesSinceOVH,
                                  ti.CyclesSinceRepair,
                                  ti.CyclesSinceInspection,
                                  ti.TimeRemaining,
                                  ti.TimeSinceInspection,
                                  ti.TimeSinceNew,
                                  ti.TimeSinceOVH,
                                  ti.TimeSinceRepair,
                                  ti.LastSinceInspection,
                                  ti.LastSinceNew,
                                  ti.LastSinceOVH,


                              }).ToList();
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
