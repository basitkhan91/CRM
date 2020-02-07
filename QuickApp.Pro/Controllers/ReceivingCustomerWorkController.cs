using AutoMapper;
using DAL;
using DAL.Common;
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

        [HttpPost("List")]
        public IActionResult GetList([FromBody] Filters<ReceivingCustomerWorkFilter> customerFilters)
        {
            var result = _unitOfWork.receivingCustomerWork.GetList(customerFilters);
            return Ok(result);

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
        public IActionResult CreateReceivingCustomer([FromBody] ReceivingCustomerWork receivingCustomerWork)
        {
            if (ModelState.IsValid)
            {
                var result=_unitOfWork.receivingCustomerWork.CreateReceivingCustomer(receivingCustomerWork);
                return Ok(result);
            }

            return Ok(ModelState);
        }


        [HttpGet("receivingCustomerWorkById/{receivingCustomerWorkId}")]
        [Produces(typeof(List<ReceivingCustomerWorkViewModel>))]
        public IActionResult GetReceivingCustomerWorkById(long receivingCustomerWorkId)
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
            {
                var result = _unitOfWork.receivingCustomerWork.UpdateReceivingCustomer(rcwork);
                return Ok(result);
            }

            return Ok(ModelState);

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
        [HttpGet("updateForActive")]
        public IActionResult customersUpdateforActive(long id, bool status, string updatedBy)
        {
            if (ModelState.IsValid)
            {
                var customerWork = _unitOfWork.receivingCustomerWork.GetSingleOrDefault(a => a.ReceivingCustomerWorkId == id);
                customerWork.IsActive = status;
                customerWork.UpdatedDate = DateTime.Now;
                customerWork.UpdatedBy = updatedBy;
                customerWork.ReceivingCustomerWorkId = id;
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

        [HttpGet("ReceivingCustomerByIdForWorkOrder")]
        [Produces(typeof(List<ReceivingCustomerWorkViewModel>))]

        public IActionResult GetReceivingCustomerWorkData(long id)
        {
            var result = _unitOfWork.receivingCustomerWork.GetReceivingCustomerWorkData(id); //GetAllSite Information
            return Ok(result);
        }


        [HttpGet("ListGlobalSearch")]

        public IActionResult GetListGlobalFilter(string value, int pageNumber, int pageSize)
        {
            var result = _unitOfWork.receivingCustomerWork.GetListGlobalFilter(value, pageNumber, pageSize);
            return Ok(result);
        }

        [HttpGet("receivecustomerpartdetails")]
        public IActionResult GetPartDettails(long itemMasterId)
        {
            var result = _unitOfWork.receivingCustomerWork.GetPartDettails(itemMasterId);
            return Ok(result);
        }

        [HttpGet("getreceivingcustomerslist")]
        public IActionResult ReceivingCustomers(string value)
        {
            var result = _unitOfWork.receivingCustomerWork.ReceivingCustomers(value);
            return Ok(result);
        }

        [HttpGet("receivingcustomerreference")]
        public IActionResult GetReceivingCustomerReference(long customerId)
        {
            var result = _unitOfWork.receivingCustomerWork.GetReceivingCustomerReference(customerId);
            return Ok(result);
        }
    }

}
