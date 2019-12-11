using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{

    [Route("api/receivingPart")]
    public class ReceivingPartController : Controller
    {

        #region Private Members

        private IUnitOfWork unitOfWork;
        private string UserName
        {
            get { return "admin"; }
        }

        #endregion Private Members

        #region Constructor

        public ReceivingPartController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            var assets = unitOfWork.Repository<AssetDepConventionType>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.AssetDepConventionId);
            return Ok(assets);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getItemMasterDataById(long id)
        {
            var itemMasterData = unitOfWork.Repository<ItemMaster>().Find(x => x.ItemMasterId == id && x.IsDeleted != true);
            return Ok(itemMasterData);
        }

        [HttpPost("add")]
        public IActionResult addAssetDep([FromBody]AssetDepConventionType assetDep)
        {
            if (assetDep != null)
            {
                if (ModelState.IsValid)
                {
                    assetDep.IsActive = true;
                    assetDep.MasterCompanyId = 1;
                    unitOfWork.Repository<AssetDepConventionType>().Add(assetDep);
                    unitOfWork.SaveChanges();
                    return Ok(assetDep);
                }
                else
                {
                    return BadRequest(ModelState);
                }

            }
            else
            {
                return BadRequest();
            }

        }

        [HttpPost("update")]
        public IActionResult updateAssetDep([FromBody]AssetDepConventionType assetDep)
        {
            if (assetDep != null)
            {
                if (ModelState.IsValid)
                {
                    unitOfWork.Repository<AssetDepConventionType>().Update(assetDep);
                    unitOfWork.SaveChanges();
                    return Ok(assetDep);
                }
                else
                {
                    return BadRequest(ModelState);
                }

            }
            else
            {
                return BadRequest();
            }

        }

        [HttpGet("removeById/{id}")]
        public IActionResult removeAssetDepById(long id)
        {
            var assetDep = unitOfWork.Repository<AssetDepConventionType>().Find(x => x.AssetDepConventionTypeId == id).FirstOrDefault();
            if (assetDep != null)
            {
                assetDep.IsDelete = true;
                unitOfWork.Repository<AssetDepConventionType>().Update(assetDep);
                unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("addStocklineMapperData")]
        public IActionResult addStocklineMapperData([FromBody]PartStockLineMapper stocklineMapper)
        {
            if (stocklineMapper != null)
            {
                if (ModelState.IsValid)
                {
                    unitOfWork.Repository<PartStockLineMapper>().Add(stocklineMapper);
                    unitOfWork.SaveChanges();
                    return Ok(stocklineMapper);
                }
                else
                {
                    return BadRequest(ModelState);
                }

            }
            else
            {
                return BadRequest();
            }

        }

        [HttpGet("GetReceivingPurchaseList/{receivingId}")]
        public IActionResult GetReceivingPurchaseOrderListById(long receivingId)
        {
            try
            {
                var receivingData = unitOfWork.PartStockLineMapper.GetReceivingPurchaseOrderList(receivingId);
                return Ok(receivingData);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }

        [HttpGet("getReceivingRepairList/{receivingId}")]
        [Produces(typeof(List<RepairOrderViewModel>))]
        public IActionResult GetReceivingRepairOrderList(long receivingId)
        {
            try
            {
                var receivingData = unitOfWork.PartStockLineMapper.GetReceivingRepairOrderList(receivingId);
                return Ok(receivingData);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }

        [HttpGet("GetReceivingPurchaseForEdit/{receivingId}")]
        public IActionResult GetReceivingPurchaseOrderForEditById(long receivingId)
        {
            try
            {
                var receivingData = unitOfWork.PartStockLineMapper.GetReceivingPurchaseOrderEdit(receivingId);
                return Ok(receivingData);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }

        [HttpGet("GetReceivingPurchaseForView/{receivingId}")]
        public IActionResult GetReceivingPurchaseOrderForViewId(long receivingId)
        {
            try
            {
                var receivingData = unitOfWork.PartStockLineMapper.GetReceivingPurchaseOrderView(receivingId);
                return Ok(receivingData);
            }
            catch (Exception)
            {
                return BadRequest();
            }

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

                        foreach (var timeLife in receivePart.TimeLife)
                        {
                            timeLife.PurchaseOrder = null;
                        }

                        if (receivePart.TimeLife != null && receivePart.TimeLife.Count > 0)
                        {
                            unitOfWork.Repository<TimeLife>().UpdateRange(receivePart.TimeLife);
                        }

                        foreach (var dbStockLine in stockLines)
                        {
                            var stockLine = receivePart.StockLines.Where(x => x.StockLineId == dbStockLine.StockLineId).FirstOrDefault();
                            dbStockLine.ManagementStructureEntityId = stockLine.ManagementStructureEntityId;
                            dbStockLine.SiteId = stockLine.SiteId != null ? stockLine.SiteId : 0;
                            dbStockLine.WarehouseId = stockLine.WarehouseId != null ? stockLine.WarehouseId : 0;
                            dbStockLine.LocationId = stockLine.LocationId != null ? stockLine.LocationId : 0;
                            dbStockLine.ShelfId = stockLine.ShelfId != null ? stockLine.ShelfId : 0;
                            dbStockLine.BinId = stockLine.BinId != null ? stockLine.BinId : 0;
                            dbStockLine.PurchaseOrderUnitCost = stockLine.PurchaseOrderUnitCost;
                            dbStockLine.PurchaseOrderExtendedCost = stockLine.PurchaseOrderExtendedCost;
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
                            dbStockLine.Owner = stockLine.Owner;
                            dbStockLine.ObtainFromType = stockLine.ObtainFromType;
                            dbStockLine.ObtainFrom = stockLine.ObtainFrom;
                            dbStockLine.TraceableToType = stockLine.TraceableToType;
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


        [HttpGet("getPurchaseOrderHeaderById/{purchaseOrderId}")]
        public IActionResult GetPurchaseOrderHeaderById(long purchaseOrderId)
        {
            var repairOrderHeader = unitOfWork.PartStockLineMapper.GetPurchaseOrderHeader(purchaseOrderId);
            return Ok(repairOrderHeader);
        }

        [HttpGet("GetReceivePOPartsForSummary/{purchaseOrderId}")]
        public IActionResult GetReceivingPurchaseOrderForSummary(long purchaseOrderId)
        {
            var parts = unitOfWork.PartStockLineMapper.GetPurchaseOrderPartsForSummary(purchaseOrderId);
            return Ok(parts);
        }


        #endregion Public Methods

        #region Private Methods

        private void setPurchaseOrderStatus(long purchaseOrderId)
        {
            var filteredParts = new List<PurchaseOrderPart>();

            var parts = unitOfWork.Repository<PurchaseOrderPart>().Find(x => x.PurchaseOrderId == purchaseOrderId);

            foreach (var part in parts)
            {
                if (parts.Count(x => x.ItemMasterId == part.ItemMasterId) > 1)
                {
                    var splitParts = unitOfWork.Repository<PurchaseOrderPart>().Find(x => x.isParent == false && x.ItemMasterId == part.ItemMasterId);
                    if (!filteredParts.Any(x => x.ItemMasterId == part.ItemMasterId))
                        filteredParts.AddRange(splitParts);
                }
                else {
                    filteredParts.Add(part);
                }
            }

            var isPOReceived = true;
            foreach (var part in filteredParts)
            {
                part.StockLine = unitOfWork.Repository<StockLine>().Find(x => x.PurchaseOrderPartRecordId == part.PurchaseOrderPartRecordId).ToList();
                if (part.QuantityOrdered != (short?)(part.StockLine.Sum(x => x.Quantity)))
                {
                    isPOReceived = false;
                    break;
                }
            }
            var purchaseOrder = unitOfWork.Repository<PurchaseOrder>().Get(purchaseOrderId);
            if (isPOReceived)
            {
                purchaseOrder.StatusId = (short)PurchaseOrderStatus.Closed;
                unitOfWork.Repository<PurchaseOrder>().Update(purchaseOrder);
                unitOfWork.SaveChanges();
            }
            else
            {
                if (purchaseOrder.StatusId == (short)PurchaseOrderStatus.Pending)
                {
                    purchaseOrder.StatusId = (short)PurchaseOrderStatus.Fulfilling;
                    unitOfWork.Repository<PurchaseOrder>().Update(purchaseOrder);
                    unitOfWork.SaveChanges();
                }
            }
        }

        #endregion Private Methods
    }
}