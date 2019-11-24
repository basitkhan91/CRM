using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using QuickApp.Pro.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro
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
                    var purchaseOrderId = 0L;
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

                            var lastIdNumber = unitOfWork.purchaseOrder.GetLastIdNumber(stockLine.PurchaseOrderId.Value, stockLine.PurchaseOrderPartRecordId.Value);
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

                        var purchaseOrderPart = unitOfWork.Repository<PurchaseOrderPart>().Get(receivePart.PurchaseOrderPartRecordId);

                        if (purchaseOrderPart.QuantityBackOrdered > 0)
                        {
                            purchaseOrderPart.QuantityBackOrdered = (short?)(purchaseOrderPart.QuantityBackOrdered - quantity);
                        }
                        else
                        {
                            purchaseOrderPart.QuantityBackOrdered = (short?)(purchaseOrderPart.QuantityOrdered - quantity);
                        }

                        unitOfWork.Repository<PurchaseOrderPart>().Update(purchaseOrderPart);

                        unitOfWork.Repository<StockLine>().AddRange(receivePart.StockLines);

                        unitOfWork.SaveChanges();

                        var stockLineIndex = 0;
                        foreach (var timeLife in receivePart.TimeLife)
                        {
                            if (receivePart.StockLines.Count == 1)
                            {
                                timeLife.StockLineId = (receivePart.StockLines.Where(x => x.PurchaseOrderPartRecordId == timeLife.PurchaseOrderPartRecordId))
                                .ToArray()[0].StockLineId;
                            }
                            else
                            {
                                timeLife.StockLineId = (receivePart.StockLines.Where(x => x.PurchaseOrderPartRecordId == timeLife.PurchaseOrderPartRecordId))
                                .ToArray()[stockLineIndex].StockLineId;
                            }

                            timeLife.CreatedDate = DateTime.UtcNow;
                            timeLife.UpdatedDate = DateTime.UtcNow;
                            timeLife.MasterCompanyId = 1;
                            timeLife.IsActive = true;

                            stockLineIndex++;
                        }

                        unitOfWork.Repository<TimeLife>().AddRange(receivePart.TimeLife);

                        purchaseOrderId = (long)receivePart.StockLines.FirstOrDefault().PurchaseOrderId;

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

                    setPurchaseOrderStatus(purchaseOrderId);
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


    }
}
