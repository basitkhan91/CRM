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

namespace QuickApp.Pro.Controllers
{

    [Route("api/[controller]")]
    public class TaxRateController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";
        public TaxRateController(IUnitOfWork unitOfWork, ILogger<TaxRateController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values

        //[HttpGet("Get")]
        //[Produces(typeof(List<TaxRateViewModel>))]
        //public IActionResult Get()
        //{
        //    var result = _unitOfWork.TaxRates.GetAllTaxRateData(); //.GetAllCustomersData();


        //    try
        //    {
        //        var resul1 = Mapper.Map<IEnumerable<TaxRateViewModel>>(result);

        //        return Ok(resul1);
        //    }
        //    catch (Exception ex)
        //    {

        //        throw;
        //    }



        //}
        [HttpGet("Get")]
        [Produces(typeof(List<TaxRateViewModel>))]
        public IActionResult Get()
        {
            var allTaxrateInfo = _unitOfWork.TaxRates.GetAllTaxRateData(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<TaxRateViewModel>>(allTaxrateInfo));

        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("TaxRate", id); //.GetAllCustomersData();


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
        [HttpPost("taxrate")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] TaxRateViewModel taxrateViewModel)
        {
            if (ModelState.IsValid)
            {
                if (taxrateViewModel == null)
                    return BadRequest($"{nameof(taxrateViewModel)} cannot be null");

                DAL.Models.TaxRates taxrateobject = new DAL.Models.TaxRates();              
                taxrateobject.TaxTypeId = taxrateViewModel.TaxTypeId;
                taxrateobject.TaxRate = taxrateViewModel.TaxRate;
                taxrateobject.Memo = taxrateViewModel.Memo;
                taxrateobject.MasterCompanyId = taxrateViewModel.MasterCompanyId;
                taxrateobject.IsActive = taxrateViewModel.IsActive;
                taxrateobject.CreatedDate = DateTime.Now;
                taxrateobject.UpdatedDate = DateTime.Now;
                taxrateobject.CreatedBy = taxrateViewModel.CreatedBy;
                taxrateobject.UpdatedBy = taxrateViewModel.UpdatedBy;
                _unitOfWork.TaxRates.Add(taxrateobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("taxrate/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] TaxRateViewModel taxrateViewModel)
        {

            if (ModelState.IsValid)
            {
                if (taxrateViewModel == null)
                    return BadRequest($"{nameof(taxrateViewModel)} cannot be null");

                var existingResult = _unitOfWork.TaxRates.GetSingleOrDefault(c => c.TaxRateId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = taxrateViewModel.UpdatedBy;
                existingResult.TaxTypeId = taxrateViewModel.TaxTypeId;
                existingResult.Memo = taxrateViewModel.Memo;
                existingResult.TaxRate = taxrateViewModel.TaxRate;
                existingResult.IsActive = taxrateViewModel.IsActive;
                existingResult.MasterCompanyId = taxrateViewModel.MasterCompanyId;

                _unitOfWork.TaxRates.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("taxrate/{id}")]
        [Produces(typeof(TaxRateViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.TaxRates.GetSingleOrDefault(c => c.TaxRateId == id);
            existingResult.IsDelete = true;
            _unitOfWork.TaxRates.Update(existingResult);

            //_unitOfWork.TaxRates.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

    }




}