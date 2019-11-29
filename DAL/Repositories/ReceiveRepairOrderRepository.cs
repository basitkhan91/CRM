using System;
using System.Linq;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class ReceiveRepairOrderRepository : Repository<ReceiveRepairOrderRepository>, IReceiveRepairOrderRepository
    {
        #region Private Members
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        #endregion Private Members

        #region Public Methods

        public ReceiveRepairOrderRepository(ApplicationDbContext context) : base(context)
        {
        }

        public object GetRepairOrderHeader(long repairOrderId)
        {
            var repairOrderHeader = (from ro in _appContext.RepairOrder
                                     join emp in _appContext.Employee on ro.RequisitionerId equals emp.EmployeeId
                                     join term in _appContext.CreditTerms on ro.CreditTermsId equals term.CreditTermsId
                                     into leftTerm
                                     from term in leftTerm.DefaultIfEmpty()
                                     join prio in _appContext.Priority on ro.PriorityId equals prio.PriorityId
                                     into leftPrio
                                     from prio in leftPrio.DefaultIfEmpty()
                                     join apprEmp in _appContext.Employee on ro.ApproverId equals apprEmp.EmployeeId
                                     into leftAppEmp
                                     from apprEmp in leftAppEmp.DefaultIfEmpty()
                                     join vend in _appContext.Vendor on ro.VendorId equals vend.VendorId
                                     join vencont in _appContext.VendorContact on vend.VendorId equals vencont.VendorId
                                     into leftVencont
                                     from venCont in leftVencont.DefaultIfEmpty()
                                     join cont in _appContext.Contact on venCont.ContactId equals cont.ContactId
                                     into leftCont
                                     from cont in leftCont.DefaultIfEmpty()
                                     where ro.RepairOrderId == repairOrderId
                                     orderby venCont.IsDefaultContact descending
                                     select new
                                     {
                                         RepairOrderId = ro.RepairOrderId,
                                         RepairOrderNumber = ro.RepairOrderNumber,
                                         StatusId = ro.StatusId,
                                         VendorName = vend.VendorName,
                                         VendorCode = vend.VendorCode,
                                         VendorContact = cont != null ? cont.FirstName + " " + cont.LastName : "",
                                         VendorPhone = cont != null ? cont.MobilePhone : "",
                                         RequestedBy = emp != null ? emp.FirstName + " " + emp.LastName : "",
                                         OpenDate = ro.OpenDate,
                                         ClosedDate = ro.ClosedDate,
                                         NeedByDate = ro.NeedByDate,
                                         DateApproved = ro.ApprovedDate,
                                         Approver = apprEmp != null ? apprEmp.FirstName + " " + apprEmp.LastName : "",
                                         CreditLimit = ro.CreditLimit,
                                         Terms = term != null ? term.Percentage : 0,
                                         Priority = prio != null ? prio.Description : "",
                                         DeferredReceiver = ro.DeferredReceiver,
                                         Resale = ro.Resale,
                                         ManagementStructureId = ro.ManagementStructureId,
                                         Memo = ro.RoMemo
                                     }).FirstOrDefault();

            return repairOrderHeader;
        }

        public object GetRepairOrderPartsByRepairOrderId(long repairOrderId)
        {
            var repairOrderParts = (from rop in _appContext.RepairOrderPart
                                    join itm in _appContext.ItemMaster on rop.ItemMasterId equals itm.ItemMasterId
                                    join manf in _appContext.Manufacturer on itm.ManufacturerId equals manf.ManufacturerId
                                    into leftManf
                                    from manf in leftManf.DefaultIfEmpty()
                                    where rop.RepairOrderId == repairOrderId
                                    select new
                                    {
                                        RepairOrderPartRecordId = rop.RepairOrderPartRecordId,
                                        RepairOrderId = rop.RepairOrderId,
                                        PartNumberId = rop.PartNumberId,
                                        ItemTypeId = rop.ItemTypeId,
                                        QuantityToRepair = rop.QuantityOrdered,
                                        QuantityRepaired = _appContext.StockLine.Count(s => s.RepairOrderPartRecordId == rop.RepairOrderPartRecordId && s.RepairOrderId == rop.RepairOrderId),
                                        ConditionId = rop.ConditionId,
                                        DiscountAmount = rop.DiscountAmount,
                                        DiscountPercent = rop.DiscountPercent,
                                        DiscountPerUnit = rop.DiscountPerUnit,
                                        ExtendedCost = rop.ExtendedCost,
                                        ForeignExchangeRate = rop.ForeignExchangeRate,
                                        FunctionalCurrencyId = rop.FunctionalCurrencyId,
                                        GlAccountId = rop.GlAccountId,
                                        IsParent = rop.IsParent,
                                        ItemMasterId = rop.ItemMasterId,
                                        ManagementStructureId = rop.ManagementStructureId,
                                        ManufacturerId = rop.ManufacturerId,
                                        MasterCompanyId = rop.MasterCompanyId,
                                        Memo = rop.Memo,
                                        NeedByDate = rop.NeedByDate,
                                        ReportCurrencyId = rop.ReportCurrencyId,
                                        SalesOrderId = rop.SalesOrderId,
                                        UnitCost = rop.UnitCost,
                                        UOMId = rop.UOMId,
                                        UpdatedBy = rop.UpdatedBy,
                                        WorkOrderId = rop.WorkOrderId,
                                        CreatedDate = rop.CreatedDate,
                                        UpdatedDate = rop.UpdatedDate,
                                        RoPartSplitUserTypeId = rop.RoPartSplitUserTypeId,
                                        RoPartSplitUserId = rop.RoPartSplitUserId,
                                        RoPartSplitAddressId = rop.RoPartSplitAddressId,
                                        RoPartSplitAddress1 = rop.RoPartSplitAddress1,
                                        RoPartSplitAddress2 = rop.RoPartSplitAddress2,
                                        RoPartSplitAddress3 = rop.RoPartSplitAddress3,
                                        RoPartSplitCity = rop.RoPartSplitCity,
                                        RoPartSplitStateOrProvince = rop.RoPartSplitStateOrProvince,
                                        RoPartSplitPostalCode = rop.RoPartSplitPostalCode,
                                        RoPartSplitCountry = rop.RoPartSplitCountry,
                                        StockLine = new
                                        {
                                            StockLineId = 1,
                                            ControlNumber = "CTRL-1",
                                            PurchaseOrderNumber = "PO1",
                                            StockLineNumber = "STL-1"
                                        },
                                        POPartSplitAddress = new
                                        {
                                            rop.RoPartSplitAddressId
                                        },
                                        ItemMaster = new
                                        {
                                            PartNumber = itm.PartNumber,
                                            PartDescription = itm.PartDescription,
                                            GLAccountId = itm.GLAccountId,
                                            IsTimeLife = itm.IsTimeLife,
                                            IsSerialized = itm.IsSerialized,
                                            ManufacturerId = itm.ManufacturerId,
                                            IsPma = itm.isPma,
                                            IsDer = itm.DER,
                                            Manufacturer = manf != null ? new
                                            {
                                                ManufacturerId = manf.ManufacturerId,
                                                Name = manf.Name,
                                            } : null
                                        }
                                    }).ToList();

            return repairOrderParts;

        }

        public int GetLastIdNumber(long repairOrderId, long repairOrderPartId)
        {
            var stockLine = _appContext.StockLine.Where(x => x.RepairOrderId == repairOrderId && x.RepairOrderPartRecordId == repairOrderPartId).OrderByDescending(x => x.StockLineId).FirstOrDefault();
            if (stockLine != null)
            {
                return Convert.ToInt32(stockLine.IdNumber);
            }
            else
            {
                return 0;
            }
        }

        public object GetReceivingRepairOrderForView(long repairOrderId)
        {
            var parts = (from part in _appContext.RepairOrderPart

                         join itm in _appContext.ItemMaster on part.ItemMasterId equals itm.ItemMasterId

                         join glAcc in _appContext.GLAccount on itm.GLAccountId equals glAcc.GLAccountId
                         join uom in _appContext.UnitOfMeasure on part.UOMId equals uom.UnitOfMeasureId
                         into leftUom
                         from uom in leftUom.DefaultIfEmpty()

                         join emp in _appContext.Employee on part.RoPartSplitUserId equals emp.EmployeeId
                         into leftEmp
                         from emp in leftEmp.DefaultIfEmpty()
                         join manf in _appContext.Manufacturer on itm.ManufacturerId equals manf.ManufacturerId into leftManf
                         from manf in leftManf.DefaultIfEmpty()

                         where part.RepairOrderId == repairOrderId
                         select new
                         {
                             RepairOrderId = part.RepairOrderId,
                             RepairOrderPartRecordId = part.RepairOrderPartRecordId,
                             UOMId = part.UOMId,
                             uomText = uom != null ? uom.ShortName : "",
                             RoPartSplitUserName = emp != null ? emp.FirstName + " " + emp.LastName : "",
                             ConditionId = part.ConditionId,
                             IsParent = part.IsParent,
                             ManagementStructureId = part.ManagementStructureId,
                             QuantityToRepair = part.QuantityOrdered,
                             DiscountPerUnit = part.DiscountPercent,
                             ExtendedCost = part.ExtendedCost,
                             UnitCost = part.UnitCost,
                             StockLine = _appContext.StockLine.Where(x => x.RepairOrderId == repairOrderId && x.RepairOrderPartRecordId == part.RepairOrderPartRecordId).Select(SL => new
                             {
                                 StockLineId = SL.StockLineId,
                                 StockLineNumber = SL.StockLineNumber,
                                 ControlNumber = SL.ControlNumber,
                                 IdNumber = SL.IdNumber,
                                 ConditionId = SL.ConditionId,
                                 SerialNumber = SL.SerialNumber,
                                 Quantity = SL.Quantity,
                                 RepairOrderUnitCost = SL.RepairOrderUnitCost,
                                 RepairOrderExtendedCost = SL.RepairOrderExtendedCost,
                                 ReceiverNumber = SL.ReceiverNumber,
                                 WorkOrder = 0,
                                 SalesOrder = 0,
                                 SubWorkOrder = 0,
                                 OwnerType = SL.OwnerType,
                                 ObtainFromType = SL.ObtainFromType,
                                 TraceableToType = SL.TraceableToType,
                                 ManufacturingTrace = SL.ManufacturingTrace,
                                 ManufacturerId = SL.ManufacturerId,
                                 ManufacturerLotNumber = SL.ManufacturerLotNumber,
                                 ManufacturingDate = SL.ManufacturingDate != null ? Convert.ToDateTime(SL.ManufacturingDate).ToShortDateString() : null,
                                 ManufacturingBatchNumber = SL.ManufacturingBatchNumber,
                                 PartCertificationNumber = SL.PartCertificationNumber,
                                 EngineSerialNumber = SL.EngineSerialNumber,
                                 ShippingViaId = SL.ShippingViaId,
                                 ShippingReference = SL.ShippingReference,
                                 ShippingAccount = SL.ShippingAccount,
                                 CertifiedDate = SL.CertifiedDate != null ? Convert.ToDateTime(SL.CertifiedDate).ToShortDateString() : null,
                                 CertifiedBy = SL.CertifiedBy,
                                 TagDate = SL.TagDate != null ? Convert.ToDateTime(SL.TagDate).ToShortDateString() : null,
                                 ExpirationDate = SL.ExpirationDate != null ? Convert.ToDateTime(SL.ExpirationDate).ToShortDateString() : null,
                                 CertifiedDueDate = SL.CertifiedDueDate != null ? Convert.ToDateTime(SL.CertifiedDueDate).ToShortDateString() : null,
                                 AircraftTailNumber = SL.AircraftTailNumber,
                                 GLAccountId = SL.GLAccountId,
                                 GLAccountText = _appContext.GLAccount.Where(p => p.GLAccountId == SL.GLAccountId).FirstOrDefault().AccountName,
                                 ConditionText = SL.ConditionId != null ? _appContext.Condition.Where(p => p.ConditionId == SL.ConditionId).FirstOrDefault().Description : "",
                                 ManagementStructureEntityId = SL.ManagementStructureEntityId,
                                 SiteId = SL.SiteId,
                                 WarehouseId = SL.WarehouseId,
                                 LocationId = SL.LocationId,
                                 ShelfId = SL.ShelfId,
                                 BinId = SL.BinId,
                                 ManufacturerText = manf != null ? manf.Name : "",
                                 ShippingViaText = GetShippViaText(SL.ShippingViaId),
                                 SiteText = GetSiteText(SL.SiteId),
                                 WarehouseText = GetWarehouseText(SL.WarehouseId),
                                 LocationText = GetLocationText(SL.LocationId),
                                 ShelfText = GetShelfText(SL.ShelfId),
                                 BinText = GetBinText(SL.BinId),
                                 ObtainFrom = SL.ObtainFrom,
                                 Owner = SL.Owner,
                                 TraceableTo = SL.TraceableTo,
                                 ObtainFromText = SL.ObtainFromType == 2 ? SL.ObtainFrom : GetCustomerVendor(SL.ObtainFrom, SL.ObtainFromType),
                                 OwnerText = SL.OwnerType == 2 ? SL.Owner : GetCustomerVendor(SL.Owner, SL.OwnerType),
                                 TraceableToText = SL.TraceableToType == 2 ? SL.TraceableTo : GetCustomerVendor(SL.TraceableTo, SL.TraceableToType)
                             }),
                             TimeLife = _appContext.TimeLife.Where(x => x.RepairOrderId == repairOrderId && x.RepairOrderPartRecordId == part.RepairOrderPartRecordId),
                             ItemMaster = new
                             {
                                 PartNumber = itm.PartNumber,
                                 PartDescription = itm.PartDescription,
                                 GLAccountId = itm.GLAccountId,
                                 GLAccount = new
                                 {
                                     GLAccountId = glAcc.GLAccountId,
                                     AccountCode = glAcc.AccountCode,
                                     AccountName = glAcc.AccountName,
                                     AccountCodeDescription = glAcc.AccountCodeDescription
                                 },
                                 IsTimeLife = itm.IsTimeLife,
                                 IsSerialized = itm.IsSerialized,
                                 ManufacturerId = itm.ManufacturerId,
                                 IsPma = itm.isPma,
                                 IsDer = itm.DER,
                                 Manufacturer = manf != null ? new
                                 {
                                     ManufacturerId = manf.ManufacturerId,
                                     Name = manf.Name,
                                 } : null
                             }
                         }).ToList();

            return parts;
        }

        public object GetReceivingRepairOrderForEdit(long repairOrderId)
        {
            var parts = (from part in _appContext.RepairOrderPart
                         join itm in _appContext.ItemMaster on part.ItemMasterId equals itm.ItemMasterId
                         join manf in _appContext.Manufacturer on itm.ManufacturerId equals manf.ManufacturerId
                         into leftManf
                         from manf in leftManf.DefaultIfEmpty()
                         join emp in _appContext.Employee on part.RoPartSplitUserId equals emp.EmployeeId
                         into leftEmp
                         from emp in leftEmp.DefaultIfEmpty()
                         where part.RepairOrderId == repairOrderId
                         select new
                         {
                             ItemMasterId = itm.ItemMasterId,
                             PartNumber = itm.PartNumber,
                             PartDescription = itm.PartDescription,
                             QuantityToRepair = part.QuantityOrdered,
                             StockLineCount = _appContext.StockLine.Count(x => x.RepairOrderId == repairOrderId && x.RepairOrderPartRecordId == part.RepairOrderPartRecordId),
                             RoPartSplitUserName = emp != null ? emp.FirstName + " " + emp.LastName : "",
                             StockLine = _appContext.StockLine.Where(x => x.RepairOrderId == repairOrderId && x.RepairOrderPartRecordId == part.RepairOrderPartRecordId).Select(SL => new
                             {
                                 RepairOrderId = SL.RepairOrderId,
                                 RepairOrderPartRecordId = SL.RepairOrderPartRecordId,
                                 StockLineId = SL.StockLineId,
                                 StockLineNumber = SL.StockLineNumber,
                                 ControlNumber = SL.ControlNumber,
                                 IdNumber = SL.IdNumber,
                                 ConditionId = SL.ConditionId,
                                 SerialNumber = SL.SerialNumber,
                                 Quantity = SL.Quantity,
                                 RepairOrderUnitCost = SL.RepairOrderUnitCost,
                                 RepairOrderExtendedCost = SL.RepairOrderExtendedCost,
                                 ReceiverNumber = SL.ReceiverNumber,
                                 WorkOrder = 0,
                                 SalesOrder = 0,
                                 SubWorkOrder = 0,
                                 OwnerType = SL.OwnerType,
                                 ObtainFromType = SL.ObtainFromType,
                                 TraceableToType = SL.TraceableToType,
                                 ManufacturingTrace = SL.ManufacturingTrace,
                                 ManufacturerId = SL.ManufacturerId,
                                 ManufacturerLotNumber = SL.ManufacturerLotNumber,
                                 ManufacturingDate = SL.ManufacturingDate != null ? Convert.ToDateTime(SL.ManufacturingDate).ToShortDateString() : null,
                                 ManufacturingBatchNumber = SL.ManufacturingBatchNumber,
                                 PartCertificationNumber = SL.PartCertificationNumber,
                                 EngineSerialNumber = SL.EngineSerialNumber,
                                 ShippingViaId = SL.ShippingViaId,
                                 ShippingReference = SL.ShippingReference,
                                 ShippingAccount = SL.ShippingAccount,
                                 CertifiedDate = SL.CertifiedDate != null ? Convert.ToDateTime(SL.CertifiedDate).ToShortDateString() : null,
                                 CertifiedBy = SL.CertifiedBy,
                                 TagDate = SL.TagDate != null ? Convert.ToDateTime(SL.TagDate).ToShortDateString() : null,
                                 ExpirationDate = SL.ExpirationDate != null ? Convert.ToDateTime(SL.ExpirationDate).ToShortDateString() : null,
                                 CertifiedDueDate = SL.CertifiedDueDate != null ? Convert.ToDateTime(SL.CertifiedDueDate).ToShortDateString() : null,
                                 AircraftTailNumber = SL.AircraftTailNumber,
                                 GLAccountId = SL.GLAccountId,
                                 GLAccountText = _appContext.GLAccount.Where(p => p.GLAccountId == SL.GLAccountId).FirstOrDefault().AccountName,
                                 ConditionText = SL.ConditionId != null ? _appContext.Condition.Where(p => p.ConditionId == SL.ConditionId).FirstOrDefault().Description : "",
                                 ManagementStructureEntityId = SL.ManagementStructureEntityId,
                                 SiteId = SL.SiteId,
                                 WarehouseId = SL.WarehouseId,
                                 LocationId = SL.LocationId,
                                 ShelfId = SL.ShelfId,
                                 BinId = SL.BinId,
                                 SiteText = GetSiteText(SL.SiteId),
                                 WarehouseText = GetWarehouseText(SL.WarehouseId),
                                 LocationText = GetLocationText(SL.LocationId),
                                 ShelfText = GetShelfText(SL.ShelfId),
                                 BinText = GetBinText(SL.BinId),
                                 ObtainFrom = SL.ObtainFrom,
                                 Owner = SL.Owner,
                                 TraceableTo = SL.TraceableTo

                             }),
                             TimeLife = _appContext.TimeLife.Where(x => x.RepairOrderId == repairOrderId && x.RepairOrderPartRecordId == part.RepairOrderPartRecordId),
                             ItemMaster = new
                             {
                                 PartNumber = itm.PartNumber,
                                 PartDescription = itm.PartDescription,
                                 GLAccountId = itm.GLAccountId,
                                 IsTimeLife = itm.IsTimeLife,
                                 IsSerialized = itm.IsSerialized,
                                 ManufacturerId = itm.ManufacturerId,
                                 IsPma = itm.isPma,
                                 IsDer = itm.DER,
                                 Manufacturer = manf != null ? new
                                 {
                                     ManufacturerId = manf.ManufacturerId,
                                     Name = manf.Name,
                                 } : null
                             }
                         }).ToList();

            return parts;

        }

        #endregion Public Methods

        #region Private Methods

        private string GetCustomerVendor(string id, int? typeId)
        {
            if (typeId != null)
            {
                if (typeId == 1 && id != "")
                {
                    var customer = _appContext.Customer.Where(x => x.CustomerId == Convert.ToInt64(id)).FirstOrDefault();
                    if (customer != null)
                    {
                        return customer.Name;
                    }
                }
                if (typeId == 3 && id != "")
                {
                    var vendor = _appContext.Vendor.Where(x => x.VendorId == Convert.ToInt64(id)).FirstOrDefault();
                    if (vendor != null)
                    {
                        return vendor.VendorName;
                    }
                }
            }
            return "";
        }

        private string GetSiteText(long? siteId)
        {
            if (siteId != null)
            {
                var site = _appContext.Site.Where(p => p.SiteId == siteId).FirstOrDefault();
                if (site != null)
                {
                    return site.Name;
                }
            }
            return "";
        }

        private string GetWarehouseText(long? warehouseId)
        {
            if (warehouseId != null)
            {
                var warehouse = _appContext.Warehouse.Where(p => p.WarehouseId == warehouseId).FirstOrDefault();
                if (warehouse != null)
                {
                    return warehouse.Name;
                }
            }
            return "";
        }

        private string GetLocationText(long? locationId)
        {
            if (locationId != null)
            {
                var location = _appContext.Location.Where(p => p.LocationId == locationId).FirstOrDefault();
                if (location != null)
                {
                    return location.Name;
                }
            }
            return "";
        }

        private string GetShelfText(long? shelfId)
        {
            if (shelfId != null)
            {
                var shelf = _appContext.Shelf.Where(p => p.ShelfId == shelfId).FirstOrDefault();
                if (shelf != null)
                {
                    return shelf.Name;
                }
            }
            return "";
        }

        private string GetBinText(long? binId)
        {
            if (binId != null)
            {
                var bin = _appContext.Bin.Where(p => p.BinId == binId).FirstOrDefault();
                if (bin != null)
                {
                    return bin.Name;
                }
            }
            return "";
        }

        private string GetUOMText(long? uomId)
        {
            if (uomId != null)
            {
                var uom = _appContext.UnitOfMeasure.Where(u => u.UnitOfMeasureId == uomId).FirstOrDefault();
                if (uom != null)
                {
                    return uom.ShortName;
                }
            }

            return "";
        }

        private string GetShippViaText(long? shippViaId)
        {
            if (shippViaId != null)
            {
                var shipVia = _appContext.ShippingVia.Where(u => u.ShippingViaId == shippViaId).FirstOrDefault();
                if (shipVia != null)
                {
                    return shipVia.Name;
                }
            }

            return "";
        }



        #endregion Private Methods

    }
}
