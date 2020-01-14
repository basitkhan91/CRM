using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class CapabilityTypeController : Controller
    {
        private readonly ApplicationDbContext _context;
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public CapabilityTypeController(IUnitOfWork unitOfWork, ILogger<CapabilityTypeController> logger, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _context = context;
        }

        [HttpGet("Get")]
        public IActionResult Get()
        {
            var allActions = _unitOfWork.capabilityTypeRepository.GetAllCapabilityListData();
            return Ok(allActions);
        }

        [HttpGet("capabilityTypeEdit/{id}")]
        public IActionResult CapabilityTypeEdit(int id)
        {
            var allActions = _unitOfWork.capabilityTypeRepository.CapabilityTypeEdit(id);
            return Ok(allActions);
        }


        [HttpPost("capabilityTypeSave")]
        public IActionResult CapabilityTypeSave([FromBody]CapabilityType objCapsTypeDto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (objCapsTypeDto == null)
                        return BadRequest($"{nameof(objCapsTypeDto)} cannot be null");


                    if (objCapsTypeDto.CapabilityTypeId > 0)
                    {
                       
                        objCapsTypeDto.UpdatedDate = DateTime.Now;
                        objCapsTypeDto.IsActive = true;
                        objCapsTypeDto.IsDeleted = false;
                        _unitOfWork.capabilityTypeRepository.Update(objCapsTypeDto);
                    }
                    else
                    {
                        objCapsTypeDto.CreatedDate = DateTime.Now;
                        objCapsTypeDto.UpdatedDate = DateTime.Now;
                        objCapsTypeDto.IsActive = true;
                        objCapsTypeDto.IsDeleted = false;
                        _unitOfWork.capabilityTypeRepository.Add(objCapsTypeDto);
                    }

                    _unitOfWork.SaveChanges();
                    return Ok(objCapsTypeDto);
                }

            }
            catch (System.Exception)
            {
                throw;
            }
            return Ok(ModelState);
        }


        [HttpPut("capabilityTypeStatusUpdate/{id}")]
        public IActionResult CapabilityTypeStatusUpdate(int id, bool status, string updatedBy)
        {
            var result = _unitOfWork.capabilityTypeRepository.CapabilityTypeStatusUpdate(id, status, updatedBy);
            return Ok(result);
        }

        [HttpDelete("capabilityTypeDelete/{id}")]
        public IActionResult CapabilityTypeDelete(int id, string updatedBy)
        {
            var result = _unitOfWork.capabilityTypeRepository.CapabilityTypeDelete(id, updatedBy);
            return Ok(result);
        }

        [HttpGet("capabilityTypeAuditHistory/{Id}")]
        public IActionResult CapabilityTypeAuditHistory(int Id)
        {
            var allActions = _unitOfWork.capabilityTypeRepository.GetAllCapabilityTypeDataAudit(Id);
            return Ok(allActions);
        }




    }
}