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
using System.Threading.Tasks;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class ReceivingCustomerWorkController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private readonly ApplicationDbContext _context;
        //private IUnitOfWork UnitOfWork;
        public ReceivingCustomerWorkController(IUnitOfWork unitOfWork, ILogger<ReceivingCustomerWorkController> logger, IEmailer emailer, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values

        [HttpGet("Get")]
        [Produces(typeof(List<ReceivingCustomerWorkViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.receivingCustomerWork.GetAllreceivingCustomerWork(); //GetAllSite Information
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

                throw;
            }
        }


        [HttpPost("receivingCustomerWork")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] ReceivingCustomerWorkViewModel receivingCustomerWorkViewModel)
        {
            if (ModelState.IsValid)
            {
                if (receivingCustomerWorkViewModel == null)
                    return BadRequest($"{nameof(receivingCustomerWorkViewModel)} cannot be null");
                DAL.Models.ReceivingCustomerWork curreobj = new DAL.Models.ReceivingCustomerWork();
                curreobj.MasterCompanyId = 1;
                curreobj.CustomerId = receivingCustomerWorkViewModel.CustomerId;
                curreobj.ObtainFromType = receivingCustomerWorkViewModel.ObtainFromType;
                curreobj.PartDescription = receivingCustomerWorkViewModel.PartDescription;
                curreobj.EmployeeId = receivingCustomerWorkViewModel.EmployeeId;
                curreobj.Quantity = receivingCustomerWorkViewModel.Quantity;
                curreobj.WorkPhone = receivingCustomerWorkViewModel.WorkPhone;
                curreobj.CustomerReference = receivingCustomerWorkViewModel.CustomerReference;
                curreobj.ContactId = receivingCustomerWorkViewModel.ContactId;
                curreobj.TraceableToType = receivingCustomerWorkViewModel.TraceableToType;
                curreobj.TraceableTo = receivingCustomerWorkViewModel.TraceableTo;
                curreobj.ChangePartNumber = receivingCustomerWorkViewModel.ChangePartNumber;
                curreobj.PartCertificationNumber = receivingCustomerWorkViewModel.PartCertificationNumber;
                curreobj.IsSerialized = receivingCustomerWorkViewModel.IsSerialized;
                curreobj.SerialNumber = receivingCustomerWorkViewModel.SerialNumber;
                curreobj.ConditionId = receivingCustomerWorkViewModel.ConditionId;
                curreobj.WarehouseId = receivingCustomerWorkViewModel.WarehouseId;
                curreobj.Owner = receivingCustomerWorkViewModel.Owner;
                curreobj.OwnerType = receivingCustomerWorkViewModel.OwnerType;
                curreobj.IsCustomerStock = receivingCustomerWorkViewModel.IsCustomerStock;
                curreobj.ExpirationDate = receivingCustomerWorkViewModel.ExpirationDate;
                curreobj.ManufacturingDate = receivingCustomerWorkViewModel.ManufacturingDate;
                curreobj.TagDate = receivingCustomerWorkViewModel.TagDate;
                curreobj.TagType = receivingCustomerWorkViewModel.TagType;
                curreobj.ReasonForRemoval = receivingCustomerWorkViewModel.ReasonForRemoval;
                curreobj.ObtainFrom = receivingCustomerWorkViewModel.ObtainFrom;
                curreobj.ManufacturingTrace = receivingCustomerWorkViewModel.ManufacturingTrace;
                curreobj.ManufacturingLotNumber = receivingCustomerWorkViewModel.ManufacturingLotNumber;
                curreobj.IsTimeLife = receivingCustomerWorkViewModel.IsTimeLife;
                curreobj.IsMFGDate = receivingCustomerWorkViewModel.IsMFGDate;
                curreobj.LocationId = receivingCustomerWorkViewModel.LocationId;
                curreobj.SiteId = receivingCustomerWorkViewModel.SiteId;
                curreobj.ShelfId = receivingCustomerWorkViewModel.ShelfId;
                curreobj.BinId = receivingCustomerWorkViewModel.BinId;
                curreobj.IsExpirationDate = receivingCustomerWorkViewModel.IsExpirationDate;
                curreobj.PartNumber = receivingCustomerWorkViewModel.PartNumber;
                curreobj.TimeLifeCyclesId = receivingCustomerWorkViewModel.TimeLifeCyclesId;
                curreobj.IsActive = true;
                curreobj.CreatedDate = DateTime.Now;
                curreobj.UpdatedDate = DateTime.Now;
                curreobj.CreatedBy = receivingCustomerWorkViewModel.CreatedBy;
                curreobj.UpdatedBy = receivingCustomerWorkViewModel.UpdatedBy;
              
                if (receivingCustomerWorkViewModel.ContactId == null)
                {
                    curreobj.ContactId = null;
                }
                if (receivingCustomerWorkViewModel.EmployeeId == null)
                {
                    curreobj.EmployeeId = null;
                }
                if (receivingCustomerWorkViewModel.StatusId == null)
                {

                    curreobj.StatusId = null;
                }
                if (receivingCustomerWorkViewModel.CustomerId == null)
                {

                    curreobj.CustomerId = null;
                }
                if (receivingCustomerWorkViewModel.CustomerClassificationId == null)
                {

                    curreobj.CustomerClassificationId = null;
                }
                if (receivingCustomerWorkViewModel.ScopeId == null)
                {

                    curreobj.ScopeId = null;
                }
                if (receivingCustomerWorkViewModel.PriorityId == null)
                {

                    curreobj.PriorityId = null;
                }
                if (receivingCustomerWorkViewModel.ConditionId == null)
                {

                    curreobj.ConditionId = null;
                }
                if (receivingCustomerWorkViewModel.WarehouseId == null)
                {

                    curreobj.WarehouseId = null;
                }
                if (receivingCustomerWorkViewModel.LocationId == null)
                {

                    curreobj.LocationId = null;
                }
                _context.ReceivingCustomerWork.Add(curreobj);
                _context.SaveChanges();
                if (curreobj != null)
                {
                    var exists = _context.ReceivingCustomerWork.Where(a => a.ReceivingCustomerWorkId == curreobj.ReceivingCustomerWorkId).SingleOrDefault();
                    exists.ReceivingCustomerNumber = "REC" + curreobj.ReceivingCustomerWorkId;
                    _context.ReceivingCustomerWork.Update(exists);
                    _context.SaveChanges();
                }

            }

            return Ok(ModelState);
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

                throw;
            }

        }

        [HttpPut("UpdatereceivingCustomerWork")]
        public IActionResult updatereceivingcustomer([FromBody] ReceivingCustomerWork rcwork)
        {
            if (ModelState.IsValid)
                rcwork.MasterCompanyId = 1;
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
                _context.TimeLife.Add(actionobject);
                _context.SaveChanges();
                return Ok(actionobject);
            }

            return Ok(ModelState);
        }



        [HttpDelete("deletereceivingCustomerWork/{id}")]
        [Produces(typeof(ReceivingCustomerWorkViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.receivingCustomerWork.GetSingleOrDefault(c => c.ReceivingCustomerWorkId == id);
            _unitOfWork.receivingCustomerWork.Remove(existingResult);
            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        //[HttpPut("deletereceivingCustomerWork/{id}")]
        //public IActionResult DeleteCustomerWork(long id, [FromBody]ReceivingCustomerWorkViewModel receivingCustomerWorkViewModel)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var CustomerObj = _unitOfWork.receivingCustomerWork.GetSingleOrDefault(a => a.ReceivingCustomerWorkId == id);
        //        receivingCustomerWorkViewModel.MasterCompanyId = 1;
        //        CustomerObj.IsDelete = receivingCustomerWorkViewModel.IsDelete;
        //        CustomerObj.UpdatedDate = DateTime.Now;
        //        CustomerObj.UpdatedBy = receivingCustomerWorkViewModel.UpdatedBy;
        //        CustomerObj.ReceivingCustomerWorkId = receivingCustomerWorkViewModel.ReceivingCustomerWorkId;
        //        _unitOfWork.receivingCustomerWork.Update(CustomerObj);
        //        _unitOfWork.SaveChanges();
        //        return Ok(CustomerObj);
        //    }

        //    return Ok(ModelState);
        //}


        [HttpPut("timeLifeUpdate")]
        public IActionResult UpdateTimeLifeIfExist([FromBody] TimeLife timelife)
        {
            if (ModelState.IsValid)
                _unitOfWork.Repository<TimeLife>().Update(timelife);
            _unitOfWork.SaveChanges();
            return Ok();
        }

    }

}
