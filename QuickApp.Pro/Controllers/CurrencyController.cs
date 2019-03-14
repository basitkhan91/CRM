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
    public class CurrencyController :  Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public CurrencyController(IUnitOfWork unitOfWork, ILogger<CurrencyController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        [HttpGet("Get")]
        [Produces(typeof(List<CurrencyViewModel>))]
        public IActionResult Get()
        {
            var result = _unitOfWork.Currencys.GetAllCurrencyData(); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<CurrencyViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("Currency", id); //.GetAllCustomersData();


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

        [HttpPost("CurrencyPost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] CurrencyViewModel currencyViewModel)
        {
            if (ModelState.IsValid)
            {
                if (currencyViewModel == null)
                    return BadRequest($"{nameof(currencyViewModel)} cannot be null");
                DAL.Models.Currency curreobj = new DAL.Models.Currency();
                curreobj.Code = currencyViewModel.Code;
                curreobj.Symbol = currencyViewModel.Symbol;
                curreobj.DisplayName = currencyViewModel.DisplayName;
                curreobj.MasterCompanyId = currencyViewModel.MasterCompanyId;
                curreobj.Memo = currencyViewModel.Memo;
                curreobj.IsActive = currencyViewModel.IsActive;
                curreobj.CreatedDate = DateTime.Now;
                curreobj.UpdatedDate = DateTime.Now;
                curreobj.CreatedBy = currencyViewModel.CreatedBy;
                curreobj.UpdatedBy = currencyViewModel.UpdatedBy;
                _unitOfWork.Currencys.Add(curreobj);
                _unitOfWork.SaveChanges();
                return Ok(curreobj);
            }

            return Ok(ModelState);
        }
        [HttpPut("CurrencyPost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] CurrencyViewModel currencyViewModel)
        {

            if (ModelState.IsValid)
            {
                if (currencyViewModel == null)
                    return BadRequest($"{nameof(currencyViewModel)} cannot be null");

                var existingResult = _unitOfWork.Currencys.GetSingleOrDefault(c => c.CurrencyId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = currencyViewModel.UpdatedBy;
                existingResult.Code = currencyViewModel.Code;
                existingResult.Symbol = currencyViewModel.Symbol;
                existingResult.DisplayName = currencyViewModel.DisplayName;
                existingResult.Memo = currencyViewModel.Memo;
                existingResult.IsActive = currencyViewModel.IsActive;
                existingResult.MasterCompanyId = currencyViewModel.MasterCompanyId;

                _unitOfWork.Currencys.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }
        [HttpDelete("CurrencyPost/{id}")]
        [Produces(typeof(CurrencyViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Currencys.GetSingleOrDefault(c => c.CurrencyId == id);
            existingResult.IsDelete = true;
            _unitOfWork.Currencys.Update(existingResult);

            //_unitOfWork.Currencys.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }



    }


}