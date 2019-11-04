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
using System.Reflection;
using System.Threading.Tasks;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    public class StockLineAdjustmentReasonController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public StockLineAdjustmentReasonController(IUnitOfWork unitOfWork, ILogger<StockLineAdjustmentReasonController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;

        }
        //[HttpGet("Get")]
        //[Produces(typeof(List<StocklineAdjustmnetReasonViewModel>))]
        //public IActionResult Index()
        //{
        //    var allStockAdjReason = _unitOfWork.StocklineAdjustmentReasonRepository.GetAllAdjustmentReasonData();
        //    return Ok(Mapper.Map<IEnumerable<GLAccountClassViewModel>>(allStockAdjReason));

        //}

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(StocklineAdjustmentReasonColModel).GetProperties();
            ColumHeader columnHeader;
            DynamicGridData<dynamic> dynamicGridData = new DynamicGridData<dynamic>();
            foreach (PropertyInfo property in propertyInfos)
            {
                columnHeader = new ColumHeader();
                columnHeader.field = char.ToLower(property.Name[0]) + property.Name.Substring(1);
                //columnHeader.field = property.Name;
                columnHeader.header = property.Name;
                columHeaders.Add(columnHeader);
            }
            dynamicGridData.columHeaders = columHeaders;
            List<StocklineAdjustmentReasonSPModel> stockAdjReasonModels = new List<StocklineAdjustmentReasonSPModel>();
            StocklineAdjustmentReasonSPModel stockAdjReason = null;
            var StocklineAdjReason = _unitOfWork.Repository<StocklineAdjustmentReason>().GetAll().Where(x => x.IsDeleted != true).OrderByDescending(x => x.AdjustmentReasonId); ;
            foreach (var item in StocklineAdjReason)
            {
                stockAdjReason = new StocklineAdjustmentReasonSPModel();

                stockAdjReason.iD = item.AdjustmentReasonId;
                stockAdjReason.StockAdjustmentReason = item.Description;
                stockAdjReason.Memo = item.Memo;
                stockAdjReason.CreatedDate = item.CreatedDate;
                stockAdjReason.CreatedBy = item.CreatedBy;
                stockAdjReason.UpdatedDate = item.UpdatedDate;
                stockAdjReason.UpdatedBy = item.UpdatedBy;
                stockAdjReason.IsActive = item.IsActive;
                stockAdjReasonModels.Add(stockAdjReason);
            }
            dynamicGridData.ColumnData = stockAdjReasonModels;
            return Ok(dynamicGridData);
        }
        [HttpDelete("stockLineAdjustmentReasonDelete/{id}")]

        public IActionResult stockLineAdjustmentReasonDelete(long id)
        {
            
            var existingResultofstocklineList = _unitOfWork.Repository<StocklineAdjustmentReason>().Find(x => x.AdjustmentReasonId == id).FirstOrDefault();
            if (existingResultofstocklineList != null)
            {
                existingResultofstocklineList.IsDeleted = true;
                _unitOfWork.Repository<StocklineAdjustmentReason>().Update(existingResultofstocklineList);
                _unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }

        }
        [HttpPost("stockLineAdjustmentReasonpost")]
        public IActionResult stockLineAdjustmentReasonNew([FromBody] StocklineAdjustmnetReasonViewModel stocklineAdjustmnetReasonViewModel)
        {
            if (ModelState.IsValid)
            {
                if (stocklineAdjustmnetReasonViewModel == null)
                    return BadRequest($"{nameof(stocklineAdjustmnetReasonViewModel)} cannot be null");
                DAL.Models.StocklineAdjustmentReason actionobject = new DAL.Models.StocklineAdjustmentReason();
                actionobject.AdjustmentReasonId = stocklineAdjustmnetReasonViewModel.AdjustmentReasonId;
                actionobject.Description = stocklineAdjustmnetReasonViewModel.Description;
                actionobject.Memo = stocklineAdjustmnetReasonViewModel.Memo;
                actionobject.MasterCompanyId = stocklineAdjustmnetReasonViewModel.MasterCompanyId;
                actionobject.IsActive = stocklineAdjustmnetReasonViewModel.IsActive;
                actionobject.CreatedDate = DateTime.Now;
                actionobject.UpdatedDate = DateTime.Now;
                actionobject.CreatedBy = stocklineAdjustmnetReasonViewModel.CreatedBy;
                actionobject.UpdatedBy = stocklineAdjustmnetReasonViewModel.UpdatedBy;
                _unitOfWork.StocklineAdjustmentReasonRepository.Add(actionobject);
                _unitOfWork.SaveChanges();   
            }

            return Ok(ModelState);
        }

        [HttpPut("stockLineAdjustmentReasonpost/{id}")]
        public IActionResult stockLineAdjustmentReasonUpdate([FromBody]StocklineAdjustmentReason stocklineAdjustmentReason)
        {
            if (stocklineAdjustmentReason != null)
            {
                if (ModelState.IsValid)
                {
                    stocklineAdjustmentReason.UpdatedDate = DateTime.Now;
                    _unitOfWork.Repository<StocklineAdjustmentReason>().Update(stocklineAdjustmentReason);
                    _unitOfWork.SaveChanges();
                    return Ok(stocklineAdjustmentReason);
                }
                else
                {
                    return BadRequest(ModelState);
                }

            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("stockAdjReasonauditdetails/{iD}")]
        [Produces(typeof(List<StocklineAdjustmentReasonAudit>))]
        public IActionResult GetAuditHostoryById(long iD)
        {
            try
            {
                var result = _unitOfWork.StocklineAdjustmentReasonRepository.GetStocklineAdjustmentReasonAuditDetails(iD);
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost("StockLineAdjustmentCustomUpload")]
        public IActionResult StockLineAdjustmentCustomUpload()
        {

            _unitOfWork.FileUploadRepository.UploadCustomFile(Convert.ToString("StocklineAdjustmentReason"), Request.Form.Files[0]);
            return Ok();
        }
    }

}