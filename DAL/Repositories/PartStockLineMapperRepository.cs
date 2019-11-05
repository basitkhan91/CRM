using DAL.Models;
using DAL.Repositories.Interfaces;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;

namespace DAL.Repositories
{
    public class PartStockLineMapperRepository : Repository<PartStockLineMapperRepository>, IPartStockLineMapper
    {
        public PartStockLineMapperRepository(ApplicationDbContext context) : base(context)
        {
        }

        public PurchaseOrder GetReceivingPurchaseOrderList(long id)
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

                return purchaseOrder;
            }
            catch (Exception ex)
            {
                throw new System.Exception("Error while loading data");
            }

        }

        public object GetReceivingPurchaseOrderEdit(long id)
        {
            try
            {
                var purchaseOrder = _appContext.PurchaseOrder
                                   .Include("Vendor")
                                   .Include("StockLine")
                                   .Where(x => x.PurchaseOrderId == id).FirstOrDefault();

                purchaseOrder.PurchaseOderPart = _appContext.PurchaseOrderPart
                                        .Where(x => x.PurchaseOrderId == id)
                                        .ToList();

                purchaseOrder.PurchaseOderPart.ToList().ForEach(part =>
                {
                    part.ItemMaster = _appContext.ItemMaster.Include("Manufacturer").Where(x => x.ItemMasterId == part.ItemMasterId).FirstOrDefault();//.Find(part.ItemMasterId);
                    if (part.StockLine != null && part.StockLine.Count > 0)
                    {
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
                    PurchaseOderPart = purchaseOrder.PurchaseOderPart.Select(x => new {
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
                            OwnerType = SL.OwnerType == 1 ? "Customer" : SL.OwnerType == 2 ? "Other" : SL.OwnerType == 3 ? "Vendor" : "",
                            ObtainFrom = SL.ObtainFrom,
                            ObtainFromType = SL.ObtainFromType == 1 ? "Customer" : SL.ObtainFromType == 2 ? "Other" : SL.ObtainFromType == 3 ? "Vendor" : "",
                            TraceableTo = SL.TraceableTo,
                            TraceableToType = SL.TraceableToType == 1 ? "Customer" : SL.TraceableToType == 2 ? "Other" : SL.TraceableToType == 3 ? "Vendor" : "",
                            ManufacturingTrace = SL.ManufacturingTrace,
                            ManufacturerId = SL.ManufacturerId,
                            ManufacturerLotNumber = SL.ManufacturerLotNumber,
                            ManufacturingDate = SL.ManufacturingDate != null ? Convert.ToDateTime(SL.ManufacturingDate).ToShortDateString() : null,
                            ManufacturingBatchNumber = SL.ManufacturingBatchNumber,
                            PartCertificationNumber = SL.PartCertificationNumber,
                            CertifiedDate = SL.CertifiedDate != null ? Convert.ToDateTime(SL.CertifiedDate).ToShortDateString(): null,
                            CertifiedBy = SL.CertifiedBy,
                            TagDate = SL.TagDate != null ? Convert.ToDateTime(SL.TagDate).ToShortDateString() : null,
                            ExpirationDate = SL.ExpirationDate != null ? Convert.ToDateTime(SL.ExpirationDate).ToShortDateString() : null,
                            CertifiedDueDate = SL.CertifiedDueDate != null ? Convert.ToDateTime(SL.CertifiedDueDate).ToShortDateString() : null,
                            GLAccountId  = SL.GLAccountId,
                            ManagementStructureEntityId = SL.ManagementStructureEntityId,
                            SiteId = SL.SiteId,
                            WarehouseId = SL.WarehouseId,
                            LocationId = SL.LocationId,
                            ShelfId = SL.ShelfId,
                            BinId = SL.BinId
                        })
                    })
                };
            }
            catch (Exception ex)
            {
                throw new System.Exception("Error while loading data");
            }

        }


        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
