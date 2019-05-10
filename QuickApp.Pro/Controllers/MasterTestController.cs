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
    [Route("api/mastertest")]
    //[ApiController]
    public class MasterTestController : ControllerBase
    {
        public IUnitOfWork UnitOfWork;
        private readonly ApplicationDbContext _context;
        public MasterTestController(IUnitOfWork _unitOfWork, ApplicationDbContext context)
        {
            UnitOfWork = _unitOfWork;
            _context = context;
        }

        [HttpGet("actionAttributes")]
        public IActionResult GetActionAttributes()
        {
            var actionAttributes = UnitOfWork.Repository<ActionAttribute>().GetAll().ToList();
            return Ok(actionAttributes);
        }

        [HttpGet("Actions")]
        public IActionResult GetActions()
        {
            var actions = UnitOfWork.Repository<DAL.Models.Task>().GetAll().ToList();
            return Ok(actions);
        }

        [HttpGet("ChargesType")]
        public IActionResult GetChargesType()
        {
            var chargesTypes = UnitOfWork.Repository<ChargesType>().GetAll().ToList();
            return Ok(chargesTypes);
        }

        [HttpGet("ChargesCurrency")]
        public IActionResult GetChargesCurrency()
        {
            var currency = UnitOfWork.Repository<ChargesCurrency>().GetAll().ToList();
            return Ok(currency);
        }


        [HttpGet("EquipmentAssetType")]
        public IActionResult GetEquipmentAssetType()
        {
            var equipmentAssetType = UnitOfWork.Repository<EquipmentAssetType>().GetAll().ToList();
            return Ok(equipmentAssetType);
        }

        [HttpGet("ExpertiseType")]
        public IActionResult GetExpertiseType()
        {
            var expertiseType = UnitOfWork.Repository<ExpertiseType>().GetAll().ToList();
            return Ok(expertiseType);
        }

        [HttpGet("MaterialCondition")]
        public IActionResult GetMaterialCondition()
        {
            var materialCondition = UnitOfWork.Repository<MaterialCondition>().GetAll().ToList();
            return Ok(materialCondition);
        }

        [HttpGet("MaterialMandatory")]
        public IActionResult GetMaterialMandatory()
        {
            var materialMandatory = UnitOfWork.Repository<MaterialMandatory>().GetAll().ToList();
            return Ok(materialMandatory);
        }

        [HttpGet("MaterialUOM")]
        public IActionResult GetMaterialUOM()
        {
            var materialUOM = UnitOfWork.Repository<MaterialUOM>().GetAll().ToList();
            return Ok(materialUOM);
        }

        [HttpGet("PublicationType")]
        public IActionResult PublicationType()
        {
            var publicationType = UnitOfWork.Repository<PublicationType>().GetAll().ToList();
            return Ok(publicationType);
        }

        [HttpGet("PublicationAircraftManufacturer")]
        public IActionResult GetPublicationAircraftManufacturer()
        {
            var publicationAircraftManufacturer = UnitOfWork.Repository<AircraftType>().GetAll().ToList();
            return Ok(publicationAircraftManufacturer);
        }

        [HttpGet("PublicationModel/{aircraftTypeId}")]
        public IActionResult GetPublicationModel(long aircraftTypeId)
        {
            var publicationModel = _context.AircraftModel.Where(a => a.AircraftTypeId == aircraftTypeId).ToList();
            return Ok(publicationModel);
        }

        [HttpGet("PublicationStatus")]
        public IActionResult GetPublicationStatus()
        {
            var publicationStatus = UnitOfWork.Repository<PublicationStatus>().GetAll().ToList();
            return Ok(publicationStatus);
        }

        [HttpGet("ExclusionEstimatedOccurance")]
        public IActionResult GetExclusionEstimatedOccurance()
        {
            var exclusionEstimatedOccurance = UnitOfWork.Repository<ExclusionEstimatedOccurance>().GetAll().ToList();
            return Ok(exclusionEstimatedOccurance);
        }


    }
}
