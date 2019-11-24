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
        public PartStockLineMapperRepository(ApplicationDbContext context) : base(context)
        {
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

                    var stockLines = _appContext.StockLine.Where(x => x.PurchaseOrderPartRecordId != null && x.PurchaseOrderPartRecordId == part.PurchaseOrderPartRecordId).ToList();
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
                    PurchaseOderPart = purchaseOrder.PurchaseOderPart                    
                };

                //return purchaseOrder;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public object GetReceivingPurchaseOrderEdit(long id)
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
                    part.ItemMaster = _appContext.ItemMaster.Include("Manufacturer").Where(x => x.ItemMasterId == part.ItemMasterId).FirstOrDefault();//.Find(part.ItemMasterId);
                    if (part.StockLine != null && part.StockLine.Count > 0)
                    {
                        part.StockLine = part.StockLine.OrderBy(x => x.StockLineId).ToList();
                        part.TimeLife = part.TimeLife.OrderBy(x => x.StockLineId).ToList();
                        part.StockLineCount = (long)part.StockLine.Sum(x => x.Quantity);
                    }

                    if (!part.isParent)
                    {
                        part.POPartSplitAddress = _appContext.Address.Where(x => x.AddressId == part.POPartSplitAddressId).FirstOrDefault();
                    }
                });

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
                        DiscountPerUnit = x.DiscountPercent,
                        ExtendedCost = x.ExtendedCost,
                        UnitCost = x.UnitCost,
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
                            Owner = SL.Owner,
                            OwnerType = SL.OwnerType,
                            ObtainFrom = SL.ObtainFrom,
                            ObtainFromType = SL.ObtainFromType,
                            TraceableTo = SL.TraceableTo,
                            TraceableToType = SL.TraceableToType,
                            ManufacturingTrace = SL.ManufacturingTrace,
                            ManufacturerId = SL.ManufacturerId,
                            ManufacturerLotNumber = SL.ManufacturerLotNumber,
                            ManufacturingDate = SL.ManufacturingDate != null ? Convert.ToDateTime(SL.ManufacturingDate).ToShortDateString() : null,
                            AircraftTailNumber = SL.AircraftTailNumber,
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
                            GLAccountId = SL.GLAccountId,
                            ManagementStructureEntityId = SL.ManagementStructureEntityId,
                            SiteId = SL.SiteId,
                            WarehouseId = SL.WarehouseId,
                            LocationId = SL.LocationId,
                            ShelfId = SL.ShelfId,
                            BinId = SL.BinId
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
                        part.StockLine = part.StockLine.OrderBy(x => x.StockLineId).ToList();
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
                        DiscountPerUnit = x.DiscountPercent,
                        ExtendedCost = x.ExtendedCost,
                        UnitCost = x.UnitCost,
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
                            TraceableTo = SL.TraceableToType == 2 ? SL.TraceableTo : GetCustomerVendor(SL.TraceableTo, SL.TraceableToType)
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

                    var stockLines = _appContext.StockLine.Where(x => x.RepairOrderPartRecordId != null && x.RepairOrderPartRecordId == part.RepairOrderPartRecordId).ToList();
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

        private RepairOrderDto CreateRepairOrderPartDto(RepairOrder repairOrder)
        {
            var repairOrderDto = new RepairOrderDto();

            if (repairOrder != null)
            {
                /// Generate RepairOrder ///
                repairOrderDto.RepairOrderId = repairOrder.RepairOrderId;
                repairOrderDto.RepairOrderNumber = repairOrder.RepairOrderNumber;
                repairOrderDto.StatusId = repairOrder.StatusId;
                repairOrderDto.Status = repairOrder.StatusId == 1
                    ? "Open"
                    : (repairOrder.StatusId == 2 ? "Pending" : (repairOrder.StatusId == 3 ? "Fulfilling" : "Closed"));
                repairOrderDto.VendorName = repairOrder.VendorName;
                repairOrderDto.VendorCode = repairOrder.VendorCode;
                // Need to grab from Vendor.ContactList
                repairOrderDto.VendorContact = repairOrder.Vendor != null
                    ? repairOrder.Vendor.VendorName
                    : string.Empty;
                repairOrderDto.ContactPhone = repairOrder.VendorContactPhone;
                repairOrderDto.OpenDate = repairOrder.OpenDate;
                repairOrderDto.ClosedDate = repairOrder.ClosedDate;
                repairOrderDto.NeedByDate = repairOrder.NeedByDate;
                repairOrderDto.DateApproved = repairOrder.ApprovedDate;
                // TODO = Get from Employee table.
                repairOrderDto.Approver = string.Empty;
                repairOrderDto.CreditLimit = repairOrder.CreditLimit;
                repairOrderDto.Terms = repairOrder.Vendor?.CreditTerms != null
                    ? repairOrder.Vendor.CreditTerms.Name
                    : string.Empty;
                // TODO: Get from Priority table
                repairOrderDto.Priority = string.Empty;
                repairOrderDto.DeferredReceiver = repairOrder.DeferredReceiver;
                repairOrderDto.Resale = repairOrder.Resale;
                repairOrderDto.ManagementStructureId = repairOrder.ManagementStructureId;
                repairOrderDto.Memo = repairOrder.RoMemo;

                /// Fill RepairOrderPart ///
                if (repairOrder.RepairOrderPart != null && repairOrder.RepairOrderPart.Any())
                {
                    repairOrderDto.RepairOrderPart = new List<RepairOrderPartsDto>();
                    RepairOrderPartsDto repairOrderPartDto = null;
                    foreach (var roPart in repairOrder.RepairOrderPart)
                    {

                        if (roPart.IsParent == true)
                        {
                            repairOrderPartDto = new RepairOrderPartsDto();
                            // Fill RepairOrderPartsDto
                            repairOrderPartDto.RepairOrderId = roPart.RepairOrderId;
                            repairOrderPartDto.RepairOrderPartRecordId = roPart.RepairOrderPartRecordId;
                            repairOrderPartDto.ItemMasterId = roPart.ItemMasterId;
                            // TODO: Get IsActive
                            repairOrderPartDto.IsActive = false;
                            repairOrderPartDto.IsParent = roPart.IsParent;
                            repairOrderPartDto.PartNumber = roPart.ItemMaster != null
                                ? roPart.ItemMaster.PartNumber
                                : string.Empty;
                            repairOrderPartDto.PartDescription = roPart.ItemMaster != null
                                ? roPart.ItemMaster.PartDescription
                                : string.Empty;
                            repairOrderPartDto.QuantityOrdered = roPart.QuantityOrdered;
                            // TODO: WHERE TO GET THESE THREE?
                            repairOrderPartDto.QuantityReceived = 0;
                            repairOrderPartDto.QuantityBackOrdered = 0;
                            repairOrderPartDto.QuantityRejected = 0;
                            repairOrderPartDto.Status = roPart.StatusId == 1
                                ? "Open"
                                : (roPart.StatusId == 2 ? "Pending" : (roPart.StatusId == 3 ? "Fulfilling" : "Closed"));
                            repairOrderPartDto.IsSerialized = roPart.ItemMaster != null
                                ? roPart.ItemMaster.IsSerialized
                                : null;
                            repairOrderPartDto.IsTimeLife = roPart.ItemMaster != null
                                ? roPart.ItemMaster.IsSerialized
                                : null;
                            repairOrderPartDto.GlAccountId = roPart.GlAccountId;
                            repairOrderPartDto.ManagementStructureId = roPart.ManagementStructureId;
                            repairOrderPartDto.UnitCost = roPart.UnitCost;
                            repairOrderPartDto.ExtendedCost = roPart.ExtendedCost;
                            repairOrderPartDto.ManufacturerId = roPart.ManufacturerId;
                            // TODO: Get from Manufacturer table
                            repairOrderPartDto.ManufacturerName = string.Empty;
                            // TODO: Get from StockLine table
                            repairOrderPartDto.StockLineId = 0;
                            repairOrderPartDto.StockLineNumber = string.Empty;
                            // TODO: WHERE TO GET THIS?
                            repairOrderPartDto.ControlId = string.Empty;
                            repairOrderPartDto.ControlNumber = string.Empty;

                            repairOrderDto.RepairOrderPart.Add(repairOrderPartDto);
                        }
                        else
                        {
                            // Fill RepairOrderSplitPartsDto
                            var roSplitPartDto = new RepairOrderSplitPartsDto
                            {
                                ItemMasterId = roPart.ItemMasterId,
                                PartNumber = roPart.ItemMaster != null
                                    ? roPart.ItemMaster.PartNumber
                                    : string.Empty,
                                QuantityOrdered = roPart.QuantityOrdered,
                                // TODO: WHERE TO GET THESE THREE?
                                QuantityReceived = 0,
                                QuantityBackOrdered = 0,
                                QuantityRejected = 0,
                                Status = roPart.StatusId == 1
                                    ? "Open"
                                    : (roPart.StatusId == 2 ? "Pending" : (roPart.StatusId == 3 ? "Fulfilling" : "Closed")),
                                ManagementStructureId = roPart.ManagementStructureId,
                                // TODO: WHERE TO GET THESE"?
                                UserType = string.Empty,
                                UserName = string.Empty,
                                Address = string.Empty,
                                // TODO: Get from StockLine table
                                StockLineId = 0,
                                StockLineNumber = string.Empty,
                                // TODO: WHERE TO GET THIS?
                                ControlId = string.Empty,
                                ControlNumber = string.Empty,
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

        #endregion PRIVATE METHODS

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
