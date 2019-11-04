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
                        DiscountPerUnit = x.DiscountPerUnit,
                        ExtendedCost = x.ExtendedCost,
                        UnitCost = x.UnitCost,
                        StockLine = x.StockLine == null ? null : x.StockLine.Select(part => new
                        {
                            StockLineNumber = part.StockLineNumber,
                            ControlNumber = part.ControlNumber,
                            IdNumber = part.IdNumber,
                            ConditionId = part.ConditionId,
                            SerialNumber = part.SerialNumber,
                            Quantity = part.Quantity,
                            PurchaseOrderUnitCost = part.PurchaseOrderUnitCost,
                            PurchaseOrderExtendedCost = part.PurchaseOrderExtendedCost,
                            ReceiverNumber = part.ReceiverNumber,
                            WorkOrder = 0,
                            SalesOrder = 0,
                            SubWorkOrder = 0,
                            Owner = part.Owner,
                            OwnerType = part.OwnerType == 1 ? "Customer" : part.OwnerType == 2 ? "Other" : part.OwnerType == 3 ? "Vendor" : "",
                            ObtainFrom = part.ObtainFrom,
                            ObtainFromType = part.ObtainFromType == 1 ? "Customer" : part.ObtainFromType == 2 ? "Other" : part.ObtainFromType == 3 ? "Vendor" : "",
                            TraceableTo = part.TraceableTo,
                            TraceableToType = part.TraceableToType == 1 ? "Customer" : part.TraceableToType == 2 ? "Other" : part.TraceableToType == 3 ? "Vendor" : "",
                            Trace = part.ManufacturingTrace,
                            ManufacturerId = part.ManufacturerId,
                            ManufacturerLotNumber = part.ManufacturerLotNumber,
                            ManufacturingDate = part.ManufacturingDate != null ? Convert.ToDateTime(part.ManufacturingDate).ToShortDateString() : null,
                            ManufacturingBatchNumber = part.ManufacturingBatchNumber,
                            PartCertificationNumber = part.PartCertificationNumber,
                            CertifiedDate = part.CertifiedDate != null ? Convert.ToDateTime( part.CertifiedDate).ToShortDateString(): null,
                            TaggedBy = part.TagType,
                            TagDate = part.TagDate,
                            TagExpiryDate = part.ExpirationDate,
                            CertifiedDueDate = part.CertifiedDueDate,
                            GLAccountId  = part.GLAccountId,
                            ManagementStructureId = part.ManagementStructureEntityId,
                            SiteId = part.SiteId,
                            WarehouseId = part.WarehouseId,
                            LocationId = part.LocationId,
                            ShelfId = part.ShelfId,
                            BinId = part.BinId
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
