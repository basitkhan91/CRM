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

    [Route("api/TaxType")]
    public class TaxTypeController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetTaxTypeById";

        public TaxTypeController (IUnitOfWork unitOfWork, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _emailer = emailer;
        }

        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<TaxTypeViewModel>))]
        public IActionResult Get()
        {
            var allTaxTypes = _unitOfWork.TaxType.GetAllTaxTypeData(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<TaxTypeViewModel>>(allTaxTypes));


        }



       //[HttpGet("auditHistoryById/{id}", Name = "GetAuditHostoryById")]
       // [Produces(typeof(List<AuditHistory>))]
       // public IActionResult GetAuditHostoryById(long id)
       // {
       //     var result = _unitOfWork.AuditHistory.GetAllHistory("TaxType", id); //.GetAllCustomersData();


       //     try
       //     {
       //         var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

       //         return Ok(resul1);
       //     }
       //     catch (Exception ex)
       //     {

       //         throw;
       //     }



       // }

        [HttpPost("taxType")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] TaxTypeViewModel taxViewModel)

        { 
            if (ModelState.IsValid)
            {
                if (taxViewModel == null)
                    return BadRequest($"{nameof(taxViewModel)} cannot be null");

                DAL.Models.TaxType taxTypeObj = new DAL.Models.TaxType();
                
                taxTypeObj.Description = taxViewModel.Description;
                taxTypeObj.MasterCompanyId = taxViewModel.MasterCompanyId;
                taxTypeObj.IsActive = taxViewModel.IsActive;
				taxTypeObj.IsDeleted = false;
				taxTypeObj.Memo = taxViewModel.Memo;
                taxTypeObj.CreatedDate = DateTime.Now;
                taxTypeObj.UpdatedDate = DateTime.Now;
                taxTypeObj.CreatedBy = taxViewModel.CreatedBy;
                taxTypeObj.UpdatedBy = taxViewModel.UpdatedBy;
                _unitOfWork.TaxType.Add(taxTypeObj);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }

        [HttpPut("taxType/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] TaxTypeViewModel taxTypeViewModel)
        {

            if (ModelState.IsValid)
            {
                if (taxTypeViewModel == null)
                    return BadRequest($"{nameof(taxTypeViewModel)} cannot be null");

                var existingResult = _unitOfWork.TaxType.GetSingleOrDefault(c => c.TaxTypeId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = taxTypeViewModel.UpdatedBy;
                existingResult.Description = taxTypeViewModel.Description;
                existingResult.Memo = taxTypeViewModel.Memo;
                existingResult.IsActive = taxTypeViewModel.IsActive;
				existingResult.IsDeleted = taxTypeViewModel.IsDelete;
				existingResult.MasterCompanyId = taxTypeViewModel.MasterCompanyId;

                _unitOfWork.TaxType.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }


        [HttpDelete("actions/{id}")]
        [Produces(typeof(TaxTypeViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.TaxType.GetSingleOrDefault(c => c.TaxTypeId == id);

            existingResult.IsDeleted = true;
            _unitOfWork.TaxType.Update(existingResult);


            //_unitOfWork.TaxType.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{Id}")]
        public IActionResult GetTextTypeAuditDetails(long Id)
        {
            var audits = _unitOfWork.Repository<TaxTypeAudit>().Find(x => x.TaxTypeId == Id)
                .OrderByDescending(x => x.TaxTypeAuditId).ToList();

            var auditResult = new List<AuditResult<TaxTypeAudit>>();

            auditResult.Add(new AuditResult<TaxTypeAudit>
            {
                AreaName = "Tax Type",
                Memo = "Tax Type",
                Result = audits
            }
            );
            return Ok(auditResult);
        }

        //[HttpPost("pagination")]
        //public IActionResult GetAircraftManufacturer([FromBody]PaginateViewModel paginate)
        //{
        //    var pageListPerPage = paginate.rows;
        //    var pageIndex = paginate.first;
        //    var pageCount = (pageIndex / pageListPerPage) + 1;
        //    var data = DAL.Common.PaginatedList<TaxType>.Create(_unitOfWork.TaxType.GetPaginationData(), pageCount, pageListPerPage);
        //    return Ok(data);
        //}

        [HttpPost("pagination")]
        public IActionResult GetTaxType([FromBody]TaxTypePaginationViewModel paginate)
        {
            IQueryable<TaxTypePaginationViewModel> queryable = null;
            List<TaxTypePaginationViewModel> taxTypeList = new List<TaxTypePaginationViewModel>();
            TaxTypePaginationViewModel taxType = null;
            if (!string.IsNullOrEmpty(paginate.Description)
                || !string.IsNullOrEmpty(paginate.Memo)
                || !string.IsNullOrEmpty(paginate.CreatedBy)
                || !string.IsNullOrEmpty(paginate.UpdatedBy))
            {
                //var taxTypes = _unitOfWork.taxType;
                var taxTypes = _unitOfWork.TaxType.GetAllTaxTypeData();
                foreach (var item in taxTypes)
                {
                    taxType = new TaxTypePaginationViewModel();
                    taxType.TaxTypeId = item.TaxTypeId;
                    taxType.Description = item.Description;
                    taxType.Memo = item.Memo;
                    taxType.CreatedDate = item.CreatedDate;
                    taxType.CreatedBy = item.CreatedBy;
                    taxType.UpdatedDate = item.UpdatedDate;
                    taxType.UpdatedBy = item.UpdatedBy;
                    taxType.IsActive = item.IsActive;
                    taxTypeList.Add(taxType);
                }
                if (!string.IsNullOrEmpty(paginate.Description))
                {
                    taxTypeList = taxTypeList.Where(c => c.Description != null && c.Description.ToUpper().Contains(paginate.Description.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.Memo))
                {
                    taxTypeList = taxTypeList.Where(c => c.Memo != null && c.Memo.ToUpper().Contains(paginate.Memo.ToUpper().Trim())).ToList();
                }

                if (!string.IsNullOrEmpty(paginate.CreatedBy))
                {
                    taxTypeList = taxTypeList.Where(c => c.CreatedBy != null && c.CreatedBy.ToUpper().Contains(paginate.CreatedBy.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.UpdatedBy))
                {
                    taxTypeList = taxTypeList.Where(c => c.UpdatedBy != null && c.UpdatedBy.ToUpper().Contains(paginate.UpdatedBy.ToUpper().Trim())).ToList();
                }
            }
            else
            {
                var taxTypes = _unitOfWork.TaxType.GetAllTaxTypeData();
                foreach (var item in taxTypes)
                {
                    taxType = new TaxTypePaginationViewModel();
                    taxType.TaxTypeId = item.TaxTypeId;
                    taxType.Description = item.Description;
                    taxType.Memo = item.Memo;
                    taxType.CreatedDate = item.CreatedDate;
                    taxType.CreatedBy = item.CreatedBy;
                    taxType.UpdatedDate = item.UpdatedDate;
                    taxType.UpdatedBy = item.UpdatedBy;
                    taxType.IsActive = item.IsActive;
                    taxTypeList.Add(taxType);
                }
                taxTypeList.Add(taxType);

            }
            queryable = taxTypeList.AsQueryable();

            if (paginate != null)
            {
                var pageListPerPage = paginate.rows;
                var pageIndex = paginate.first;
                var pageCount = (pageIndex / pageListPerPage) + 1;
                var data = DAL.Common.PaginatedList<TaxTypePaginationViewModel>.Create(queryable, pageCount, pageListPerPage);
                return Ok(data);
            }
            else
                return BadRequest(new Exception("Error Occured while fetching customer specific details."));
        }
    }

}
