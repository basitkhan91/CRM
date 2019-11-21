using DAL.Common;
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

                              join ig in _appContext.Itemgroup on im.ItemGroupId equals ig.ItemGroupId into itemgroup
                              from ig in itemgroup.DefaultIfEmpty()

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

                              join po in _appContext.PurchaseOrder on stl.PurchaseOrderId equals po.PurchaseOrderId into purchase
                              from po in purchase.DefaultIfEmpty()

                              join ro in _appContext.RepairOrder on stl.RepairOrderId equals ro.RepairOrderId into repair
                              from ro in repair.DefaultIfEmpty()

                              join mana in _appContext.ManagementStructure on stl.ManagementStructureEntityId equals mana.ManagementStructureId

                              join ti in _appContext.TimeLife on stl.TimeLifeCyclesId equals ti.TimeLifeCyclesId into time
                              from ti in time.DefaultIfEmpty()

                              join man in _appContext.Manufacturer on stl.ManufacturerId equals man.ManufacturerId into manufa
                              from man in manufa.DefaultIfEmpty()
                              
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
                                  glGLAccountId = stl.GLAccountId,
                                  location = l.Name,
                                  warehouse = w.Name,
                                  im.ExpirationDate,
                                  stl.SerialNumber,
                                  conditionId = co.ConditionId,
                                  itemGroup = ig.Description,
                                  stl.IdNumber,
                                  partDescription = im.PartDescription,
                                  stl.ManagementStructureEntityId,
                                  stl.Quantity,
                                  stl.QuantityOnOrder,
                                  stl.QuantityAvailable,
                                  stl.QuantityIssued,
                                  stl.QuantityOnHand,
                                  stl.QuantityTurnIn,
                                  stl.QuantityReserved,
                                  condition = co.Description,
                                  stl.ShelfLifeExpirationDate,
                                  siteName = si.Name,
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
                                  stl.IsPMA,
                                  stl.IsDER,
                                  stl.OEM,
                                  stl.Memo,
                                  stl.ObtainFromType,
                                  stl.OwnerType,
                                  stl.TraceableToType,
                                  stl.ManufacturerId,
                                  stl.ShelfLife,
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

                throw ex;
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
                throw ex;
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
                throw ex;
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
                throw ex;
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
                throw ex;
            }
        }

        public IEnumerable<object> getStocklineDataById(long id)
        {
            try
            {
                var result = (from st in _appContext.StockLine
                              where st.ItemMasterId == id

                              select new
                              {
                                  st.PurchaseOrderId,
                                  st.QuantityToReceive,


                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
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
                throw ex;
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
                throw ex;
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
                throw ex;
            }
        }

        public IEnumerable<StockLine> getStockLinesByIds(long[] ids) {
            var stockLines = (from st in _appContext.StockLine
                             where ids.Contains(st.StockLineId)
                             select st);
            return stockLines;
        }


        public void CreateStockLine(StockLine model)
        {
            try
            {
                _appContext.StockLine.Add(model);
                _appContext.SaveChanges();
                }
                 catch (Exception ex)
            {
                throw ex;
            }
            }

        public IEnumerable<StockLineReport> GenerateStockLineReoprt()
        {
            List<StockLineReport> stockLines = new List<StockLineReport>();
            StockLineReport stockLineReport;
            try
            {
                var list = (from stl in _appContext.StockLine
                            join im in _appContext.ItemMaster on stl.ItemMasterId equals im.ItemMasterId into stlim
                            from im in stlim.DefaultIfEmpty()
                            join cnd in _appContext.Condition on stl.ConditionId equals cnd.ConditionId into stlcnd
                            from cnd in stlcnd.DefaultIfEmpty()
                            join mnf in _appContext.Manufacturer on stl.ManufacturerId equals mnf.ManufacturerId into stlmnf
                            from mnf in stlmnf.DefaultIfEmpty()
                            join whs in _appContext.Warehouse on stl.WarehouseId equals whs.WarehouseId into stlwhs
                            from whs in stlwhs.DefaultIfEmpty()
                            join shf in _appContext.Shelf on stl.ShelfId equals shf.ShelfId into stlshf
                            from shf in stlshf.DefaultIfEmpty()
                            join bnd in _appContext.Bin on stl.BinId equals bnd.BinId into stlbnd
                            from bnd in stlbnd.DefaultIfEmpty()
                            join glc in _appContext.GLAccount on stl.GLAccountId equals glc.GLAccountId into stlglc
                            from glc in stlglc.DefaultIfEmpty()
                            join pox in _appContext.PurchaseOrder on stl.PurchaseOrderId equals pox.PurchaseOrderId into stlpox
                            from pox in stlpox.DefaultIfEmpty()
                            join rox in _appContext.RepairOrder on stl.RepairOrderId equals rox.RepairOrderId into stlrox
                            from rox in stlrox.DefaultIfEmpty()
                            join mpx in _appContext.MasterParts on im.MasterPartId equals mpx.MasterPartId into stlmpx
                            from mpx in stlmpx.DefaultIfEmpty()
                            select new
                            {
                                PartNumber=  mpx.PartNumber==null?"": mpx.PartNumber,
                                PartDescription = mpx.Description == null ? "" : mpx.Description,
                                SerialNumber = stl.SerialNumber == null ? "" : stl.SerialNumber,
                                StocklineNumber = stl.StockLineNumber == null ? "" : stl.StockLineNumber,
                                Condition = cnd.Description == null ? "" : cnd.Description,
                                VendorName = mnf.Name == null ? "" : mnf.Name,
                                VendorCode = mnf.ManufacturerId==null?0: mnf.ManufacturerId,
                                Quantity = stl.Quantity == null ? 0 : stl.Quantity,
                                QtyAdjusted = 0,
                                POUnitCost = stl.PurchaseOrderUnitCost == null ? 0 : stl.PurchaseOrderUnitCost,
                                UnitPrice = stl.UnitSalesPrice == null ? 0 : stl.UnitSalesPrice,
                                ExtendedPrice = 0,
                                WareHouse = whs.Name == null ? "" : whs.Name,
                                Shelf = shf.Name == null ? "" : shf.Name,
                                Bin = bnd.Name == null ? "" : bnd.Name,
                                AccountCode = glc.AccountCode == null ? "" : glc.AccountCode,
                                PurchaseOrderNumber = pox.PurchaseOrderNumber == null ? "" : pox.PurchaseOrderNumber,
                                RepairOrderNumber = rox.RepairOrderNumber == null ? "" : rox.RepairOrderNumber,
                                RepairOrderUnitCost = stl.RepairOrderUnitCost == null ? 0 : stl.RepairOrderUnitCost,
                                stl.ReceivedDate,
                                ReceiverNumber = stl.ReceiverNumber == null ? "" : stl.ReceiverNumber,
                                ReconciliationNumber = stl.ReconciliationNumber == null ? "" : stl.ReconciliationNumber
                            }).Distinct().ToList();

                if(list!=null && list.Count>0)
                {
                    foreach(var item in list)
                    {
                        stockLineReport = new StockLineReport();
                        stockLineReport.AccountCode = item.AccountCode;
                        stockLineReport.PartNumber = item.PartNumber;
                        stockLineReport.PartDescription = item.PartDescription;
                        stockLineReport.SerialNumber = item.SerialNumber;
                        stockLineReport.StocklineNumber = item.StocklineNumber;
                        stockLineReport.Condition = item.Condition;
                        stockLineReport.VendorName = item.VendorName;
                        stockLineReport.VendorCode = item.VendorCode;
                        stockLineReport.Quantity = item.Quantity;
                        stockLineReport.QtyAdjusted = item.QtyAdjusted;
                        stockLineReport.POUnitCost = item.POUnitCost;
                        stockLineReport.UnitPrice = item.UnitPrice;
                        stockLineReport.ExtendedPrice = item.ExtendedPrice;
                        stockLineReport.WareHouse = item.WareHouse;
                        stockLineReport.Shelf = item.Shelf;
                        stockLineReport.Bin = item.Bin;
                        stockLineReport.AccountCode = item.AccountCode;
                        stockLineReport.PurchaseOrderNumber = item.PurchaseOrderNumber;
                        stockLineReport.RepairOrderNumber = item.RepairOrderNumber;
                        stockLineReport.RepairOrderUnitCost = item.RepairOrderUnitCost;
                        stockLineReport.ReceivedDate = item.ReceivedDate;
                        stockLineReport.ReceiverNumber = item.ReceiverNumber;
                        stockLineReport.ReconciliationNumber = item.ReconciliationNumber;
                        stockLines.Add(stockLineReport);
                    }
                }

                return stockLines;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public IEnumerable<object> GetList(Filters<StockLineListFilters> stockLineFilters)
        {
            if (stockLineFilters.filters == null)
                stockLineFilters.filters = new StockLineListFilters();
            var pageNumber = stockLineFilters.first + 1;
            var take = stockLineFilters.rows;
            var skip = take * (pageNumber - 1);


            var totalRecords=(
                                            from stl in _appContext.StockLine
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
                                            join po in _appContext.PurchaseOrder on stl.PurchaseOrderId equals po.PurchaseOrderId
                                            join ro in _appContext.RepairOrder on stl.RepairOrderId equals ro.RepairOrderId
                                            join mana in _appContext.ManagementStructure on stl.ManagementStructureEntityId equals mana.ManagementStructureId
                                            join ti in _appContext.TimeLife on stl.TimeLifeCyclesId equals ti.TimeLifeCyclesId into time
                                            from ti in time.DefaultIfEmpty()
                                            join man in _appContext.Manufacturer on stl.ManufacturerId equals man.ManufacturerId into manufa
                                            from man in manufa.DefaultIfEmpty()
                                            select new
                                            {
                                                stl.StockLineId,
                                            }).Distinct().Count();

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
                          join po in _appContext.PurchaseOrder on stl.PurchaseOrderId equals po.PurchaseOrderId
                          join ro in _appContext.RepairOrder on stl.RepairOrderId equals ro.RepairOrderId
                          join mana in _appContext.ManagementStructure on stl.ManagementStructureEntityId equals mana.ManagementStructureId
                          join ti in _appContext.TimeLife on stl.TimeLifeCyclesId equals ti.TimeLifeCyclesId into time
                          from ti in time.DefaultIfEmpty()
                          join man in _appContext.Manufacturer on stl.ManufacturerId equals man.ManufacturerId into manufa
                          from man in manufa.DefaultIfEmpty()
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
                              warehouse = w.Name,
                              im.ExpirationDate,
                              stl.SerialNumber,
                              conditionId = co.ConditionId,
                              stl.IdNumber,
                              partDescription = im.PartDescription,
                              stl.ManagementStructureEntityId,
                              stl.Quantity,
                              stl.QuantityOnOrder,
                              stl.QuantityAvailable,
                              stl.QuantityIssued,
                              stl.QuantityOnHand,
                              stl.QuantityTurnIn,
                              stl.QuantityReserved,
                              condition = co.Description,
                              stl.ShelfLifeExpirationDate,
                              siteName = si.Name,
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
                              stl.IsPMA,
                              stl.IsDER,
                              stl.OEM,
                              stl.Memo,
                              stl.ObtainFromType,
                              stl.OwnerType,
                              stl.TraceableToType,
                              stl.ManufacturerId,
                              stl.ShelfLife,
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
                              po,
                              ro,
                              conditionType = co.Description,
                              im.ItemTypeId,
                          }).ToList();
            return result;
        }



        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}





