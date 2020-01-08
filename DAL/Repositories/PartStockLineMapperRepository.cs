using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class PartStockLineMapperRepository : Repository<PartStockLineMapperRepository>, IPartStockLineMapper
    {
        #region Private
        private ICommonRepository commonRepository;
        private static long[] accessedManagementStructureId = { 0 };
        private List<long> ManagementStructureIds = new List<long>();
        private static Dictionary<string, string> keyValues = new Dictionary<string, string>();
        #endregion

        public PartStockLineMapperRepository(ApplicationDbContext context, ICommonRepository commonRepository) : base(context)
        {
            this.commonRepository = commonRepository;
        }

        public object GetReceivingPurchaseOrderList(long id)
        {
            try
            {

                var purchaseOrder = _appContext.PurchaseOrder
                                   .Include("Vendor")
                                   .Where(x => x.PurchaseOrderId == id).FirstOrDefault();

                purchaseOrder.PurchaseOderPart = _appContext.PurchaseOrderPart
                                        .Where(x => x.PurchaseOrderId == id)
                                        .ToList();

                purchaseOrder.PurchaseOderPart.ToList().ForEach(part =>
                {
                    part.ItemMaster = _appContext.ItemMaster.Find(part.ItemMasterId);

                    var stockLines = _appContext.StockLine.Where(x => x.PurchaseOrderPartRecordId != null && x.PurchaseOrderPartRecordId == part.PurchaseOrderPartRecordId && !x.IsDeleted).ToList();
                    if (stockLines != null && stockLines.Count > 0)
                    {
                        part.StockLineCount = (long)stockLines.Sum(x => x.Quantity);
                    }

                    if (!part.isParent)
                    {
                        part.POPartSplitAddress = _appContext.Address.Where(x => x.AddressId == part.POPartSplitAddressId).FirstOrDefault();
                    }
                });

                foreach (var part in purchaseOrder.PurchaseOderPart)
                {
                    part.ItemMaster.Manufacturer = _appContext.Manufacturer.Where(x => x.ManufacturerId == part.ItemMaster.ManufacturerId).FirstOrDefault();
                }

                var approver = purchaseOrder.ApproverId != null ? _appContext.Employee.Find(purchaseOrder.ApproverId) : null;
                var requestedByObject = _appContext.Employee.Where(x => x.EmployeeId == purchaseOrder.RequestedBy).FirstOrDefault();
                return new
                {
                    StatusId = purchaseOrder.StatusId,
                    PurchaseOrderId = purchaseOrder.PurchaseOrderId,
                    PurchaseOrderNumber = purchaseOrder.PurchaseOrderNumber,
                    RequestedBy = purchaseOrder.RequestedBy,
                    RequestedByText = requestedByObject.FirstName + " " + requestedByObject.LastName,
                    Vendor = purchaseOrder.Vendor,
                    OpenDate = purchaseOrder.OpenDate,
                    Approver = approver != null ? approver.FirstName + " " + approver.LastName : "",
                    NeedByDate = purchaseOrder.NeedByDate,
                    DateApproved = purchaseOrder.DateApproved,
                    DeferredReceiver = purchaseOrder.DeferredReceiver,
                    Resale = purchaseOrder.Resale,
                    Notes = purchaseOrder.Notes,
                    PurchaseOderPart = purchaseOrder.PurchaseOderPart,
                    BillToUserType = purchaseOrder.BillToUserType,
                    BillToUserId = purchaseOrder.BillToUserId
                };

                //return purchaseOrder;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public object GetReceivingPurchaseOrderEdit(long purchaseOrderId)
        {
            var parts = (from part in _appContext.PurchaseOrderPart
                         join order in _appContext.PurchaseOrder on part.PurchaseOrderId equals order.PurchaseOrderId
                         join itm in _appContext.ItemMaster on part.ItemMasterId equals itm.ItemMasterId
                         join manf in _appContext.Manufacturer on itm.ManufacturerId equals manf.ManufacturerId
                         into leftManf
                         from manf in leftManf.DefaultIfEmpty()
                         join emp in _appContext.Employee on part.POPartSplitUserId equals emp.EmployeeId
                         into leftEmp
                         from emp in leftEmp.DefaultIfEmpty()
                         where part.PurchaseOrderId == purchaseOrderId
                         select new
                         {
                             PurchaseOrderId = part.PurchaseOrderId,
                             PurchaseOrderPartRecordId = part.PurchaseOrderPartRecordId,
                             ItemMasterId = itm.ItemMasterId,
                             PartNumber = itm.PartNumber,
                             PartDescription = itm.PartDescription,
                             QuantityOrdered = part.QuantityOrdered,
                             StockLineCount = _appContext.StockLine.Count(x => x.PurchaseOrderId == purchaseOrderId && x.PurchaseOrderPartRecordId == part.PurchaseOrderPartRecordId && !x.IsDeleted),
                             PoPartSplitUserName = emp != null ? emp.FirstName + " " + emp.LastName : "",
                             StockLine = _appContext.StockLine.Where(x => x.PurchaseOrderId == purchaseOrderId && x.PurchaseOrderPartRecordId == part.PurchaseOrderPartRecordId && !x.IsDeleted).Select(SL => new
                             {
                                 PurchaseOrderId = SL.PurchaseOrderId,
                                 PurchaseOrderPartRecordId = SL.PurchaseOrderPartRecordId,
                                 StockLineId = SL.StockLineId,
                                 StockLineNumber = SL.StockLineNumber,
                                 ControlNumber = SL.ControlNumber,
                                 IdNumber = SL.IdNumber,
                                 ConditionId = SL.ConditionId,
                                 SerialNumber = SL.SerialNumber,
                                 Quantity = SL.Quantity,
                                 PurchaseOrderUnitCost = SL.PurchaseOrderUnitCost,
                                 PurchaseOrderExtendedCost = SL.PurchaseOrderExtendedCost,
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
                                 TraceableTo = SL.TraceableTo,
                                 IsDeleted = SL.IsDeleted
                             }),
                             TimeLife = _appContext.TimeLife.Where(x => x.PurchaseOrderId == purchaseOrderId && x.PurchaseOrderPartRecordId == part.PurchaseOrderPartRecordId),
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

        public object GetReceivingPurchaseOrderView(long id)
        {
            try
            {
                var purchaseOrder = _appContext.PurchaseOrder
                                   .Include("Vendor")
                                   .Include("StockLine")
                                   .Include("TimeLife")
                                   .Where(x => x.PurchaseOrderId == id).FirstOrDefault();

                purchaseOrder.PurchaseOderPart = _appContext.PurchaseOrderPart
                                        .Where(x => x.PurchaseOrderId == id)
                                        .ToList();

                purchaseOrder.PurchaseOderPart.ToList().ForEach(part =>
                {
                    part.ItemMaster = _appContext.ItemMaster.Include("Manufacturer").Where(x => x.ItemMasterId == part.ItemMasterId).FirstOrDefault();
                    part.ItemMaster.GLAccount = part.ItemMaster.GLAccountId != null ? _appContext.GLAccount.Where(x => x.GLAccountId == part.ItemMaster.GLAccountId).FirstOrDefault() : null;

                    if (part.StockLine != null && part.StockLine.Count > 0)
                    {
                        part.StockLine = part.StockLine.Where(x => !x.IsDeleted).OrderBy(x => x.StockLineId).ToList();
                        part.TimeLife = part.TimeLife.OrderBy(x => x.StockLineId).ToList();
                        part.StockLineCount = (long)part.StockLine.Sum(x => x.Quantity);
                    }

                    if (!part.isParent)
                    {
                        part.POPartSplitAddress = _appContext.Address.Where(x => x.AddressId == part.POPartSplitAddressId).FirstOrDefault();
                    }
                });

                var approver = purchaseOrder.ApproverId != null ? _appContext.Employee.Find(purchaseOrder.ApproverId) : null;

                return new
                {
                    StatusId = purchaseOrder.StatusId,
                    PurchaseOrderId = purchaseOrder.PurchaseOrderId,
                    PurchaseOrderNumber = purchaseOrder.PurchaseOrderNumber,
                    RequestedBy = purchaseOrder.RequestedBy,
                    Vendor = purchaseOrder.Vendor,
                    OpenDate = purchaseOrder.OpenDate,
                    Approver = approver != null ? approver.FirstName + " " + approver.LastName : "",
                    NeedByDate = purchaseOrder.NeedByDate,
                    DateApproved = purchaseOrder.DateApproved,
                    DeferredReceiver = purchaseOrder.DeferredReceiver,
                    Resale = purchaseOrder.Resale,
                    Notes = purchaseOrder.Notes,
                    PurchaseOderPart = purchaseOrder.PurchaseOderPart.Select(x => new
                    {
                        ItemMaster = x.ItemMaster,
                        PurchaseOrderId = x.PurchaseOrderId,
                        PurchaseOrderPartRecordId = x.PurchaseOrderPartRecordId,
                        UOMId = x.UOMId,
                        ConditionId = x.ConditionId,
                        IsParent = x.isParent,
                        ManagementStructureId = x.ManagementStructureId,
                        QuantityOrdered = x.QuantityOrdered,
                        DiscountPerUnit = x.DiscountPerUnit,
                        ExtendedCost = x.ExtendedCost,
                        UnitCost = x.UnitCost,
                        QuantityRejected = x.QuantityRejected,
                        StockLine = x.StockLine == null ? null : x.StockLine.Select(SL => new
                        {
                            StockLineId = SL.StockLineId,
                            StockLineNumber = SL.StockLineNumber,
                            ControlNumber = SL.ControlNumber,
                            IdNumber = SL.IdNumber,
                            ConditionId = SL.ConditionId,
                            SerialNumber = SL.SerialNumber,
                            Quantity = SL.Quantity,
                            PurchaseOrderUnitCost = SL.PurchaseOrderUnitCost,
                            PurchaseOrderExtendedCost = SL.PurchaseOrderExtendedCost,
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
                            ObtainFrom = SL.ObtainFromType == 2 ? SL.ObtainFrom : GetCustomerVendor(SL.ObtainFrom, SL.ObtainFromType),
                            Owner = SL.OwnerType == 2 ? SL.Owner : GetCustomerVendor(SL.Owner, SL.OwnerType),
                            TraceableTo = SL.TraceableToType == 2 ? SL.TraceableTo : GetCustomerVendor(SL.TraceableTo, SL.TraceableToType),
                            CompanyText = GetManagementStrucreCodeByName(SL.ManagementStructureEntityId, "Level1"),
                            BusinessUnitText = GetManagementStrucreCodeByName(SL.ManagementStructureEntityId, "Level2"),
                            DivisionText = GetManagementStrucreCodeByName(SL.ManagementStructureEntityId, "Level3"),
                            DepartmentText = GetManagementStrucreCodeByName(SL.ManagementStructureEntityId, "Level4"),
                        }),
                        TimeLife = x.TimeLife
                    })
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public object GetPurchaseOrderHeader(long purchaseOrderId)
        {
            var purchaseOrderHeader = (from po in _appContext.PurchaseOrder
                                       join emp in _appContext.Employee on po.RequestedBy equals emp.EmployeeId
                                       join term in _appContext.CreditTerms on po.CreditTermsId equals term.CreditTermsId
                                       into leftTerm
                                       from term in leftTerm.DefaultIfEmpty()
                                       join prio in _appContext.Priority on po.PriorityId equals prio.PriorityId
                                       into leftPrio
                                       from prio in leftPrio.DefaultIfEmpty()
                                       join apprEmp in _appContext.Employee on po.ApproverId equals apprEmp.EmployeeId
                                       into leftAppEmp
                                       from apprEmp in leftAppEmp.DefaultIfEmpty()
                                       join vend in _appContext.Vendor on po.VendorId equals vend.VendorId
                                       join vencont in _appContext.VendorContact on vend.VendorId equals vencont.VendorId
                                       into leftVencont
                                       from venCont in leftVencont.DefaultIfEmpty()
                                       join cont in _appContext.Contact on venCont.ContactId equals cont.ContactId
                                       into leftCont
                                       from cont in leftCont.DefaultIfEmpty()
                                       where po.PurchaseOrderId == purchaseOrderId
                                       orderby venCont.IsDefaultContact descending
                                       select new
                                       {
                                           PurchaseOrderId = po.PurchaseOrderId,
                                           PurchaseOrderNumber = po.PurchaseOrderNumber,
                                           StatusId = po.StatusId,
                                           VendorName = vend.VendorName,
                                           VendorCode = vend.VendorCode,
                                           VendorContact = cont != null ? cont.FirstName + " " + cont.LastName : "",
                                           VendorPhone = cont != null ? cont.MobilePhone : "",
                                           RequestedBy = emp != null ? emp.FirstName + " " + emp.LastName : "",
                                           OpenDate = po.OpenDate,
                                           ClosedDate = po.ClosedDate,
                                           NeedByDate = po.NeedByDate,
                                           DateApproved = po.DateApproved,
                                           Approver = apprEmp != null ? apprEmp.FirstName + " " + apprEmp.LastName : "",
                                           CreditLimit = po.CreditLimit,
                                           Terms = term != null ? term.Percentage : 0,
                                           Priority = prio != null ? prio.Description : "",
                                           DeferredReceiver = po.DeferredReceiver,
                                           Resale = po.Resale,
                                           ManagementStructureId = po.ManagementStructureId,
                                           Memo = po.Notes
                                       }).FirstOrDefault();

            return purchaseOrderHeader;
        }

        public object GetPurchaseOrderPartsForSummary(long purchaseOrderId)
        {
            var parts = (from part in _appContext.PurchaseOrderPart

                         join itm in _appContext.ItemMaster on part.ItemMasterId equals itm.ItemMasterId

                         join glAcc in _appContext.GLAccount on itm.GLAccountId equals glAcc.GLAccountId
                         join uom in _appContext.UnitOfMeasure on part.UOMId equals uom.UnitOfMeasureId
                         into leftUom
                         from uom in leftUom.DefaultIfEmpty()

                         join emp in _appContext.Employee on part.POPartSplitUserId equals emp.EmployeeId
                         into leftEmp
                         from emp in leftEmp.DefaultIfEmpty()
                         join manf in _appContext.Manufacturer on itm.ManufacturerId equals manf.ManufacturerId into leftManf
                         from manf in leftManf.DefaultIfEmpty()

                         where part.PurchaseOrderId == purchaseOrderId
                         select new
                         {
                             PurchaseOrderId = part.PurchaseOrderId,
                             PurchaseOrderPartRecordId = part.PurchaseOrderPartRecordId,
                             UOMId = part.UOMId,
                             uomText = uom != null ? uom.ShortName : "",
                             PoPartSplitUserName = emp != null ? emp.FirstName + " " + emp.LastName : "",
                             ConditionId = part.ConditionId,
                             IsParent = part.isParent,
                             ManagementStructureId = part.ManagementStructureId,
                             QuantityOrdered = part.QuantityOrdered,
                             DiscountPerUnit = part.DiscountPerUnit,
                             ExtendedCost = part.ExtendedCost,
                             UnitCost = part.UnitCost,
                             QuantityRejected = part.QuantityRejected,
                             StockLine = _appContext.StockLine.Where(x => x.PurchaseOrderId == purchaseOrderId && x.PurchaseOrderPartRecordId == part.PurchaseOrderPartRecordId && !x.IsDeleted).Select(SL => new
                             {
                                 StockLineId = SL.StockLineId,
                                 StockLineNumber = SL.StockLineNumber,
                                 ControlNumber = SL.ControlNumber,
                                 IdNumber = SL.IdNumber,
                                 SerialNumber = SL.SerialNumber,
                                 Quantity = SL.Quantity,
                                 PurchaseOrderUnitCost = SL.PurchaseOrderUnitCost,
                                 PurchaseOrderExtendedCost = SL.PurchaseOrderExtendedCost,
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
                                 ConditionId = SL.ConditionId,
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
                                 TraceableToText = SL.TraceableToType == 2 ? SL.TraceableTo : GetCustomerVendor(SL.TraceableTo, SL.TraceableToType),
                                 CompanyText = GetManagementStrucreCodeByName(SL.ManagementStructureEntityId, "Level1"),
                                 BusinessUnitText = GetManagementStrucreCodeByName(SL.ManagementStructureEntityId, "Level2"),
                                 DivisionText = GetManagementStrucreCodeByName(SL.ManagementStructureEntityId, "Level3"),
                                 DepartmentText = GetManagementStrucreCodeByName(SL.ManagementStructureEntityId, "Level4"),
                             }),
                             TimeLife = _appContext.TimeLife.Where(x => x.PurchaseOrderId == purchaseOrderId && x.PurchaseOrderPartRecordId == part.PurchaseOrderPartRecordId),
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
        
        #region REPAIR ORDER

        public RepairOrderDto GetReceivingRepairOrderList(long id)
        {
            try
            {
                var repairOrder = _appContext.RepairOrder
                    .Include("Vendor")
                    .Where(x => x.RepairOrderId == id).FirstOrDefault();

                repairOrder.RepairOrderPart = _appContext.RepairOrderPart
                    .Where(x => x.RepairOrderId == id)
                    .ToList();

                repairOrder.RepairOrderPart.ToList().ForEach(part =>
                {
                    part.ItemMaster = _appContext.ItemMaster.Find(part.ItemMasterId);

                    var stockLines = _appContext.StockLine
                        .Where(x => x.RepairOrderPartRecordId != null && x.RepairOrderPartRecordId == part.RepairOrderPartRecordId)
                        .ToList();
                    if (stockLines != null && stockLines.Count > 0)
                    {
                        part.StockLineCount = (long)stockLines.Sum(x => x.Quantity);
                    }

                    if (part.IsParent == false)
                    {
                        part.RoPartSplitAddress = _appContext.Address
                            .Where(x => x.AddressId == part.RoPartSplitAddressId)
                            .FirstOrDefault();
                    }
                });

                foreach (var part in repairOrder.RepairOrderPart)
                {
                    part.ItemMaster.Manufacturer = _appContext.Manufacturer.Where(x => x.ManufacturerId == part.ItemMaster.ManufacturerId).FirstOrDefault();
                }

                var repairOrderPartDto = CreateRepairOrderPartDto(repairOrder);
                return repairOrderPartDto;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion REPAIR ORDER

        #region PRIVATE METHODS

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

        private RepairOrderDto CreateRepairOrderPartDto(RepairOrder repairOrder)
        {
            var repairOrderDto = new RepairOrderDto();

            if (repairOrder != null)
            {
                /** Generate RepairOrder **/
                repairOrderDto.RepairOrderId = repairOrder.RepairOrderId;
                repairOrderDto.RepairOrderNumber = repairOrder.RepairOrderNumber;
                repairOrderDto.StatusId = repairOrder.StatusId;
                repairOrderDto.Status = _getStatus(repairOrder.StatusId);
                repairOrderDto.VendorName = repairOrder.Vendor != null
                    ? repairOrder.Vendor.VendorName
                    : string.Empty;
                repairOrderDto.VendorCode = repairOrder.Vendor != null
                    ? repairOrder.Vendor.VendorCode
                    : string.Empty;
                repairOrderDto.VendorContact = repairOrder.VendorContactPhone;
                repairOrderDto.ContactPhone = repairOrder.Vendor != null
                    ? repairOrder.Vendor.VendorContractReference
                    : string.Empty;
                repairOrderDto.OpenDate = repairOrder.OpenDate;
                repairOrderDto.ClosedDate = repairOrder.ClosedDate;
                repairOrderDto.NeedByDate = repairOrder.NeedByDate;
                repairOrderDto.DateApproved = repairOrder.ApprovedDate;
                repairOrderDto.Approver = _getApprovarName(repairOrder.RepairOrderId);
                repairOrderDto.CreditLimit = repairOrder.CreditLimit;
                repairOrderDto.Terms = _getCreditTerm(repairOrder.RepairOrderId);
                repairOrderDto.Priority = _getPriority(repairOrder.RepairOrderId);
                repairOrderDto.DeferredReceiver = repairOrder.DeferredReceiver;
                repairOrderDto.Resale = repairOrder.Resale;
                repairOrderDto.ManagementStructureId = repairOrder.ManagementStructureId;
                repairOrderDto.Memo = repairOrder.RoMemo;
                repairOrderDto.RequestedBy = repairOrder.RequestedBy.ToString();

                /** Fill RepairOrderPart **/
                if (repairOrder.RepairOrderPart != null && repairOrder.RepairOrderPart.Any())
                {
                    repairOrderDto.RepairOrderPart = new List<RepairOrderPartsDto>();
                    RepairOrderPartsDto repairOrderPartDto = null;
                    foreach (var roPart in repairOrder.RepairOrderPart)
                    {

                        if (roPart.IsParent == true)
                        {
                            repairOrderPartDto = new RepairOrderPartsDto();
                            /** Fill RepairOrderPartsDto **/
                            repairOrderPartDto.RepairOrderId = roPart.RepairOrderId;
                            repairOrderPartDto.RepairOrderPartRecordId = roPart.RepairOrderPartRecordId;
                            repairOrderPartDto.ItemMasterId = roPart.ItemMasterId;
                            repairOrderPartDto.IsActive = roPart.IsActive;
                            repairOrderPartDto.IsParent = roPart.IsParent;
                            repairOrderPartDto.PartNumber = roPart.ItemMaster != null
                                ? roPart.ItemMaster.PartNumber
                                : string.Empty;
                            repairOrderPartDto.PartDescription = roPart.ItemMaster != null
                                ? roPart.ItemMaster.PartDescription
                                : string.Empty;
                            repairOrderPartDto.QuantityOrdered = roPart.QuantityOrdered;
                            repairOrderPartDto.QuantityReceived = _getStockLineInfo(roPart.RepairOrderPartRecordId)?.QuantityToReceive;
                            repairOrderPartDto.QuantityBackOrdered = roPart.QuantityBackOrdered;
                            repairOrderPartDto.QuantityRejected = _getStockLineInfo(roPart.RepairOrderPartRecordId)?.QuantityRejected;
                            repairOrderPartDto.Status = _getStatus(roPart.StatusId);
                            repairOrderPartDto.IsSerialized = _getStockLineInfo(roPart.RepairOrderPartRecordId)?.IsSerialized;
                            repairOrderPartDto.IsTimeLife = roPart.ItemMaster?.IsTimeLife;
                            repairOrderPartDto.ConditionId = roPart.ConditionId;
                            repairOrderPartDto.GlAccountId = roPart.GlAccountId ?? roPart.ItemMaster?.GLAccountId;
                            repairOrderPartDto.ManagementStructureId = roPart.ManagementStructureId;
                            repairOrderPartDto.UnitCost = roPart.UnitCost;
                            repairOrderPartDto.ExtendedCost = roPart.ExtendedCost;
                            repairOrderPartDto.ManufacturerId = roPart.ManufacturerId;
                            repairOrderPartDto.ManufacturerName = roPart?.ItemMaster?.Manufacturer?.Name;
                            repairOrderPartDto.StockLineId = _getStockLineInfo(roPart.RepairOrderPartRecordId)?.StockLineId;
                            repairOrderPartDto.StockLineNumber = _getStockLineInfo(roPart.RepairOrderPartRecordId)?.StockLineNumber;
                            repairOrderPartDto.ControlId = _getStockLineInfo(roPart.RepairOrderPartRecordId)?.IdNumber;
                            repairOrderPartDto.ControlNumber = _getStockLineInfo(roPart.RepairOrderPartRecordId)?.ControlNumber;

                            repairOrderDto.RepairOrderPart.Add(repairOrderPartDto);
                        }
                        else
                        {
                            /** Fill RepairOrderSplitPartsDto **/
                            var roSplitPartDto = new RepairOrderSplitPartsDto
                            {
                                ItemMasterId = roPart.ItemMasterId,
                                PartNumber = roPart.ItemMaster != null
                                    ? roPart.ItemMaster.PartNumber
                                    : string.Empty,
                                QuantityOrdered = roPart.QuantityOrdered,
                                QuantityReceived = _getStockLineInfo(roPart.RepairOrderPartRecordId)?.QuantityToReceive,
                                QuantityBackOrdered = roPart.QuantityBackOrdered,
                                QuantityRejected = _getStockLineInfo(roPart.RepairOrderPartRecordId)?.QuantityRejected,
                                Status = _getStatus(roPart.StatusId),
                                ManagementStructureId = roPart.ManagementStructureId,
                                // TODO: WHERE TO GET THESE"?
                                UserType = string.Empty,
                                UserName = string.Empty,
                                Address = string.Empty,
                                StockLineId = _getStockLineInfo(roPart.RepairOrderPartRecordId)?.StockLineId,
                                StockLineNumber = _getStockLineInfo(roPart.RepairOrderPartRecordId)?.StockLineNumber,
                                ControlId = _getStockLineInfo(roPart.RepairOrderPartRecordId)?.IdNumber,
                                ControlNumber = _getStockLineInfo(roPart.RepairOrderPartRecordId)?.ControlNumber,
                            };

                            if (repairOrderPartDto.RepairOrderSplitParts == null)
                            {
                                repairOrderPartDto.RepairOrderSplitParts = new List<RepairOrderSplitPartsDto>();
                            }
                            repairOrderPartDto.RepairOrderSplitParts.Add(roSplitPartDto);
                        }
                    }
                }
            }

            return repairOrderDto;
        }

        private string _getApprovarName(long repairOrderId)
        {
            var approver = (from ro in _appContext.RepairOrder
                            join emp in _appContext.Employee on ro.ApproverId equals emp.EmployeeId
                            where ro.RepairOrderId == repairOrderId
                            select new { Approvar = emp.FirstName }).FirstOrDefault();

            return approver.Approvar;

        }

        private string _getCreditTerm(long repairOrderId)
        {
            var creditTerm = (from ro in _appContext.RepairOrder
                              join ct in _appContext.CreditTerms on ro.CreditTermsId equals ct.CreditTermsId
                              where ro.RepairOrderId == repairOrderId
                              select new { CreditTerm = ct.Name }).FirstOrDefault();

            return creditTerm.CreditTerm;
        }

        private string _getPriority(long repairOrderId)
        {
            var priority = (from ro in _appContext.RepairOrder
                            join p in _appContext.Priority on ro.PriorityId equals p.PriorityId
                            where ro.RepairOrderId == repairOrderId
                            select new { Priority = p.Description }).FirstOrDefault();

            return priority.Priority;
        }

        private string _getStatus(int? statusId)
        {
            var status = statusId == 1
                ? "Open"
                : (statusId == 2
                    ? "Pending"
                    : (statusId == 3
                        ? "Fulfilling"
                        : "Closed"));

            return status;
        }

        private StockLine _getStockLineInfo(long repairOrderPartRecordId)
        {
            var stockLine = _appContext.StockLine
                .Where(x => x.RepairOrderPartRecordId == repairOrderPartRecordId)
                .FirstOrDefault();

            return stockLine;
        }
        #endregion PRIVATE METHODS

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        private string GetManagementStrucreCodeByName(long? managementStructureId, string keyName)
        {
            string returnValue = string.Empty;

            if (managementStructureId != null)
            {
                if (Array.IndexOf(ManagementStructureIds.ToArray(), managementStructureId) < 0)
                {
                    ManagementStructureIds.Add(Convert.ToInt64(managementStructureId));
                    keyValues = commonRepository.GetManagementStructureCodes(Convert.ToInt64(managementStructureId));
                }

                if (keyValues.ContainsKey(keyName))
                {
                    returnValue = keyValues[keyName];
                }
            }
            return returnValue;
        }

    }
}
