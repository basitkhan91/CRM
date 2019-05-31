using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
using Model = DAL.Models;
namespace QuickApp.Pro.Controllers
{

    [Route("api/Task")]
    public class TaskController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";

        public TaskController(IUnitOfWork unitOfWork, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _emailer = emailer;
        }

        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<DAL.Models.Task>))]
        public IActionResult Get()
        {
            var allTasks = _unitOfWork.Actions.GetAllTask(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<DAL.Models.Task>>(allTasks));

        }

        [HttpGet("auditHistoryById/{id}", Name = "GetAuditHistoryById")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("Action", id); //.GetAllCustomersData();


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

        [HttpPost("add")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult AddTask([FromBody] DAL.Models.Task actionViewModel)
        {
            if (ModelState.IsValid)
            {
                if (actionViewModel == null)
                    return BadRequest($"{nameof(actionViewModel)} cannot be null");

                var exist = _unitOfWork.Repository<Model.Task>()
                    .Find(x => x.Description.Equals(actionViewModel.Description, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
                if (exist != null)
                {
                    return BadRequest(new Exception(string.Format("Action with name {0} already exists.", exist.Description)));
                }

                DAL.Models.Task actionobject = new DAL.Models.Task();
                actionobject.Description = actionViewModel.Description;
                actionobject.Memo = actionViewModel.Memo;
                actionobject.MasterCompanyId = 1;
                actionobject.IsActive = true;
                actionobject.IsDelete = false;
                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                actionobject.CreatedBy = actionViewModel.CreatedBy;
                actionobject.UpdatedBy = actionViewModel.UpdatedBy;
                _unitOfWork.Actions.Add(actionobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("Tasks/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] ActionViewModel actionViewModel)
        {

            if (ModelState.IsValid)
            {
                if (actionViewModel == null)
                    return BadRequest($"{nameof(actionViewModel)} cannot be null");

                var existingResult = _unitOfWork.Actions.GetSingleOrDefault(c => c.TaskId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = actionViewModel.UpdatedBy;
                existingResult.Memo = actionViewModel.Memo;
                existingResult.Description = actionViewModel.Description;
                existingResult.IsActive = actionViewModel.IsActive;
                existingResult.MasterCompanyId = actionViewModel.MasterCompanyId;

                _unitOfWork.Actions.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("Tasks/{id}")]
        [Produces(typeof(ActionViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Actions.GetSingleOrDefault(c => c.TaskId == id);
            existingResult.IsDelete = true;
            _unitOfWork.Actions.Update(existingResult);

            //_unitOfWork.Actions.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var tasks = _unitOfWork.Repository<TaskAudit>()
                .Find(X => X.TaskId == id)
                .OrderByDescending(X => X.TaskAuditId)
                .ToList();

            var auditResults = new List<AuditResult<TaskAudit>>();
            auditResults
                .Add(new AuditResult<TaskAudit> { AreaName = "Action", Memo = "Memo", Result = tasks });

            return Ok(auditResults);

        }

    }




}