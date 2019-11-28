using DAL;
using System;
using DAL.Models;
using System.Linq;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace QuickApp.Pro.Controllers
{

    [Route("api/receivingRO")]
    public class ReceiveROController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;
        private string UserName
        {
            get { return "admin"; }
        }

        #endregion Private Members

        #region Constructor

        public ReceiveROController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Members

        [HttpGet("getRepairOrderHeaderById/{repairOrderId}")]
        public IActionResult GetRepairOrderHeaderById(long repairOrderId)
        {
            var repairOrderHeader = unitOfWork.ReceiveRepairOrder.GetRepairOrderHeader(repairOrderId);
            return Ok(repairOrderHeader);
        }

        [HttpGet("getRepairOrderPartById/{repairOrderId}")]
        public IActionResult GetRepairOrderPartById(long repairOrderId)
        {
            var repairOrderParts = unitOfWork.ReceiveRepairOrder.GetRepairOrderPartsByRepairOrderId(repairOrderId);
            return Ok(repairOrderParts);
        }

        [HttpPost("receiveParts")]
        public IActionResult ReceiveParts([FromBody] List<ReceiveParts> receiveParts)
        {
            try
            {
                if (receiveParts != null)
                {
                    var repairOrderId = 0L;
                    foreach (var receivePart in receiveParts)
                    {
                        var index = 0;
                        var quantity = 0;
                        foreach (var stockLine in receivePart.StockLines)
                        {
                            stockLine.ShelfId = stockLine.ShelfId > 0 ? stockLine.ShelfId : null;
                            stockLine.WarehouseId = stockLine.WarehouseId > 0 ? stockLine.WarehouseId : null;
                            stockLine.BinId = stockLine.BinId > 0 ? stockLine.BinId : null;
                            stockLine.RepairOrderId = stockLine.RepairOrderId > 0 ? stockLine.RepairOrderId : null;
                            stockLine.LocationId = stockLine.LocationId > 0 ? stockLine.LocationId : null;
                            stockLine.ReceivedDate = DateTime.Now;
                            stockLine.CreatedBy = UserName;
                            stockLine.UpdatedBy = UserName;
                            stockLine.CreatedDate = DateTime.Now;
                            stockLine.UpdatedDate = DateTime.Now;

                            var lastIdNumber = unitOfWork.ReceiveRepairOrder.GetLastIdNumber(stockLine.RepairOrderId.Value, stockLine.RepairOrderPartRecordId.Value);
                            stockLine.IdNumber = (lastIdNumber + 1).ToString();

                            if (!string.IsNullOrEmpty(stockLine.SerialNumber))
                            {
                                var isSerialExist = unitOfWork.Repository<StockLine>().Find(x => x.ItemMasterId == stockLine.ItemMasterId && x.ManufacturerId == stockLine.ManufacturerId && x.SerialNumber == stockLine.SerialNumber).FirstOrDefault();
                                if (isSerialExist != null)
                                {
                                    return BadRequest(new Exception("Serial Number - " + stockLine.SerialNumber + " at page - " + (index + 1) + " already exists."));
                                }
                            }
                            quantity = (int)stockLine.Quantity;
                            index++;
                        }

                        //var repairOrderPart = unitOfWork.Repository<RepairOrderPart>().Get(receivePart.RepairOrderPartRecordId);

                        //if (repairOrderPart.QuantityBackOrdered > 0)
                        //{
                        //    repairOrderPart.QuantityBackOrdered = (short?)(repairOrderPart.QuantityBackOrdered - quantity);
                        //}
                        //else
                        //{
                        //    repairOrderPart.QuantityBackOrdered = (short?)(repairOrderPart.QuantityOrdered - quantity);
                        //}

                        //unitOfWork.Repository<PurchaseOrderPart>().Update(purchaseOrderPart);

                        unitOfWork.Repository<StockLine>().AddRange(receivePart.StockLines);

                        unitOfWork.SaveChanges();

                        var stockLineIndex = 0;
                        foreach (var timeLife in receivePart.TimeLife)
                        {
                            if (receivePart.StockLines.Count == 1)
                            {
                                timeLife.StockLineId = (receivePart.StockLines.Where(x => x.RepairOrderPartRecordId == timeLife.RepairOrderPartRecordId))
                                .ToArray()[0].StockLineId;
                            }
                            else
                            {
                                timeLife.StockLineId = (receivePart.StockLines.Where(x => x.RepairOrderPartRecordId == timeLife.RepairOrderPartRecordId))
                                .ToArray()[stockLineIndex].StockLineId;
                            }

                            timeLife.CreatedDate = DateTime.UtcNow;
                            timeLife.UpdatedDate = DateTime.UtcNow;
                            timeLife.MasterCompanyId = 1;
                            timeLife.IsActive = true;

                            stockLineIndex++;
                        }

                        unitOfWork.Repository<TimeLife>().AddRange(receivePart.TimeLife);

                        repairOrderId = (long)receivePart.StockLines.FirstOrDefault().RepairOrderId;

                    }

                    foreach (var receivePart in receiveParts)
                    {
                        foreach (var stockLine in receivePart.StockLines)
                        {
                            stockLine.StockLineNumber = "STL-" + stockLine.StockLineId.ToString();
                            stockLine.ControlNumber = "CNT-" + stockLine.StockLineId.ToString();
                            unitOfWork.Repository<StockLine>().Update(stockLine);
                        }
                    }
                    unitOfWork.SaveChanges();

                    setRepairOrderStatus(repairOrderId);
                }
                else
                {
                    return BadRequest("Unable to find any data to save. Please contact administrator");
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetReceieveROPartsForView/{repairOrderId}")]
        public IActionResult GetReceivingPurchaseOrderForView(long repairOrderId)
        {
            try
            {
                var parts = unitOfWork.ReceiveRepairOrder.GetReceivingRepairOrderForView(repairOrderId);
                return Ok(parts);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }

        [HttpGet("GetReceieveROPartsForEdit/{repairOrderId}")]
        public IActionResult GetReceieveROPartsForEdit(long repairOrderId) {
            var parts = unitOfWork.ReceiveRepairOrder.GetReceivingRepairOrderForEdit(repairOrderId);
            return Ok(parts);
        }

        [HttpPost("UpdateStockLines")]
        public IActionResult UpdateStockLines([FromBody] List<ReceiveParts> receiveParts)
        {
            try
            {
                if (receiveParts != null)
                {
                    foreach (var receivePart in receiveParts)
                    {
                        var stockLineIds = receivePart.StockLines.Select(s => s.StockLineId).ToArray();
                        var stockLines = unitOfWork.stockLineList.getStockLinesByIds(stockLineIds);

                        if (receivePart.TimeLife != null && receivePart.TimeLife.Count > 0)
                        {
                            unitOfWork.Repository<TimeLife>().UpdateRange(receivePart.TimeLife);
                        }

                        foreach (var dbStockLine in stockLines)
                        {
                            var stockLine = receivePart.StockLines.Where(x => x.StockLineId == dbStockLine.StockLineId).FirstOrDefault();
                            dbStockLine.ManagementStructureEntityId = stockLine.ManagementStructureEntityId;
                            dbStockLine.ShelfId = stockLine.ShelfId > 0 ? stockLine.ShelfId : null;
                            dbStockLine.WarehouseId = stockLine.WarehouseId > 0 ? stockLine.WarehouseId : null;
                            dbStockLine.BinId = stockLine.BinId > 0 ? stockLine.BinId : null;
                            dbStockLine.RepairOrderUnitCost = stockLine.RepairOrderUnitCost;
                            dbStockLine.RepairOrderExtendedCost = stockLine.RepairOrderExtendedCost;
                            dbStockLine.LocationId = stockLine.LocationId > 0 ? stockLine.LocationId : null;
                            dbStockLine.ConditionId = stockLine.ConditionId > 0 ? stockLine.ConditionId : null;
                            dbStockLine.ManufacturingTrace = stockLine.ManufacturingTrace;
                            dbStockLine.ManufacturerLotNumber = stockLine.ManufacturerLotNumber;
                            dbStockLine.ManufacturingDate = stockLine.ManufacturingDate;
                            dbStockLine.ManufacturingBatchNumber = stockLine.ManufacturingBatchNumber;
                            dbStockLine.PartCertificationNumber = stockLine.PartCertificationNumber;
                            dbStockLine.EngineSerialNumber = stockLine.EngineSerialNumber;
                            dbStockLine.ShippingViaId = stockLine.ShippingViaId;
                            dbStockLine.ShippingReference = stockLine.ShippingReference;
                            dbStockLine.ShippingAccount = stockLine.ShippingAccount;
                            dbStockLine.CertifiedDate = stockLine.CertifiedDate;
                            dbStockLine.CertifiedBy = stockLine.CertifiedBy;
                            dbStockLine.TagDate = stockLine.TagDate;
                            dbStockLine.ExpirationDate = stockLine.ExpirationDate;
                            dbStockLine.CertifiedDueDate = stockLine.CertifiedDueDate;
                            dbStockLine.UpdatedBy = UserName;
                            dbStockLine.OwnerType = stockLine.OwnerType;
                            dbStockLine.ObtainFromType = stockLine.ObtainFromType;
                            dbStockLine.TraceableToType = stockLine.TraceableToType;
                            dbStockLine.Owner = stockLine.Owner;
                            dbStockLine.ObtainFrom = stockLine.ObtainFrom;
                            dbStockLine.TraceableTo = stockLine.TraceableTo;
                            dbStockLine.UpdatedDate = DateTime.Now;
                            receivePart.StockLines.Remove(stockLine);
                            unitOfWork.Repository<StockLine>().Update(dbStockLine);
                        }
                    }

                    unitOfWork.SaveChanges();
                }
                else
                {
                    return BadRequest("Unable to find any data to save. Please contact administrator");
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        #endregion Public Members

        #region Private Methods

        private void setRepairOrderStatus(long repairOrderId)
        {
            var parts = unitOfWork.Repository<RepairOrderPart>().Find(x => x.RepairOrderId == repairOrderId);
            var isPOReceived = true;
            foreach (var part in parts)
            {
                part.StockLine = unitOfWork.Repository<StockLine>().Find(x => x.RepairOrderPartRecordId == part.RepairOrderPartRecordId).ToList();
                if (part.QuantityOrdered != (short?)(part.StockLine.Sum(x => x.Quantity)))
                {
                    isPOReceived = false;
                    break;
                }
            }
            var repairOrder = unitOfWork.Repository<RepairOrder>().Get(repairOrderId);
            if (isPOReceived)
            {
                repairOrder.StatusId = (short)PurchaseOrderStatus.Closed;
                unitOfWork.Repository<RepairOrder>().Update(repairOrder);
                unitOfWork.SaveChanges();
            }
            else
            {
                if (repairOrder.StatusId == (short)PurchaseOrderStatus.Pending)
                {
                    repairOrder.StatusId = (short)PurchaseOrderStatus.Fulfilling;
                    unitOfWork.Repository<RepairOrder>().Update(repairOrder);
                    unitOfWork.SaveChanges();
                }
            }
        }


        #endregion Private Methods


    }
}
