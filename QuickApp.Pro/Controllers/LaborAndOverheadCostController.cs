using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class LaborAndOverheadCostController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        

        public LaborAndOverheadCostController(IUnitOfWork unitOfWork, ILogger<LaborAndOverheadCostController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;

        }
        [HttpGet("Get")]
        [Produces(typeof(List<LaborAndOverheadCostViewModel>))]
        public IActionResult Get()
        {
            var allLaborOverheadCost = _unitOfWork.LaborAndOverheadCost.GetAllGLLaborAndOverheadCostData(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<LaborAndOverheadCostViewModel>>(allLaborOverheadCost));

        }
        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("LaborandOverheadCostSetup", id); //.GetAllCustomersData();


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
            [HttpPost("labourpost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] LaborAndOverheadCostViewModel LaborAndOverheadCostViewModel)
        {
            if (ModelState.IsValid)
            {
                if (LaborAndOverheadCostViewModel == null)
                    return BadRequest($"{nameof(LaborAndOverheadCostViewModel)} cannot be null");

                DAL.Models.LaborOverloadCost vendorobject = new DAL.Models.LaborOverloadCost();
                vendorobject.LaborOverloadCostId = LaborAndOverheadCostViewModel.LaborOverloadCostId;
                vendorobject.UseIndTechLaborRate = LaborAndOverheadCostViewModel.UseIndTechLaborRate;
                vendorobject.UseAvgRateOfAllTech = LaborAndOverheadCostViewModel.UseAvgRateOfAllTech;
                vendorobject.AssignHoursBySpecificAction = LaborAndOverheadCostViewModel.AssignHoursBySpecificAction;
                vendorobject.AssignTotalHoursToWO = LaborAndOverheadCostViewModel.AssignTotalHoursToWO;
                vendorobject.AsPercentOfTechHourlyRate = LaborAndOverheadCostViewModel.AsPercentOfTechHourlyRate;
                vendorobject.FlatAmtPerHour = LaborAndOverheadCostViewModel.FlatAmtPerHour;
                vendorobject.FlatAmtPerWO = LaborAndOverheadCostViewModel.FlatAmtPerWO;
                vendorobject.FLATAMOUNTPERWORKORDER = LaborAndOverheadCostViewModel.FLATAMOUNTPERWORKORDER;
                vendorobject.FLATAMOUNTPERHOUR = LaborAndOverheadCostViewModel.FLATAMOUNTPERHOUR;
                vendorobject.AsPercentOFTECHNICIANMECHANICHOURLYRATE = LaborAndOverheadCostViewModel.AsPercentOFTECHNICIANMECHANICHOURLYRATE;
                vendorobject.AVERAGERATEOFALLTECHNICIANMECHANIC = LaborAndOverheadCostViewModel.AVERAGERATEOFALLTECHNICIANMECHANIC;
                vendorobject.MasterCompanyId = LaborAndOverheadCostViewModel.MasterCompanyId;
                vendorobject.IsActive = LaborAndOverheadCostViewModel.IsActive;
                vendorobject.CreatedDate = DateTime.Now;
                vendorobject.UpdatedDate = DateTime.Now;
                vendorobject.CreatedBy = LaborAndOverheadCostViewModel.CreatedBy;
                vendorobject.UpdatedBy = LaborAndOverheadCostViewModel.UpdatedBy;
                _unitOfWork.LaborAndOverheadCost.Add(vendorobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("labourpost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] LaborAndOverheadCostViewModel LaborAndOverheadCostViewModel)
        {

            if (ModelState.IsValid)
            {
                if (LaborAndOverheadCostViewModel == null)
                    return BadRequest($"{nameof(LaborAndOverheadCostViewModel)} cannot be null");

                var existingResult = _unitOfWork.LaborAndOverheadCost.GetSingleOrDefault(c => c.LaborOverloadCostId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = LaborAndOverheadCostViewModel.UpdatedBy;
                existingResult.LaborOverloadCostId = LaborAndOverheadCostViewModel.LaborOverloadCostId;
                existingResult.UseIndTechLaborRate = LaborAndOverheadCostViewModel.UseIndTechLaborRate;
                existingResult.UseAvgRateOfAllTech = LaborAndOverheadCostViewModel.UseAvgRateOfAllTech;
                existingResult.AssignHoursBySpecificAction = LaborAndOverheadCostViewModel.AssignHoursBySpecificAction;
                existingResult.AssignTotalHoursToWO = LaborAndOverheadCostViewModel.AssignTotalHoursToWO;
                existingResult.AsPercentOfTechHourlyRate = LaborAndOverheadCostViewModel.AsPercentOfTechHourlyRate;
                existingResult.FlatAmtPerHour = LaborAndOverheadCostViewModel.FlatAmtPerHour;
                existingResult.FlatAmtPerWO = LaborAndOverheadCostViewModel.FlatAmtPerWO;
                existingResult.FLATAMOUNTPERWORKORDER = LaborAndOverheadCostViewModel.FLATAMOUNTPERWORKORDER;
                existingResult.FLATAMOUNTPERHOUR = LaborAndOverheadCostViewModel.FLATAMOUNTPERHOUR;
                existingResult.AsPercentOFTECHNICIANMECHANICHOURLYRATE = LaborAndOverheadCostViewModel.AsPercentOFTECHNICIANMECHANICHOURLYRATE;
                existingResult.AVERAGERATEOFALLTECHNICIANMECHANIC = LaborAndOverheadCostViewModel.AVERAGERATEOFALLTECHNICIANMECHANIC;
                existingResult.IsActive = LaborAndOverheadCostViewModel.IsActive;
                existingResult.MasterCompanyId = LaborAndOverheadCostViewModel.MasterCompanyId;

                _unitOfWork.LaborAndOverheadCost.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }
        [HttpDelete("labourpost/{id}")]
        [Produces(typeof(LaborAndOverheadCostViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.LaborAndOverheadCost.GetSingleOrDefault(c => c.LaborOverloadCostId == id);
            existingResult.IsDelete = true;
            _unitOfWork.LaborAndOverheadCost.Update(existingResult);

            //_unitOfWork.ActionAttribute.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }


    }
}
  