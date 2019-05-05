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
    public class ManufacturerController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public ManufacturerController(IUnitOfWork unitOfWork, ILogger<ManufacturerController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;

        }
        [HttpGet("Get")]
        [Produces(typeof(List<ManufacturerViewModel>))]
        public IActionResult Get()
        {
            var allManufacturer = _unitOfWork.Manufacturer.GetAllManufacturerData();
            return Ok(Mapper.Map<IEnumerable<ManufacturerViewModel>>(allManufacturer));

        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("Manufacturer", id);

            try
            {
                var resul1 = Mapper.Map<IEnumerable<ManufacturerViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }

        [HttpPost("manufacturerpost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] ManufacturerViewModel ManufacturerViewModel)
        {
            if (ModelState.IsValid)
            {
                if (ManufacturerViewModel == null)
                    return BadRequest($"{nameof(ManufacturerViewModel)} cannot be null");

                DAL.Models.Manufacturer manufacturerobject = new DAL.Models.Manufacturer();
                manufacturerobject.ManufacturerId = ManufacturerViewModel.ManufacturerId;
                manufacturerobject.Comments = ManufacturerViewModel.Comments;
                manufacturerobject.Name = ManufacturerViewModel.Name;
                manufacturerobject.MasterCompanyId = ManufacturerViewModel.MasterCompanyId;
                manufacturerobject.IsActive = ManufacturerViewModel.IsActive;
                manufacturerobject.CreatedDate = DateTime.Now;
                manufacturerobject.UpdatedDate = DateTime.Now;
                manufacturerobject.CreatedBy = ManufacturerViewModel.CreatedBy;
                manufacturerobject.UpdatedBy = ManufacturerViewModel.UpdatedBy;
                _unitOfWork.Manufacturer.Add(manufacturerobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("manufacturerpost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] ManufacturerViewModel ManufacturerViewModel)
        {

            if (ModelState.IsValid)
            {
                if (ManufacturerViewModel == null)
                    return BadRequest($"{nameof(ManufacturerViewModel)} cannot be null");

                var existingResult = _unitOfWork.Manufacturer.GetSingleOrDefault(c => c.ManufacturerId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = ManufacturerViewModel.UpdatedBy;
                existingResult.ManufacturerId = ManufacturerViewModel.ManufacturerId;
                existingResult.Name = ManufacturerViewModel.Name;
                existingResult.Comments = ManufacturerViewModel.Comments;
                existingResult.IsActive = ManufacturerViewModel.IsActive;
                existingResult.MasterCompanyId = ManufacturerViewModel.MasterCompanyId;

                _unitOfWork.Manufacturer.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }
        [HttpDelete("manufacturerpost/{id}")]
        [Produces(typeof(ManufacturerViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Manufacturer.GetSingleOrDefault(c => c.ManufacturerId == id);
            existingResult.IsDelete = true;
            _unitOfWork.Manufacturer.Update(existingResult);

            //_unitOfWork.ActionAttribute.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{Id}")]
        public IActionResult GetManufacturerAuditDetails(long Id)
        {
            var audits = _unitOfWork.Repository<ManufacturerAudit>()
                .Find(x => x.ManufacturerId == Id)
                .OrderByDescending(x => x.ManufacturerAuditId).ToList();
            var auditResult = new List<AuditResult<ManufacturerAudit>>();

            auditResult.Add(new AuditResult<ManufacturerAudit>
            {
                AreaName = "Manufacturer",
                Memo = "",
                Result = audits
            });

            return Ok(auditResult);
        }
    }

}

