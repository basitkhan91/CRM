using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace QuickApp.Pro.Controllers
{   
    [Route("api/[controller]")]
    public class EmployeeStationController : Controller
    {
        private readonly ApplicationDbContext _context;
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;


        public EmployeeStationController(IUnitOfWork unitOfWork, ILogger<EmployeeStationController> logger, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _context = context;
        }


        /// <summary>
        /// To Get All Employee Station Master Data
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        [HttpGet("Get")]
        public IActionResult Get(bool status = false)
        {
            var allActions = _unitOfWork.employeeStationRepository.GetAllEmployeeStationData(status);
            return Ok(allActions);
        }

        [HttpGet("employeeStationEdit/{id}")]
        public IActionResult EmployeeStationEdit(long id)
        {
            var allActions = _unitOfWork.employeeStationRepository.EmployeeStationEdit(id);
            return Ok(allActions);
        }


        [HttpPost("employeeStationSave")]
        public IActionResult EmployeeStationSave([FromBody]EmployeeStation objStationDto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (objStationDto == null)
                        return BadRequest($"{nameof(objStationDto)} cannot be null");
                   

                    if (objStationDto.EmployeeStationId > 0)
                    {
                        objStationDto.CreatedDate = DateTime.Now;
                        objStationDto.UpdatedDate = DateTime.Now;
                        _unitOfWork.employeeStationRepository.Update(objStationDto);
                    }
                    else
                    {                        
                        objStationDto.UpdatedDate = DateTime.Now;
                        _unitOfWork.employeeStationRepository.Add(objStationDto);
                    }

                    _unitOfWork.SaveChanges();
                    return Ok(objStationDto);
                }

            }
            catch (System.Exception)
            {
                throw;
            }
            return Ok(ModelState);
        }


        [HttpPut("employeeStationStatusUpdate/{id}")]
        public IActionResult EmployeeStationStatusUpdate(long id, bool status, string updatedBy)
        {
            var result = _unitOfWork.employeeStationRepository.EmployeeStationStatusUpdate(id, status, updatedBy);
            return Ok(result);
        }

        [HttpPut("employeeStationDelete/{id}")]
        public IActionResult EmployeeStationDelete(long id, string updatedBy)
        {
            var result = _unitOfWork.employeeStationRepository.EmployeeStationDelete(id, updatedBy);
            return Ok(result);
        }

        [HttpGet("employeeStationAuditHistory/{Id}")]
        public IActionResult EmployeeStationAuditHistory(long Id)
        {
            var allActions = _unitOfWork.employeeStationRepository.GetAllEmployeeStationDataAudit(Id);
            return Ok(allActions);
        }

    }
}