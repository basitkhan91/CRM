using DAL.Common;
using DAL.Models;
using DAL.Repositories.Interfaces;
using EntityFrameworkPaginate;
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
                var totalRecords = (from stl in _appContext.StockLine
                                    join im in _appContext.ItemMaster on stl.ItemMasterId equals im.ItemMasterId
                                    join co in _appContext.Condition on stl.ConditionId equals co.ConditionId
                                    select new
                                    {
                                        stl.StockLineNumber,
                                    }).Count();

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

                              join mana in _appContext.ManagementStructure on stl.ManagementStructureEntityId equals mana.ManagementStructureId into manage
                              from mana in manage.DefaultIfEmpty()

                              join managmentLegalEntity in _appContext.ManagementStructure on mana.ManagementStructureId equals managmentLegalEntity.ManagementStructureId into mainCompanyTree
                              from managmentLegalEntity in mainCompanyTree.DefaultIfEmpty()

                              join divmanagmentLegalEntity in _appContext.ManagementStructure on managmentLegalEntity.ParentId equals divmanagmentLegalEntity.ManagementStructureId into mainDivCompany
                              from divmanagmentLegalEntity in mainDivCompany.DefaultIfEmpty()

                              join biumanagmentLegalEntity in _appContext.ManagementStructure on divmanagmentLegalEntity.ParentId equals biumanagmentLegalEntity.ManagementStructureId into BIUDivCompany
                              from biumanagmentLegalEntity in BIUDivCompany.DefaultIfEmpty()

                              join compmanagmentLegalEntity in _appContext.ManagementStructure on biumanagmentLegalEntity.ParentId equals compmanagmentLegalEntity.ManagementStructureId into comivCompany
                              from compmanagmentLegalEntity in comivCompany.DefaultIfEmpty()

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
                                  glAccountName = im.GLAccount.AccountName,
                                  location = l.Name,
                                  warehouse = w.Name,
                                  im.ExpirationDate,
                                  stl.SerialNumber,
                                  conditionId = co.ConditionId,
                                  itemGroup = ig.Description,
                                  stl.IdNumber,
                                  partDescription = im.PartDescription,
                                  stl.ManagementStructureEntityId,
                                  stl.QuantityOnOrder,
                                  stl.QuantityAvailable,
                                  stl.QuantityIssued,
                                  stl.QuantityOnHand,
                                  stl.QuantityTurnIn,
                                  stl.QuantityReserved,
                                  stl.Accident,
                                  stl.AccidentReason,
                                  stl.Incident,
                                  stl.IncidentReason,
                                  stl.BlackListed,
                                  stl.BlackListedReason,
                                  stl.EngineSerialNumber,
                                  stl.AircraftTailNumber,
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
                                  managmentLegalEntity,
                                  divmanagmentLegalEntity,
                                  biumanagmentLegalEntity,
                                  compmanagmentLegalEntity,
                                  mana,
                                  totalRecords
                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IEnumerable<object> GetListGlobalFilter(string value, int pageNumber, int pageSize)
        {
            var pageNumbers = pageNumber + 1;
            var take = pageSize;
            var skip = take * (pageNumbers - 1);

            if (!string.IsNullOrEmpty(value))
            {
                var totalRecords = (from stl in _appContext.StockLine
                                    join im in _appContext.ItemMaster on stl.ItemMasterId equals im.ItemMasterId
                                    join co in _appContext.Condition on stl.ConditionId equals co.ConditionId
                                    join ig in _appContext.Itemgroup on im.ItemGroupId equals ig.ItemGroupId into itemgroup
                                    from ig in itemgroup.DefaultIfEmpty()
                                    where (stl.PartNumber.Contains(value)
                                    || im.PartDescription.Contains(value)
                                    || ig.Description.Contains(value)
                                    || stl.QuantityOnHand.ToString().Contains(value)
                                    || stl.QuantityAvailable.ToString().Contains(value)
                                     || stl.StockLineNumber.Contains(value)
                                     || stl.SerialNumber.Contains(value)
                                     || co.Description.Contains(value)
                                     || im.GLAccount.AccountName.Contains(value))
                                    select new
                                    {
                                        stl.StockLineNumber,
                                    }).Count();

                var data = (from stl in _appContext.StockLine

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

                            join mana in _appContext.ManagementStructure on stl.ManagementStructureEntityId equals mana.ManagementStructureId into manage
                            from mana in manage.DefaultIfEmpty()

                            join managmentLegalEntity in _appContext.ManagementStructure on mana.ManagementStructureId equals managmentLegalEntity.ManagementStructureId into mainCompanyTree
                            from managmentLegalEntity in mainCompanyTree.DefaultIfEmpty()

                            join divmanagmentLegalEntity in _appContext.ManagementStructure on managmentLegalEntity.ParentId equals divmanagmentLegalEntity.ManagementStructureId into mainDivCompany
                            from divmanagmentLegalEntity in mainDivCompany.DefaultIfEmpty()

                            join biumanagmentLegalEntity in _appContext.ManagementStructure on divmanagmentLegalEntity.ParentId equals biumanagmentLegalEntity.ManagementStructureId into BIUDivCompany
                            from biumanagmentLegalEntity in BIUDivCompany.DefaultIfEmpty()

                            join compmanagmentLegalEntity in _appContext.ManagementStructure on biumanagmentLegalEntity.ParentId equals compmanagmentLegalEntity.ManagementStructureId into comivCompany
                            from compmanagmentLegalEntity in comivCompany.DefaultIfEmpty()

                            join ti in _appContext.TimeLife on stl.TimeLifeCyclesId equals ti.TimeLifeCyclesId into time
                            from ti in time.DefaultIfEmpty()

                            join man in _appContext.Manufacturer on stl.ManufacturerId equals man.ManufacturerId into manufa
                            from man in manufa.DefaultIfEmpty()
                            where (stl.PartNumber.Contains(value)
                                   || im.PartDescription.Contains(value)
                                   || ig.Description.Contains(value)
                                   || stl.QuantityOnHand.ToString().Contains(value)
                                   || stl.QuantityAvailable.ToString().Contains(value)
                                    || stl.StockLineNumber.Contains(value)
                                    || stl.SerialNumber.Contains(value)
                                    || co.Description.Contains(value)
                                    || im.GLAccount.AccountName.Contains(value))
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
                                glAccountName = im.GLAccount.AccountName,
                                location = l.Name,
                                warehouse = w.Name,
                                im.ExpirationDate,
                                stl.SerialNumber,
                                conditionId = co.ConditionId,
                                itemGroup = ig.Description,
                                stl.IdNumber,
                                partDescription = im.PartDescription,
                                stl.ManagementStructureEntityId,
                                stl.QuantityOnOrder,
                                stl.QuantityAvailable,
                                stl.QuantityIssued,
                                stl.QuantityOnHand,
                                stl.QuantityTurnIn,
                                stl.QuantityReserved,
                                stl.Accident,
                                stl.AccidentReason,
                                stl.Incident,
                                stl.IncidentReason,
                                stl.BlackListed,
                                stl.BlackListedReason,
                                stl.EngineSerialNumber,
                                stl.AircraftTailNumber,
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
                                stl.isActive,
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
                                managmentLegalEntity,
                                divmanagmentLegalEntity,
                                biumanagmentLegalEntity,
                                compmanagmentLegalEntity,
                                mana,
                                stl.CreatedDate,
                                totalRecords
                            }).OrderByDescending(p => p.CreatedDate).Skip(skip)
                                                     .Take(take)
                                                     .ToList();



                return (data);
            }
            else
            {
                var totalRecords = (from stl in _appContext.StockLine
                                    join im in _appContext.ItemMaster on stl.ItemMasterId equals im.ItemMasterId
                                    join co in _appContext.Condition on stl.ConditionId equals co.ConditionId
                                    select new
                                    {
                                        stl.StockLineNumber,
                                    }).Count();

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

                              join mana in _appContext.ManagementStructure on stl.ManagementStructureEntityId equals mana.ManagementStructureId into manage
                              from mana in manage.DefaultIfEmpty()

                              join managmentLegalEntity in _appContext.ManagementStructure on mana.ManagementStructureId equals managmentLegalEntity.ManagementStructureId into mainCompanyTree
                              from managmentLegalEntity in mainCompanyTree.DefaultIfEmpty()

                              join divmanagmentLegalEntity in _appContext.ManagementStructure on managmentLegalEntity.ParentId equals divmanagmentLegalEntity.ManagementStructureId into mainDivCompany
                              from divmanagmentLegalEntity in mainDivCompany.DefaultIfEmpty()

                              join biumanagmentLegalEntity in _appContext.ManagementStructure on divmanagmentLegalEntity.ParentId equals biumanagmentLegalEntity.ManagementStructureId into BIUDivCompany
                              from biumanagmentLegalEntity in BIUDivCompany.DefaultIfEmpty()

                              join compmanagmentLegalEntity in _appContext.ManagementStructure on biumanagmentLegalEntity.ParentId equals compmanagmentLegalEntity.ManagementStructureId into comivCompany
                              from compmanagmentLegalEntity in comivCompany.DefaultIfEmpty()

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
                                  glAccountName = im.GLAccount.AccountName,
                                  location = l.Name,
                                  warehouse = w.Name,
                                  im.ExpirationDate,
                                  stl.SerialNumber,
                                  conditionId = co.ConditionId,
                                  itemGroup = ig.Description,
                                  stl.IdNumber,
                                  partDescription = im.PartDescription,
                                  stl.ManagementStructureEntityId,
                                  stl.QuantityOnOrder,
                                  stl.QuantityAvailable,
                                  stl.QuantityIssued,
                                  stl.QuantityOnHand,
                                  stl.QuantityTurnIn,
                                  stl.QuantityReserved,
                                  stl.Accident,
                                  stl.AccidentReason,
                                  stl.Incident,
                                  stl.IncidentReason,
                                  stl.BlackListed,
                                  stl.BlackListedReason,
                                  stl.EngineSerialNumber,
                                  stl.AircraftTailNumber,
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
                                  stl.isActive,
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
                                  managmentLegalEntity,
                                  divmanagmentLegalEntity,
                                  biumanagmentLegalEntity,
                                  compmanagmentLegalEntity,
                                  mana,
                                  stl.CreatedDate,
                                  totalRecords
                              }).OrderByDescending(p => p.CreatedDate).Skip(skip)
                                                     .Take(take)
                                                     .ToList();

                return result;
            }
        }

        public void StocklineStatus(long StocklineId, bool status, string updatedBy)
        {
            StockLine stockLine = new StockLine();
            try
            {
                stockLine.StockLineId = StocklineId;
                stockLine.UpdatedDate = DateTime.Now;
                stockLine.UpdatedBy = updatedBy;
                stockLine.isActive = status;
                _appContext.StockLine.Attach(stockLine);
                _appContext.Entry(stockLine).Property(x => x.isActive).IsModified = true;
                _appContext.Entry(stockLine).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(stockLine).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetAllStockLinelistData(Common.Filters<StockListFilters> stockListFilters)
        {
            try
            {
                if (stockListFilters.filters == null)
                    stockListFilters.filters = new StockListFilters();
                var pageNumber = stockListFilters.first + 1;
                var take = stockListFilters.rows;
                var skip = take * (pageNumber - 1);

                var totalRecords = (from stl in _appContext.StockLine
                                    join im in _appContext.ItemMaster on stl.ItemMasterId equals im.ItemMasterId
                                    join co in _appContext.Condition on stl.ConditionId equals co.ConditionId into cog
                                    from co in cog.DefaultIfEmpty()
                                    join ig in _appContext.Itemgroup on im.ItemGroupId equals ig.ItemGroupId into itemgroup
                                    from ig in itemgroup.DefaultIfEmpty()
                                    where (stl.IsDeleted == false)
                                    && stl.PartNumber.Contains(!string.IsNullOrEmpty(stockListFilters.filters.PartNumber) ? stockListFilters.filters.PartNumber : stl.PartNumber)
                                    && im.PartDescription.Contains(!string.IsNullOrEmpty(stockListFilters.filters.PartDescription) ? stockListFilters.filters.PartDescription : im.PartDescription)
                                    && ig.Description.Contains(!string.IsNullOrEmpty(stockListFilters.filters.ItemGroup) ? stockListFilters.filters.ItemGroup : ig.Description)
                                    && stl.StockLineNumber.Contains(!string.IsNullOrEmpty(stockListFilters.filters.StocklineNumber) ? stockListFilters.filters.StocklineNumber : stl.StockLineNumber)
                                    //&& stl.SerialNumber.Contains(!string.IsNullOrEmpty(stockListFilters.filters.SerialNumber) ? stockListFilters.filters.SerialNumber : stl.SerialNumber)
                                     && (stl.SerialNumber == null || stl.SerialNumber.Contains(!string.IsNullOrEmpty(stockListFilters.filters.SerialNumber) ? stockListFilters.filters.SerialNumber : stl.SerialNumber))
                                    && co.Description.Contains(!string.IsNullOrEmpty(stockListFilters.filters.Condition) ? stockListFilters.filters.Condition : co.Description)
                                    && im.GLAccount.AccountName.Contains(!string.IsNullOrEmpty(stockListFilters.filters.GlAccountName) ? stockListFilters.filters.GlAccountName : im.GLAccount.AccountName)
                                    && stl.QuantityAvailable.ToString().Contains(!string.IsNullOrEmpty(stockListFilters.filters.QuantityAvailable) ? stockListFilters.filters.QuantityAvailable : stl.QuantityAvailable.ToString())
                                    && stl.QuantityOnHand.ToString().Contains(!string.IsNullOrEmpty(stockListFilters.filters.QuantityOnHand) ? stockListFilters.filters.QuantityOnHand : stl.QuantityOnHand.ToString())
                                    select new
                                    {
                                        stl.StockLineNumber,
                                    }).Count();

                var data = (from stl in _appContext.StockLine
                            join im in _appContext.ItemMaster on stl.ItemMasterId equals im.ItemMasterId
                            join co in _appContext.Condition on stl.ConditionId equals co.ConditionId into cog
                            from co in cog.DefaultIfEmpty()
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
                            join mana in _appContext.ManagementStructure on stl.ManagementStructureEntityId equals mana.ManagementStructureId into manage
                            from mana in manage.DefaultIfEmpty()
                            join managmentLegalEntity in _appContext.ManagementStructure on mana.ManagementStructureId equals managmentLegalEntity.ManagementStructureId into mainCompanyTree
                            from managmentLegalEntity in mainCompanyTree.DefaultIfEmpty()
                            join divmanagmentLegalEntity in _appContext.ManagementStructure on managmentLegalEntity.ParentId equals divmanagmentLegalEntity.ManagementStructureId into mainDivCompany
                            from divmanagmentLegalEntity in mainDivCompany.DefaultIfEmpty()
                            join biumanagmentLegalEntity in _appContext.ManagementStructure on divmanagmentLegalEntity.ParentId equals biumanagmentLegalEntity.ManagementStructureId into BIUDivCompany
                            from biumanagmentLegalEntity in BIUDivCompany.DefaultIfEmpty()
                            join compmanagmentLegalEntity in _appContext.ManagementStructure on biumanagmentLegalEntity.ParentId equals compmanagmentLegalEntity.ManagementStructureId into comivCompany
                            from compmanagmentLegalEntity in comivCompany.DefaultIfEmpty()
                            join ti in _appContext.TimeLife on stl.TimeLifeCyclesId equals ti.TimeLifeCyclesId into time
                            from ti in time.DefaultIfEmpty()
                            join man in _appContext.Manufacturer on stl.ManufacturerId equals man.ManufacturerId into manufa
                            from man in manufa.DefaultIfEmpty()
                            where (stl.IsDeleted == false)
                            && stl.PartNumber.Contains(!string.IsNullOrEmpty(stockListFilters.filters.PartNumber) ? stockListFilters.filters.PartNumber : stl.PartNumber)
                            && im.PartDescription.Contains(!string.IsNullOrEmpty(stockListFilters.filters.PartDescription) ? stockListFilters.filters.PartDescription : im.PartDescription)
                            && ig.Description.Contains(!string.IsNullOrEmpty(stockListFilters.filters.ItemGroup) ? stockListFilters.filters.ItemGroup : ig.Description)
                            && stl.StockLineNumber.Contains(!string.IsNullOrEmpty(stockListFilters.filters.StocklineNumber) ? stockListFilters.filters.StocklineNumber : stl.StockLineNumber)
                            //&& stl.SerialNumber.Contains(!string.IsNullOrEmpty(stockListFilters.filters.SerialNumber) ? stockListFilters.filters.SerialNumber : stl.SerialNumber)
                            && (stl.SerialNumber == null || stl.SerialNumber.Contains(!string.IsNullOrEmpty(stockListFilters.filters.SerialNumber) ? stockListFilters.filters.SerialNumber : stl.SerialNumber))
                            && co.Description.Contains(!string.IsNullOrEmpty(stockListFilters.filters.Condition) ? stockListFilters.filters.Condition : co.Description)
                            && im.GLAccount.AccountName.Contains(!string.IsNullOrEmpty(stockListFilters.filters.GlAccountName) ? stockListFilters.filters.GlAccountName : im.GLAccount.AccountName)
                            && stl.QuantityAvailable.ToString().Contains(!string.IsNullOrEmpty(stockListFilters.filters.QuantityAvailable) ? stockListFilters.filters.QuantityAvailable : stl.QuantityAvailable.ToString())
                            && stl.QuantityOnHand.ToString().Contains(!string.IsNullOrEmpty(stockListFilters.filters.QuantityOnHand) ? stockListFilters.filters.QuantityOnHand : stl.QuantityOnHand.ToString())
                            select new
                            {
                                stl,
                                stl.StockLineId,
                                ItemTypeId = im== null ?0: im.ItemTypeId,
                                ExpirationDate = im == null ? null : im.ExpirationDate,
                                glAccountName = im == null ?"": im.GLAccount.AccountName,
                                partDescription = im == null ?"": im.PartDescription,
                                partNumber = stl.PartNumber,
                                stockLineNumber = stl.StockLineNumber,
                                stl.ControlNumber,
                                stl.TagDate,
                                glGLAccountId = stl.GLAccountId,                                
                                location = l==null?"": l.Name,
                                warehouse = w== null ?"": w.Name,                               
                                stl.SerialNumber,
                                conditionId = co== null ?0: co.ConditionId,
                                condition = co == null ? "" : co.Description,
                                itemGroup = ig== null?"": ig.Description,
                                conditionType = co == null ? "" : co.Description,
                                stl.IdNumber,                               
                                stl.ManagementStructureEntityId,
                                stl.QuantityOnOrder,
                                stl.QuantityAvailable,
                                stl.QuantityIssued,
                                stl.QuantityOnHand,
                                stl.QuantityTurnIn,
                                stl.QuantityReserved,
                                stl.Accident,
                                stl.AccidentReason,
                                stl.Incident,
                                stl.IncidentReason,
                                stl.BlackListed,
                                stl.BlackListedReason,
                                stl.EngineSerialNumber,
                                stl.AircraftTailNumber,                              
                                stl.ShelfLifeExpirationDate,
                                siteName = si== null?"": si.Name,
                                shelfName = sh == null ? "" : sh.Name,
                                binName = bi == null ? "" : bi.Name,
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
                                stl.PurchaseOrderUnitCost,
                                PurchaseOrderNumber= po==null?"": po.PurchaseOrderNumber,                               
                                RepairOrderNumber = ro == null ? "" : ro.RepairOrderNumber,
                                stl.RepairOrderUnitCost,
                                stl.InventoryUnitCost,
                                stl.ReceivedDate,                               
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
                                stl.isActive,
                                CyclesRemaining= ti == null ? 0:ti.CyclesRemaining,
                                CyclesSinceNew = ti == null ? 0 : ti.CyclesSinceNew,
                                CyclesSinceOVH = ti == null ? 0 : ti.CyclesSinceOVH,
                                CyclesSinceRepair = ti == null ? 0 : ti.CyclesSinceRepair,
                                CyclesSinceInspection = ti == null ? 0 : ti.CyclesSinceInspection,
                                TimeRemaining = ti == null ? 0 : ti.TimeRemaining,
                                TimeSinceInspection = ti == null ? 0 : ti.TimeSinceInspection,
                                TimeSinceNew = ti == null ? 0 : ti.TimeSinceNew,
                                TimeSinceOVH = ti == null ? 0 : ti.TimeSinceOVH,
                                TimeSinceRepair = ti == null ? 0 : ti.TimeSinceRepair,
                                LastSinceInspection = ti == null ? 0 : ti.LastSinceInspection,
                                LastSinceNew = ti == null ? 0 : ti.LastSinceNew,
                                LastSinceOVH = ti == null ? 0 : ti.LastSinceOVH,
                                Name = man== null?"": man.Name,
                                Code= mana == null ? "" : mana.Code,
                                im,
                                man,
                                co,
                                w,
                                l,
                                po,
                                ro, 
                                managmentLegalEntity,
                                divmanagmentLegalEntity,
                                biumanagmentLegalEntity,
                                compmanagmentLegalEntity,
                                mana,
                                stl.CreatedDate,
                                totalRecords
                            }).OrderByDescending(p => p.CreatedDate)
                                 .Skip(skip)
                                 .Take(take)
                                 .ToList();

                if (!string.IsNullOrEmpty(stockListFilters.SortField) && !string.IsNullOrEmpty(stockListFilters.SortField))
                {
                    if (stockListFilters.SortOrder == -1)
                    {
                        switch (stockListFilters.SortField)
                        {
                            case "partNumber":
                                return data.OrderByDescending(p => p.partNumber).ToList();
                            case "partDescription":
                                return data.OrderByDescending(p => p.partDescription).ToList();
                            case "itemGroup":
                                return data.OrderByDescending(p => p.itemGroup).ToList();
                            case "stockLineNumber":
                                return data.OrderByDescending(p => p.stockLineNumber).ToList();
                            case "SerialNumber":
                                return data.OrderByDescending(p => p.SerialNumber).ToList();
                            case "condition":
                                return data.OrderByDescending(p => p.condition).ToList();
                            case "QuantityOnHand":
                                return data.OrderByDescending(p => p.QuantityOnHand).ToList();
                            case "QuantityAvailable":
                                return data.OrderByDescending(p => p.QuantityAvailable).ToList();
                            case "glAccountName":
                                return data.OrderByDescending(p => p.glAccountName).ToList();
                        }
                    }
                    else
                    {
                        switch (stockListFilters.SortField)
                        {
                            case "partNumber":
                                return data.OrderBy(p => p.partNumber).ToList();
                            case "partDescription":
                                return data.OrderBy(p => p.partDescription).ToList();
                            case "itemGroup":
                                return data.OrderBy(p => p.itemGroup).ToList();
                            case "stockLineNumber":
                                return data.OrderBy(p => p.stockLineNumber).ToList();
                            case "SerialNumber":
                                return data.OrderBy(p => p.SerialNumber).ToList();
                            case "condition":
                                return data.OrderBy(p => p.condition).ToList();
                            case "QuantityOnHand":
                                return data.OrderBy(p => p.QuantityOnHand).ToList();
                            case "QuantityAvailable":
                                return data.OrderBy(p => p.QuantityAvailable).ToList();
                            case "glAccountName":
                                return data.OrderBy(p => p.glAccountName).ToList();
                        }
                    }
                }
                return (data);
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

        public IEnumerable<object> GetAllWarehouseData(long siteId)
        {
            try
            {
                var result = (from w in _appContext.Warehouse
                              join s in _appContext.Site on w.SiteId equals s.SiteId
                              where (w.IsDelete == false || w.IsDelete == null) && w.IsActive == true && w.SiteId == siteId
                              select new
                              {
                                  Warehouse = w.Name,
                                  w.WarehouseId,
                              }).Distinct().ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public IEnumerable<object> GetAllLocationData(long warehouseId)
        {
            try
            {
                var result = (from l in _appContext.Location
                              join w in _appContext.Warehouse on l.WarehouseId equals w.WarehouseId
                              where (l.IsDelete == false || l.IsDelete == null) && l.IsActive == true && w.WarehouseId == warehouseId
                              select new
                              {
                                  Location = l.Name,
                                  l.LocationId,
                              }).Distinct().ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetAllShelfData(long locationId)
        {
            try
            {
                var result = (from sh in _appContext.Shelf
                              join l in _appContext.Location on sh.LocationId equals l.LocationId
                              where (sh.IsDelete == false || sh.IsDelete == null) && sh.IsActive == true && l.LocationId == locationId
                              select new
                              {
                                  Shelf = sh.Name,
                                  sh.ShelfId
                              }).Distinct().ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetAllBinData(long shelfId)
        {
            try
            {
                var result = (from bi in _appContext.Bin
                              join sh in _appContext.Shelf on bi.ShelfId equals sh.ShelfId

                              where (bi.IsDelete == false || bi.IsDelete == null) && bi.IsActive == true && sh.ShelfId == shelfId
                              select new
                              {
                                  Bin = bi.Name,
                                  bi.BinId
                              }).Distinct().ToList();
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

        public IEnumerable<object> getStocklineDetailsById(long id)
        {
            try
            {
                var data = (from stl in _appContext.StockLine
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
                            join mana in _appContext.ManagementStructure on stl.ManagementStructureEntityId equals mana.ManagementStructureId into manage
                            from mana in manage.DefaultIfEmpty()
                            join managmentLegalEntity in _appContext.ManagementStructure on mana.ManagementStructureId equals managmentLegalEntity.ManagementStructureId into mainCompanyTree
                            from managmentLegalEntity in mainCompanyTree.DefaultIfEmpty()
                            join divmanagmentLegalEntity in _appContext.ManagementStructure on managmentLegalEntity.ParentId equals divmanagmentLegalEntity.ManagementStructureId into mainDivCompany
                            from divmanagmentLegalEntity in mainDivCompany.DefaultIfEmpty()
                            join biumanagmentLegalEntity in _appContext.ManagementStructure on divmanagmentLegalEntity.ParentId equals biumanagmentLegalEntity.ManagementStructureId into BIUDivCompany
                            from biumanagmentLegalEntity in BIUDivCompany.DefaultIfEmpty()
                            join compmanagmentLegalEntity in _appContext.ManagementStructure on biumanagmentLegalEntity.ParentId equals compmanagmentLegalEntity.ManagementStructureId into comivCompany
                            from compmanagmentLegalEntity in comivCompany.DefaultIfEmpty()
                            join ti in _appContext.TimeLife on stl.TimeLifeCyclesId equals ti.TimeLifeCyclesId into time
                            from ti in time.DefaultIfEmpty()
                            join man in _appContext.Manufacturer on stl.ManufacturerId equals man.ManufacturerId into manufa
                            from man in manufa.DefaultIfEmpty()
                            where (stl.IsDeleted == false
                            && stl.StockLineId == id)
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
                                glAccountName = im.GLAccount.AccountName,
                                location = l.Name,
                                warehouse = w.Name,
                                im.ExpirationDate,
                                stl.SerialNumber,
                                conditionId = co.ConditionId,
                                itemGroup = ig.Description,
                                stl.IdNumber,
                                partDescription = im.PartDescription,
                                stl.ManagementStructureEntityId,
                                stl.QuantityOnOrder,
                                stl.QuantityAvailable,
                                stl.QuantityIssued,
                                stl.QuantityOnHand,
                                stl.QuantityTurnIn,
                                stl.QuantityReserved,
                                stl.Accident,
                                stl.AccidentReason,
                                stl.Incident,
                                stl.IncidentReason,
                                stl.BlackListed,
                                stl.BlackListedReason,
                                stl.EngineSerialNumber,
                                stl.AircraftTailNumber,
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
                                stl.isActive,
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
                                managmentLegalEntity,
                                divmanagmentLegalEntity,
                                biumanagmentLegalEntity,
                                compmanagmentLegalEntity,
                                mana,
                                stl.CreatedDate
                            }).OrderByDescending(p => p.CreatedDate)
                                 .ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public object GetStocklineDataByStockLineId(long id)
        {
            try
            {
                var data = (from stl in _appContext.StockLine
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
                            join mana in _appContext.ManagementStructure on stl.ManagementStructureEntityId equals mana.ManagementStructureId into manage
                            from mana in manage.DefaultIfEmpty()
                            join ti in _appContext.TimeLife on stl.TimeLifeCyclesId equals ti.TimeLifeCyclesId into time
                            from ti in time.DefaultIfEmpty()
                            join man in _appContext.Manufacturer on stl.ManufacturerId equals man.ManufacturerId into manufa
                            from man in manufa.DefaultIfEmpty()
                            where (stl.IsDeleted == false
                            && stl.StockLineId == id)
                            select new
                            {
                                stl.StockLineId,
                                partNumber = stl.PartNumber,
                                stockLineNumber = stl.StockLineNumber,
                                stl.ControlNumber,
                                stl.TagDate,
                                glGLAccountId = stl.GLAccountId,
                                glAccountName = im.GLAccount.AccountName,
                                location = l.Name,
                                warehouse = w.Name,
                                im.ExpirationDate,
                                stl.SerialNumber,
                                conditionId = co.ConditionId,
                                itemGroup = ig.Description,
                                stl.IdNumber,
                                stl.ItemMasterId,
                                partDescription = im.PartDescription,
                                ManagementStructureId = stl.ManagementStructureEntityId,
                                stl.Quantity,
                                stl.QuantityOnOrder,
                                stl.QuantityAvailable,
                                stl.QuantityIssued,
                                stl.QuantityOnHand,
                                stl.QuantityTurnIn,
                                stl.QuantityReserved,
                                stl.Accident,
                                stl.AccidentReason,
                                stl.Incident,
                                stl.IncidentReason,
                                stl.BlackListed,
                                stl.BlackListedReason,
                                stl.EngineSerialNumber,
                                stl.AircraftTailNumber,
                                condition = co.Description,
                                stl.ShelfLife,
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
                                stl.UnitCostAdjustmentReasonTypeId,
                                stl.UnitSalePriceAdjustmentReasonTypeId,
                                stl.TimeLifeCyclesId,
                                stl.isActive,
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
                                conditionType = co.Description,
                                im.ItemTypeId,
                                man.Name,
                                mana.Code,
                                stl.CreatedBy,
                                stl.CreatedDate,
                                stl.UpdatedBy,
                                stl.UpdatedDate,
                                stl.TimeLifeDetailsNotProvided,
                                stl.PurchaseOrderId,
                                stl.RepairOrderId,
                                stl.IsCustomerStock,
                                stl.QuantityRejected,
                                stl.IsDeleted,
                                stl.LegalEntityId,
                                stl.MasterCompanyId,
                                stl.IsSerialized,
                                stl.WorkOrderId,
                                stl.PurchaseOrderPartRecordId,
                                stl.PurchaseOrderExtendedCost,
                                stl.ShippingViaId,
                                stl.RepairOrderPartRecordId,
                                stl.WorkOrderExtendedCost,
                                stl.PurchaseOrderPartRecord,
                                stl.RepairOrderExtendedCost,
                                stl.IsHazardousMaterial,
                                stl.QuantityToReceive,
                                stl.ManufacturingTrace,
                                stl.WorkOrderMaterialsId,
                                stl.ShippingAccount,
                                stl.ShippingReference,
                                im.ITARNumber,
                                im.NationalStockNumber,
                            }).FirstOrDefault();
                return data;
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
                              where ip.StocklineId == id

                              select new
                              {
                                  ip.StocklineId,
                                  ip.IsListed,
                                  ip.IntegrationPortalId,
                                  ip.StocklineIntegrationPortalId,
                                  ip.IsActive,
                                  i.CreatedBy,
                                  i.CreatedDate,
                                  i.Description,                                                           
                                  i.MasterCompanyId,
                                  i.Memo,
                                  i.PortalUrl,
                                  i.UpdatedBy,
                                  i.UpdatedDate,                                                                   

                              }).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetAllIntegrationPortalData()
        {
            try
            {
                var result = (from integrate in _appContext.IntegrationPortal 
                              where integrate.IsActive == true && (integrate.IsDeleted==false || integrate.IsDeleted == null)
                              select new
                              {
                                  integrate,
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

        public IEnumerable<StockLineDraft> getStockLinesByIds(long[] ids)
        {
            var stockLines = (from st in _appContext.StockLineDraft
                              where ids.Contains(st.StockLineDraftId)
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
                            //join mnf in _appContext.Manufacturer on stl.ManufacturerId equals mnf.ManufacturerId into stlmnf
                           // from mnf in stlmnf.DefaultIfEmpty()
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
                            join v in _appContext.Vendor on pox.VendorId equals v.VendorId into poxv
                            from v in poxv.DefaultIfEmpty()
                            join rox in _appContext.RepairOrder on stl.RepairOrderId equals rox.RepairOrderId into stlrox
                            from rox in stlrox.DefaultIfEmpty()
                            join mpx in _appContext.MasterParts on im.MasterPartId equals mpx.MasterPartId into stlmpx
                            from mpx in stlmpx.DefaultIfEmpty()
                            select new
                            {
                                PartNumber = mpx.PartNumber == null ? "" : mpx.PartNumber,
                                PartDescription = mpx.Description == null ? "" : mpx.Description,
                                SerialNumber = stl.SerialNumber == null ? "" : stl.SerialNumber,
                                StocklineNumber = stl.StockLineNumber == null ? "" : stl.StockLineNumber,
                                Condition = cnd.Description == null ? "" : cnd.Description,
                                VendorName = v.VendorName == null ? "" : v.VendorName,
                                VendorCode = v.VendorCode == null ? "" : v.VendorCode,
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

                if (list != null && list.Count > 0)
                {
                    foreach (var item in list)
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

        public IEnumerable<object> StockLineReoprtView(Common.Filters<StockLineReportFilter> slReportFilter)
        {
            if (slReportFilter.filters == null)
                slReportFilter.filters = new StockLineReportFilter();
            var pageNumber = slReportFilter.first + 1;
            var pageSize = slReportFilter.rows;

            string sortColumn = string.Empty;

            var sorts = new Sorts<StockLineReportFilter>();
            var filters = new EntityFrameworkPaginate.Filters<StockLineReportFilter>();

            if (string.IsNullOrEmpty(slReportFilter.SortField))
            {
                sortColumn = "createdDate";
                slReportFilter.SortOrder = -1;
                sorts.Add(sortColumn == "createdDate", x => x.createdDate, true);
            }
            else
            {
                sortColumn = slReportFilter.SortField;
            }

            var propertyInfo = typeof(StockLineReportFilter).GetProperty(sortColumn);

            if (slReportFilter.SortOrder == -1)
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null), true);
            }
            else
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null));
            }

            filters.Add(!string.IsNullOrEmpty(slReportFilter.filters.partNumber), x => x.partNumber.ToLower().Contains(slReportFilter.filters.partNumber.ToLower()));
            filters.Add(!string.IsNullOrEmpty(slReportFilter.filters.partDescription), x => x.partDescription.ToLower().Contains(slReportFilter.filters.partDescription.ToLower()));
            filters.Add(!string.IsNullOrEmpty(slReportFilter.filters.serialNumber), x => x.serialNumber.ToLower().Contains(slReportFilter.filters.serialNumber.ToLower()));
            filters.Add(!string.IsNullOrEmpty(slReportFilter.filters.stocklineNumber), x => x.stocklineNumber.ToLower().Contains(slReportFilter.filters.stocklineNumber.ToLower()));
            filters.Add(!string.IsNullOrEmpty(slReportFilter.filters.condition), x => x.condition.ToLower().Contains(slReportFilter.filters.condition.ToLower()));
            filters.Add(!string.IsNullOrEmpty(slReportFilter.filters.vendorName), x => x.vendorName.ToLower().Contains(slReportFilter.filters.vendorName.ToLower()));
            filters.Add(!string.IsNullOrEmpty(slReportFilter.filters.vendorCode), x => x.vendorCode.ToLower().Contains(slReportFilter.filters.vendorCode.ToLower()));
            filters.Add(slReportFilter.filters.quantity != null && slReportFilter.filters.quantity > 0, x => x.quantity == slReportFilter.filters.quantity);
            filters.Add(slReportFilter.filters.qtyAdjusted != null && slReportFilter.filters.qtyAdjusted > 0, x => x.qtyAdjusted == slReportFilter.filters.qtyAdjusted);
            filters.Add(slReportFilter.filters.poUnitCost != null && slReportFilter.filters.poUnitCost > 0, x => x.poUnitCost == slReportFilter.filters.poUnitCost);
            filters.Add(slReportFilter.filters.unitPrice != null && slReportFilter.filters.unitPrice > 0, x => x.unitPrice == slReportFilter.filters.unitPrice);
            filters.Add(slReportFilter.filters.extendedPrice != null && slReportFilter.filters.extendedPrice > 0, x => x.extendedPrice == slReportFilter.filters.extendedPrice);
            filters.Add(!string.IsNullOrEmpty(slReportFilter.filters.wareHouse), x => x.wareHouse.ToLower().Contains(slReportFilter.filters.wareHouse.ToLower()));
            filters.Add(!string.IsNullOrEmpty(slReportFilter.filters.shelf), x => x.shelf.ToLower().Contains(slReportFilter.filters.shelf.ToLower()));
            filters.Add(!string.IsNullOrEmpty(slReportFilter.filters.bin), x => x.bin.ToLower().Contains(slReportFilter.filters.bin.ToLower()));
            filters.Add(!string.IsNullOrEmpty(slReportFilter.filters.accountCode), x => x.accountCode.ToLower().Contains(slReportFilter.filters.accountCode.ToLower()));
            filters.Add(!string.IsNullOrEmpty(slReportFilter.filters.purchaseOrderNumber), x => x.purchaseOrderNumber.ToLower().Contains(slReportFilter.filters.purchaseOrderNumber.ToLower()));
            filters.Add(!string.IsNullOrEmpty(slReportFilter.filters.repairOrderNumber), x => x.repairOrderNumber.ToLower().Contains(slReportFilter.filters.repairOrderNumber.ToLower()));
            filters.Add(slReportFilter.filters.repairOrderUnitCost != null && slReportFilter.filters.repairOrderUnitCost > 0, x => x.repairOrderUnitCost == slReportFilter.filters.repairOrderUnitCost);
            filters.Add(slReportFilter.filters.receivedDate != null, x => x.receivedDate == slReportFilter.filters.receivedDate);
            filters.Add(!string.IsNullOrEmpty(slReportFilter.filters.receiverNumber), x => x.receiverNumber.ToLower().Contains(slReportFilter.filters.receiverNumber.ToLower()));
            filters.Add(!string.IsNullOrEmpty(slReportFilter.filters.reconciliationNumber), x => x.reconciliationNumber.ToLower().Contains(slReportFilter.filters.reconciliationNumber.ToLower()));

            try
            {

                var totalRecords = (from stl in _appContext.StockLine
                                    join im in _appContext.ItemMaster on stl.ItemMasterId equals im.ItemMasterId into stlim
                                    from im in stlim.DefaultIfEmpty()
                                    join cnd in _appContext.Condition on stl.ConditionId equals cnd.ConditionId into stlcnd
                                    from cnd in stlcnd.DefaultIfEmpty()
                                    //join mnf in _appContext.Manufacturer on stl.ManufacturerId equals mnf.ManufacturerId into stlmnf
                                    //from mnf in stlmnf.DefaultIfEmpty()
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
                                    join v in _appContext.Vendor on pox.VendorId equals v.VendorId  into poxv
                                    from v in poxv.DefaultIfEmpty()
                                    join rox in _appContext.RepairOrder on stl.RepairOrderId equals rox.RepairOrderId into stlrox
                                    from rox in stlrox.DefaultIfEmpty()
                                    join mpx in _appContext.MasterParts on im.MasterPartId equals mpx.MasterPartId into stlmpx
                                    from mpx in stlmpx.DefaultIfEmpty()
                                    where stl.IsDeleted == false 
                                    select new StockLineReportFilter()
                                    {
                                        StockLineId = stl.StockLineId,
                                        partNumber = mpx.PartNumber == null ? "" : mpx.PartNumber,
                                        partDescription = mpx.Description == null ? "" : mpx.Description,
                                        serialNumber = stl.SerialNumber == null ? "" : stl.SerialNumber,
                                        stocklineNumber = stl.StockLineNumber == null ? "" : stl.StockLineNumber,
                                        condition = cnd.Description == null ? "" : cnd.Description,
                                        vendorName = v.VendorName == null ? "" : v.VendorName,
                                        vendorCode = v.VendorCode == null ? "" : v.VendorCode,
                                        quantity = stl.Quantity == null ? 0 : stl.Quantity,
                                        qtyAdjusted = 0,
                                        poUnitCost = stl.PurchaseOrderUnitCost == null ? 0 : stl.PurchaseOrderUnitCost,
                                        unitPrice = stl.UnitSalesPrice == null ? 0 : stl.UnitSalesPrice,
                                        extendedPrice = 0,
                                        wareHouse = whs.Name == null ? "" : whs.Name,
                                        shelf = shf.Name == null ? "" : shf.Name,
                                        bin = bnd.Name == null ? "" : bnd.Name,
                                        accountCode = glc.AccountCode == null ? "" : glc.AccountCode,
                                        purchaseOrderNumber = pox.PurchaseOrderNumber == null ? "" : pox.PurchaseOrderNumber,
                                        repairOrderNumber = rox.RepairOrderNumber == null ? "" : rox.RepairOrderNumber,
                                        repairOrderUnitCost = stl.RepairOrderUnitCost == null ? 0 : stl.RepairOrderUnitCost,
                                        receivedDate = stl.ReceivedDate,
                                        receiverNumber = stl.ReceiverNumber == null ? "" : stl.ReceiverNumber,
                                        reconciliationNumber = stl.ReconciliationNumber == null ? "" : stl.ReconciliationNumber,
                                        isActive = stl.isActive,
                                    }).Distinct()
                            .Paginate(pageNumber, pageSize, sorts, filters).RecordCount;

                var list = (from stl in _appContext.StockLine
                            join im in _appContext.ItemMaster on stl.ItemMasterId equals im.ItemMasterId into stlim
                            from im in stlim.DefaultIfEmpty()
                            join cnd in _appContext.Condition on stl.ConditionId equals cnd.ConditionId into stlcnd
                            from cnd in stlcnd.DefaultIfEmpty()
                            //join mnf in _appContext.Manufacturer on stl.ManufacturerId equals mnf.ManufacturerId into stlmnf
                           // from mnf in stlmnf.DefaultIfEmpty()
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
                            join v in _appContext.Vendor on pox.VendorId equals v.VendorId into poxv
                            from v in poxv.DefaultIfEmpty()
                            join rox in _appContext.RepairOrder on stl.RepairOrderId equals rox.RepairOrderId into stlrox
                            from rox in stlrox.DefaultIfEmpty()
                            join mpx in _appContext.MasterParts on im.MasterPartId equals mpx.MasterPartId into stlmpx
                            from mpx in stlmpx.DefaultIfEmpty()
                            where stl.IsDeleted == false 
                            select new StockLineReportFilter()
                            {
                                StockLineId=stl.StockLineId,
                                partNumber = mpx.PartNumber == null ? "" : mpx.PartNumber,
                                partDescription = mpx.Description == null ? "" : mpx.Description,
                                serialNumber = stl.SerialNumber == null ? "" : stl.SerialNumber,
                                stocklineNumber = stl.StockLineNumber == null ? "" : stl.StockLineNumber,
                                condition = cnd.Description == null ? "" : cnd.Description,
                                vendorName = v.VendorName == null ? "" : v.VendorName,
                                vendorCode = v.VendorCode == null ? "" : v.VendorCode,
                                quantity = stl.Quantity == null ? 0 : stl.Quantity,
                                qtyAdjusted = 0,
                                poUnitCost = stl.PurchaseOrderUnitCost == null ? 0 : stl.PurchaseOrderUnitCost,
                                unitPrice = stl.UnitSalesPrice == null ? 0 : stl.UnitSalesPrice,
                                extendedPrice = 0,
                                wareHouse = whs.Name == null ? "" : whs.Name,
                                shelf = shf.Name == null ? "" : shf.Name,
                                bin = bnd.Name == null ? "" : bnd.Name,
                                accountCode = glc.AccountCode == null ? "" : glc.AccountCode,
                                purchaseOrderNumber = pox.PurchaseOrderNumber == null ? "" : pox.PurchaseOrderNumber,
                                repairOrderNumber = rox.RepairOrderNumber == null ? "" : rox.RepairOrderNumber,
                                repairOrderUnitCost = stl.RepairOrderUnitCost == null ? 0 : stl.RepairOrderUnitCost,
                                receivedDate = stl.ReceivedDate,
                                receiverNumber = stl.ReceiverNumber == null ? "" : stl.ReceiverNumber,
                                reconciliationNumber = stl.ReconciliationNumber == null ? "" : stl.ReconciliationNumber,
                                isActive = stl.isActive,
                                totalRecords = totalRecords
                            }).Distinct()
                            .Paginate(pageNumber, pageSize, sorts, filters).Results;
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}





