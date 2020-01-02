using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class ReceivingCustomerWorkController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;
        public ReceivingCustomerWorkController(IUnitOfWork unitOfWork, ILogger<ReceivingCustomerWorkController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
            _logger = logger;
            _emailer = emailer;
        }

        [HttpGet("Get")]
        [Produces(typeof(List<ReceivingCustomerWorkViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.receivingCustomerWork.GetAllreceivingCustomerWork(); //GetAllSite Information
            return Ok(result);

            //var customerworkList = _context.ReceivingCustomerWork
            //    .Where(rcw => rcw.IsDeleted == false)
            //    .ToList();
            //return Ok(customerworkList);

        }

        [HttpGet("GetAudit")]
        [Produces(typeof(List<ReceivingCustomerWorkViewModel>))]
        public IActionResult GetAudit(long receivingCustomerWorkId)
        {
            var result = _unitOfWork.receivingCustomerWork.GetAllreceivingCustomerWorkAudit(receivingCustomerWorkId); //GetAllSite Information
            return Ok(result);


        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("ReceivingCustomerWork", id); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("receivingCustomerWork")]
        public IActionResult CreateAction([FromBody] ReceivingCustomerWorkViewModel receivingCustomerWorkViewModel)
        {
            if (ModelState.IsValid)
            {

                if (receivingCustomerWorkViewModel == null)
                {
                    return BadRequest($"{nameof(receivingCustomerWorkViewModel)} cannot be null");
                }


                if (_context.ReceivingCustomerWork.Any(o => o.ReceivingCustomerWorkId == receivingCustomerWorkViewModel.ReceivingCustomerWorkId))
                {
                    // UPDATE
                    var existingModel = GetReceivingCustomerWork(receivingCustomerWorkViewModel.ReceivingCustomerWorkId);
                    if (existingModel != null)
                    {
                        existingModel = FillReceivingCustomerWork(existingModel, receivingCustomerWorkViewModel);
                        existingModel.UpdatedDate = DateTime.Now;
                        _context.ReceivingCustomerWork.Update(existingModel);
                        _unitOfWork.SaveChanges();
                    }
                    return Ok(existingModel);
                }
                else
                {
                    // SAVE
                    var receivingCustomerWorkModel = new ReceivingCustomerWork();
                    receivingCustomerWorkModel = FillReceivingCustomerWork(receivingCustomerWorkModel, receivingCustomerWorkViewModel);
                    receivingCustomerWorkModel.CreatedDate = DateTime.Now;
                    _context.ReceivingCustomerWork.Add(receivingCustomerWorkModel);
                    _unitOfWork.SaveChanges();

                    if (receivingCustomerWorkModel.ReceivingCustomerWorkId != 0)
                    {
                        var exists = GetReceivingCustomerWork(receivingCustomerWorkModel.ReceivingCustomerWorkId);
                        if (exists != null)
                        {
                            exists.ReceivingCustomerNumber = "REC" + receivingCustomerWorkModel.ReceivingCustomerWorkId;
                            _context.ReceivingCustomerWork.Update(exists);
                            _context.SaveChanges();
                        }
                    }

                    return Ok(receivingCustomerWorkModel);
                }
            }

            return Ok(ModelState);
        }
        [HttpGet("receivingCustomerWorkById/{receivingCustomerWorkId}")]
        [Produces(typeof(List<ReceivingCustomerWorkViewModel>))]

        private IActionResult GetReceivingCustomerWorkById(long receivingCustomerWorkId)
        {
                 var result = _unitOfWork.receivingCustomerWork.GetreceivingCustomerWorkById(receivingCustomerWorkId); //GetAllSite Information
            return Ok(result);
        }
        private ReceivingCustomerWork GetReceivingCustomerWork(long ReceivingCustomerWorkId)
        {
            return _context.ReceivingCustomerWork
                          .Where(a => a.ReceivingCustomerWorkId == ReceivingCustomerWorkId)
                            .SingleOrDefault();

        }
        private ReceivingCustomerWork FillReceivingCustomerWork(ReceivingCustomerWork receivingCustomerWorkModel, ReceivingCustomerWorkViewModel receivingCustomerWorkViewModel)
        {
            receivingCustomerWorkModel.CustomerId = receivingCustomerWorkViewModel.CustomerId;
            receivingCustomerWorkModel.ReceivingCustomerNumber = receivingCustomerWorkViewModel.ReceivingCustomerNumber;
            receivingCustomerWorkModel.CustomerReference = receivingCustomerWorkViewModel.CustomerReference;
            receivingCustomerWorkModel.IsSerialized = receivingCustomerWorkViewModel.IsSerialized;
            receivingCustomerWorkModel.ItemMasterId = receivingCustomerWorkViewModel.ItemMasterId;
            receivingCustomerWorkModel.ContactId = receivingCustomerWorkViewModel.CustomerContactId;
            receivingCustomerWorkModel.TraceableToType = receivingCustomerWorkViewModel.TraceableToType;
            receivingCustomerWorkModel.ChangePartNumber = receivingCustomerWorkViewModel.ChangePartNumber;
            receivingCustomerWorkModel.PartCertificationNumber = receivingCustomerWorkViewModel.PartCertificationNumber;
            receivingCustomerWorkModel.Quantity = receivingCustomerWorkViewModel.Quantity;
            if (receivingCustomerWorkViewModel.ConditionId != 0)
                receivingCustomerWorkModel.ConditionId = receivingCustomerWorkViewModel.ConditionId;
            receivingCustomerWorkModel.SiteId = receivingCustomerWorkViewModel.SiteId;
            receivingCustomerWorkModel.BinId = receivingCustomerWorkViewModel.BinId;
            receivingCustomerWorkModel.ShelfId = receivingCustomerWorkViewModel.ShelfId;
            if(receivingCustomerWorkViewModel.WarehouseId !=0)
            receivingCustomerWorkModel.WarehouseId = receivingCustomerWorkViewModel.WarehouseId;
            if (receivingCustomerWorkViewModel.LocationId != 0)
                receivingCustomerWorkModel.LocationId = receivingCustomerWorkViewModel.LocationId;
            receivingCustomerWorkModel.ObtainFromType = receivingCustomerWorkViewModel.ObtainFromType;
            receivingCustomerWorkModel.PartDescription = receivingCustomerWorkViewModel.PartDescription;
            receivingCustomerWorkModel.Owner = receivingCustomerWorkViewModel.Owner;
            if(receivingCustomerWorkViewModel.OwnerType !=null)
            receivingCustomerWorkModel.OwnerType = Convert.ToInt16(receivingCustomerWorkViewModel.OwnerType);

            receivingCustomerWorkModel.IsCustomerStock = receivingCustomerWorkViewModel.IsCustomerStock;
            receivingCustomerWorkModel.ManufacturingDate = receivingCustomerWorkViewModel.ManufacturingDate;
            receivingCustomerWorkModel.ExpirationDate = receivingCustomerWorkViewModel.ExpirationDate;
            receivingCustomerWorkModel.TimeLifeDate = receivingCustomerWorkViewModel.TimeLifeDate;
            receivingCustomerWorkModel.TimeLifeOrigin = receivingCustomerWorkViewModel.TimeLifeOrigin;
            receivingCustomerWorkModel.TimeLifeCyclesId = receivingCustomerWorkViewModel.TimeLifeCyclesId;
            receivingCustomerWorkModel.ManufacturingTrace = receivingCustomerWorkViewModel.ManufacturingTrace;
            receivingCustomerWorkModel.ManufacturingLotNumber = receivingCustomerWorkViewModel.ManufacturingLotNumber;
            receivingCustomerWorkModel.EmployeeId = receivingCustomerWorkViewModel.EmployeeId;
            receivingCustomerWorkModel.SerialNumber = receivingCustomerWorkViewModel.SerialNumber;
            receivingCustomerWorkModel.CertifiedBy = receivingCustomerWorkViewModel.CertifiedBy;
            receivingCustomerWorkModel.TagDate = receivingCustomerWorkViewModel.TagDate;
            receivingCustomerWorkModel.TagType = receivingCustomerWorkViewModel.TagType;
            receivingCustomerWorkModel.TraceableTo = receivingCustomerWorkViewModel.TraceableTo;
            receivingCustomerWorkModel.ObtainFrom = receivingCustomerWorkViewModel.ObtainFrom;
            receivingCustomerWorkModel.IsTimeLife = receivingCustomerWorkViewModel.IsTimeLife;
            receivingCustomerWorkModel.IsMFGDate = receivingCustomerWorkViewModel.IsMFGDate;
            receivingCustomerWorkModel.ManufacturerId = receivingCustomerWorkViewModel.ManufacturerId;
            receivingCustomerWorkModel.IsActive = receivingCustomerWorkViewModel.IsActive;
            receivingCustomerWorkModel.IsDeleted = receivingCustomerWorkViewModel.IsDeleted;
            receivingCustomerWorkModel.IsExpirationDate = receivingCustomerWorkViewModel.IsExpirationDate;
            receivingCustomerWorkModel.PartNumber = receivingCustomerWorkViewModel.PartNumber;
            receivingCustomerWorkModel.ManagementStructureId = receivingCustomerWorkViewModel.ManagementStructureId;
            receivingCustomerWorkModel.CreatedBy = receivingCustomerWorkViewModel.CreatedBy;
            receivingCustomerWorkModel.UpdatedBy = receivingCustomerWorkViewModel.UpdatedBy;
            receivingCustomerWorkModel.ReasonForRemoval = receivingCustomerWorkViewModel.ReasonForRemoval;
            receivingCustomerWorkModel.UpdatedDate = DateTime.Now;
            receivingCustomerWorkModel.CreatedDate = DateTime.Now;
            receivingCustomerWorkModel.MasterCompanyId = 1;
            //receivingCustomerWorkModel.OwnerType= receivingCustomerWorkViewModel.
                 //receivingCustomerWorkModel.wo = receivingCustomerWorkViewModel.

            //receivingCustomerWorkModel.MasterCompanyId = receivingCustomerWorkViewModel.MasterCompanyId;
            receivingCustomerWorkModel.Manufacturer = receivingCustomerWorkViewModel.Manufacturer;

            return receivingCustomerWorkModel;
        }

        [HttpGet("timeLifeGetById/{id}")]
        [Produces(typeof(List<TimeLifeViewModel>))]
        public IActionResult GetTimeLife(long id)
        {
            try
            {
                var result = _unitOfWork.receivingCustomerWork.GetAllTimeLifeData(id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut("UpdatereceivingCustomerWork")]
        public IActionResult updatereceivingcustomer([FromBody] ReceivingCustomerWork rcwork)
        {
            if (ModelState.IsValid)
                rcwork.MasterCompanyId = 1;
            rcwork.UpdatedDate = DateTime.Now;
            _unitOfWork.Repository<ReceivingCustomerWork>().Update(rcwork);
            _unitOfWork.SaveChanges();
            return Ok();
        }


        [HttpPost("PostTimeLine")]
        public IActionResult Timesaveadjustment([FromBody] TimeLifeViewModel timeLifeViewModel)
        {
            if (ModelState.IsValid)
            {
                if (timeLifeViewModel == null)
                    return BadRequest($"{nameof(timeLifeViewModel)} cannot be null");
                DAL.Models.TimeLife actionobject = new DAL.Models.TimeLife();

                timeLifeViewModel.MasterCompanyId = 1;


                actionobject.CyclesSinceNew = timeLifeViewModel.CyclesSinceNew;
                actionobject.CyclesSinceOVH = timeLifeViewModel.CyclesSinceOVH;
                actionobject.CyclesRemaining = timeLifeViewModel.CyclesRemaining;
                actionobject.CyclesSinceRepair = timeLifeViewModel.CyclesSinceRepair;
                actionobject.CyclesSinceInspection = timeLifeViewModel.CyclesSinceInspection;
                actionobject.TimeRemaining = timeLifeViewModel.TimeRemaining;
                actionobject.TimeSinceNew = timeLifeViewModel.TimeSinceNew;
                actionobject.TimeSinceOVH = timeLifeViewModel.TimeSinceOVH;
                actionobject.TimeSinceRepair = timeLifeViewModel.TimeSinceRepair;
                actionobject.TimeSinceInspection = timeLifeViewModel.TimeSinceInspection;

                actionobject.LastSinceNew = timeLifeViewModel.LastSinceNew;
                actionobject.LastSinceOVH = timeLifeViewModel.LastSinceOVH;
                actionobject.LastSinceInspection = timeLifeViewModel.LastSinceInspection;
                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                actionobject.CreatedBy = timeLifeViewModel.CreatedBy;
                actionobject.UpdatedBy = timeLifeViewModel.UpdatedBy;
                actionobject.IsActive = true;
                actionobject.MasterCompanyId = 1;
                actionobject.PurchaseOrderId = timeLifeViewModel.PurchaseOrderId;
                actionobject.PurchaseOrderPartRecordId = timeLifeViewModel.PurchaseOrderPartRecordId;
                actionobject.RepairOrderId = timeLifeViewModel.RepairOrderPartRecordId;
                actionobject.StockLineId = timeLifeViewModel.StockLineId;
                actionobject.DetailsNotProvided = timeLifeViewModel.DetailsNotProvided;



                _context.TimeLife.Add(actionobject);
                _context.SaveChanges();
                return Ok(actionobject);
            }

            return Ok(ModelState);
        }



        //[HttpDelete("deletereceivingCustomerWork/{id}")]
        //[Produces(typeof(ReceivingCustomerWorkViewModel))]
        //public IActionResult DeleteAction(long id)
        //{
        //    var existingResult = _unitOfWork.receivingCustomerWork.GetSingleOrDefault(c => c.ReceivingCustomerWorkId == id);
        //    _unitOfWork.receivingCustomerWork.Remove(existingResult);
        //    _unitOfWork.SaveChanges();

        //    return Ok(id);
        //}

        [HttpGet("deletereceivingCustomerWork")]
        public IActionResult DeleteReceivingCustomer(long id, string updatedBy)
        {
            _unitOfWork.receivingCustomerWork.DeleteReceivingCustomer(id, updatedBy);
            return Ok();
        }
        [HttpPut("updateForActive/{id}")]
        public IActionResult customersUpdateforActive(long id, [FromBody]ReceivingCustomerWork receivingCustomerWork)
        {
            if (ModelState.IsValid)
            {
                var customerWork = _unitOfWork.receivingCustomerWork.GetSingleOrDefault(a => a.ReceivingCustomerWorkId == id);
                receivingCustomerWork.MasterCompanyId = 1;
                customerWork.IsActive = receivingCustomerWork.IsActive;
                customerWork.UpdatedDate = DateTime.Now;
                customerWork.UpdatedBy = receivingCustomerWork.UpdatedBy;
                customerWork.ReceivingCustomerWorkId = receivingCustomerWork.ReceivingCustomerWorkId;
                _unitOfWork.receivingCustomerWork.Update(customerWork);
                _unitOfWork.SaveChanges();
                return Ok(customerWork);
            }

            return Ok(ModelState);
        }


        [HttpPut("timeLifeUpdate")]
        public IActionResult UpdateTimeLifeIfExist([FromBody] TimeLife timelife)
        {
            if (ModelState.IsValid)
                timelife.UpdatedDate = DateTime.Now;
            timelife.MasterCompanyId = 1;
                _unitOfWork.Repository<TimeLife>().Update(timelife);
            _unitOfWork.SaveChanges();
            return Ok();
        }

    }

}
