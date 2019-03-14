using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class StockLineListRepository : Repository<StockLine>, IStockLineList
    {
        public StockLineListRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<object> GetAllStockLinelistData()
         {
            try
            {
                var result = (from stl in _appContext.StockLine

                              join im in _appContext.ItemMaster on stl.ItemMasterId equals im.ItemMasterId 
                              

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


                              join com in _appContext.Company on stl.CompanyId equals com.CompanyId into compe
                              from com in compe.DefaultIfEmpty()

                              join bu in _appContext.BusinessUnit on stl.BusinessUnitId equals bu.BusinessUnitId into busu
                              from bu in busu.DefaultIfEmpty()

                              join di in _appContext.Division on stl.DivisionId equals di.DivisionId into divi
                              from di in divi.DefaultIfEmpty()

                              join de in _appContext.Department on stl.DepartmentId equals de.DepartmentId into dep
                              from de in dep.DefaultIfEmpty()


                              join po in _appContext.PurchaseOrder on stl.PurchaseOrderId equals po.PurchaseOrderId


                              join ro in _appContext.RepairOrder on stl.RepairOrderId equals ro.RepairOrderId

                              join mana in _appContext.ManagementStructure on stl.ManagementStructureEntityId equals mana.ManagementStructureId

                              join ti in _appContext.TimeLife on stl.TimeLifeCyclesId equals ti.TimeLifeCyclesId into time
                              from ti in time.DefaultIfEmpty()

                              join man in _appContext.Manufacturer on stl.ManufacturerId equals man.ManufacturerId into manufa
                              from man in manufa.DefaultIfEmpty()

                                  //join sa in _appContext.StocklineAdjustment on stl.StockLineId equals sa.StockLineId into stla
                                  // from sa in stla.DefaultIfEmpty()






                              select new
                              {
                                  stl,
                                  stl.StockLineId,
                                  im,
                                  man,



                                  partNumber = stl.PartNumber,
                                  stockLineNumber = stl.StockLineNumber,
                                  stl.ControlNumber,
                                  stl.TagDate,
                                  location = l.Name,
                                  warehouse=w.Name,
                                  im.ExpirationDate,
                                  stl.SerialNumber,
                                  conditionId = co.ConditionId,
                                  stl.IdNumber,
                                  
                                  com.CompanyName,
                                  bu.BusinessUnitName,
                                  di.DivisionName,
                                  de.DepartmentName,
                                  partDescription = im.PartDescription,
                                 

                                  stl.ManagementStructureEntityId,
                                   
                                  stl.Quantity,
                                  condition = co.Description,
                                  shelfLife = im.IsShelfLifeAvailable,
                                  stl.ShelfLifeExpirationDate,
                                  stl.Shelf,
                                  stl.Bin,
                                  siteName=si.Name,
                                  shelfName = sh.Name,
                                  binName = bi.Name,
                                  siteId = stl.SiteId,
                                  stl.ShelfId,
                                  stl.BinId,
                                  warehouseId = stl.WarehouseId,
                                  locationId = stl.LocationId,
                                  Receiver = stl.ReceiverNumber,

                                  stl.ObtainFrom,
                                  stl.Owner,
                                  stl.TraceableTo,
                                  stl.Manufacturer,
                                  stl.ManufacturerLotNumber,
                                  stl.ManufacturingDate,
                                  stl.ManufacturingBatchNumber,
                                  stl.PartCertificationNumber,
                                  stl.CertifiedBy,
                                  stl.CertifiedDate,
                                  stl.TagType,
                                  stl.CertifiedDueDate,
                                  stl.CalibrationMemo,
                                  stl.OrderDate,
                                  po.PurchaseOrderNumber,
                                  stl.PurchaseOrderUnitCost,
                                 ro.RepairOrderNumber,
                                  stl.RepairOrderUnitCost,
                                  stl.InventoryUnitCost,

                                  stl.ReceivedDate,

                                  man.Name,



                                  stl.ReconciliationNumber,
                                  stl.UnitSalesPrice,
                                  stl.CoreUnitCost,

                                  stl.GLAccountId,
                                  stl.AssetId,

                                  stl.IsHazardousMaterial,
                                  stl.IsPMA,
                                  stl.IsDER,
                                  stl.OEM,
                                  stl.Memo,
                                  stl.ObtainFromType,
                                  stl.OwnerType,
                                  stl.TraceableToType,
                                  stl.ManufacturerId,

                                  
                                  stl.UnitCostAdjustmentReasonTypeId,
                                  stl.UnitSalePriceAdjustmentReasonTypeId,
                                  stl.TimeLifeCyclesId,

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
                                  mana.Code,
                                  co,
                                  w,
                                  l,
                                 com,
                                 bu,
                                 di,
                                  de,
                                  po,
                                  ro,
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

        public IEnumerable<object> GetAllCompanyData()
        {
            try
            {
                var result = (from ms in _appContext.ManagementStructure
                              join le in _appContext.LegalEntity on ms.LegalEntityId equals le.LegalEntityId
                              


                              select new
                              {
                                  CompanyName = le.Name,
                                  le.LegalEntityId

                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public IEnumerable<object> GetBinByShelfIdAdjustmentBeforeChange(long id)
        {
            try
            {
                var result = (from w in _appContext.Bin
                              where w.ShelfId == id
                              select new
                              {
                                   w.Name,
                                  w.BinId,
                                  w.ShelfId



                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }


        }

        public IEnumerable<object> GetAllLocationData(long id)
        {
            try
            {
                var result = (from l in _appContext.Location
                              join w in _appContext.Warehouse on l.WarehouseId equals w.WarehouseId

                              where w.WarehouseId == id
                              select new
                              {
                                  l,
                                  l.Name,
                                  l.LocationId,
                                  l.WarehouseId



                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }


        }

        public IEnumerable<object> GetAllShelfData(long id)
        {
            try
            {
                var result = (from sh in _appContext.Shelf
                              join l in _appContext.Location on sh.LocationId equals l.LocationId

                              where l.LocationId == id

                              select new
                              {
                                  l,
                                  sh,
                                  sh.Name,
                                  sh.ShelfId

                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public IEnumerable<object> GetAllBinData(long id)
        {
            try
            {
                var result = (from bi in _appContext.Bin
                              join sh in _appContext.Shelf on bi.ShelfId equals sh.ShelfId

                              where sh.ShelfId == id

                              select new
                              {
                                  bi,
                                  sh,
                                  bi.Name,
                                  bi.BinId

                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public IEnumerable<object> GetAllStockLineAdjustmentlistData(long id)
        {
            try
            {
                var result = (from sta in _appContext.StocklineAdjustment
                              where sta.StockLineId == id

                              select new
                              {
                                  sta.AdjustmentMemo,
                                  sta.ChangedFrom,
                                  sta.ChangedTo,
                                  sta.StocklineAdjustmentDataTypeId,
                                  sta.StocklineAdjustmentId,
                                  sta.StockLineId

                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public IEnumerable<object> GetAllStockLineIntegrationPortalData(long id)
        {
            try
            {
                var result = (from s in _appContext.StockLine
                              join ip in _appContext.StocklineIntegrationPortal on s.StockLineId equals ip.StocklineId
                              join i in _appContext.IntegrationPortal on ip.IntegrationPortalId equals i.IntegrationPortalId
                              where s.StockLineId == id

                              select new
                              {
                                  ip.StocklineId,
                                  ip.IsListed,
                                  ip.IntegrationPortalId,
                                  ip.StocklineIntegrationPortalId

                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                return null;
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



        public IEnumerable<object> stockLinePOUnitCostGet(long id)
        {
            try
            {
                var result = (from sta in _appContext.StocklineAdjustment
                              where sta.StockLineId == id

                              select new
                              {
                                  sta.AdjustmentMemo,
                                  sta.ChangedFrom,
                                  sta.ChangedTo,
                                  sta.StocklineAdjustmentDataTypeId,
                                  sta.StocklineAdjustmentId,
                                  sta.StockLineId

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





