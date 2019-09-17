using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;
namespace QuickApp.Pro.Controllers
{


    [Route("api/[controller]")]
    public class ItemClassificationController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";

        public ItemClassificationController(IUnitOfWork unitOfWork, ILogger<ItemClassificationController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<ItemClassifcationViewModel>))]
        public IActionResult Get()
        {
            var allitemclassinfo = _unitOfWork.ItemClassification.getItemClassification(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<ItemClassifcationViewModel>>(allitemclassinfo));

        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("ItemClassification", id); //.GetAllCustomersData();


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


        [HttpPost("itemclasspost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] ItemClassifcationViewModel itemclassificationViewModel)
        {
            if (ModelState.IsValid)
            {
                if (itemclassificationViewModel == null)
                    return BadRequest($"{nameof(itemclassificationViewModel)} cannot be null");

                DAL.Models.ItemClassfication itemclassificationobject = new DAL.Models.ItemClassfication();
                itemclassificationobject.Description = itemclassificationViewModel.Description;
                itemclassificationobject.ItemClassificationCode = itemclassificationViewModel.ItemClassificationCode;
                itemclassificationobject.ItemType = itemclassificationViewModel.ItemType;
                itemclassificationobject.MasterCompanyId = itemclassificationViewModel.MasterCompanyId;
                itemclassificationobject.Memo = itemclassificationViewModel.Memo;
                itemclassificationobject.IsActive = itemclassificationViewModel.IsActive;
                itemclassificationobject.CreatedDate = DateTime.Now;
                itemclassificationobject.UpdatedDate = DateTime.Now;
                itemclassificationobject.CreatedBy = itemclassificationViewModel.CreatedBy;
                itemclassificationobject.UpdatedBy = itemclassificationViewModel.UpdatedBy;
                _unitOfWork.ItemClassification.Add(itemclassificationobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
       
        [HttpPut("itemclasspost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] ItemClassifcationViewModel itemclassificationViewModel)
        {

            if (ModelState.IsValid)
            {
                if (itemclassificationViewModel == null)
                    return BadRequest($"{nameof(itemclassificationViewModel)} cannot be null");
                var existingResult = _unitOfWork.ItemClassification.GetSingleOrDefault(c => c.ItemClassificationId == id);
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = itemclassificationViewModel.UpdatedBy;
                existingResult.ItemClassificationCode = itemclassificationViewModel.ItemClassificationCode;
                existingResult.Description = itemclassificationViewModel.Description;
                existingResult.Memo = itemclassificationViewModel.Memo;
                existingResult.ItemType = itemclassificationViewModel.ItemType;
                existingResult.IsActive = itemclassificationViewModel.IsActive;
                existingResult.MasterCompanyId = itemclassificationViewModel.MasterCompanyId;
                _unitOfWork.ItemClassification.Update(existingResult);
                _unitOfWork.SaveChanges();

            }
            return Ok(ModelState);
        }
        [HttpDelete("itemclasspost/{id}")]
        [Produces(typeof(ItemClassifcationViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.ItemClassification.GetSingleOrDefault(c => c.ItemClassificationId == id);

            existingResult.IsDelete = true;
            _unitOfWork.ItemClassification.Update(existingResult);
            //_unitOfWork.ItemClassification.Remove(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<ItemClassficationAudit>()
                .Find(x => x.ItemClassificationId == id)
                .OrderByDescending(x => x.ItemClassificationAuditId);

            var auditResult = new List<AuditResult<ItemClassficationAudit>>();

            auditResult.Add(new AuditResult<ItemClassficationAudit> { AreaName = "Item Classification", Result = audits.ToList() });

            return Ok(auditResult);
        }

        [HttpPost("pagination")]
        public IActionResult GetItemClassification([FromBody]ItemClassificationViewModel paginate)
        {
            GetData getData = new GetData();
            IQueryable<ItemClassificationViewModel> queryable = null;
            List<ItemClassificationViewModel> itemClassificationList = new List<ItemClassificationViewModel>();
            ItemClassificationViewModel itemClassification = null;
            if (!string.IsNullOrEmpty(paginate.ItemClassificationCode)
                || !string.IsNullOrEmpty(paginate.Description)
                 || !string.IsNullOrEmpty(paginate.ItemType)
                || !string.IsNullOrEmpty(paginate.Memo)
                || !string.IsNullOrEmpty(paginate.CreatedBy)
                || !string.IsNullOrEmpty(paginate.UpdatedBy))
            {
                //var itemClassifications = _unitOfWork.itemClassification;
                var itemClassifications = _unitOfWork.ItemClassification.getItemClassification();
                foreach (var item in itemClassifications)
                {
                    itemClassification = new ItemClassificationViewModel();
                    itemClassification.ItemClassificationId = item.ItemClassificationId;
                    itemClassification.ItemClassificationCode = item.ItemClassificationCode;
                    itemClassification.Description = item.Description;
                    itemClassification.ItemType = item.ItemType;
                    itemClassification.Memo = item.Memo;
                    itemClassification.CreatedDate = item.CreatedDate;
                    itemClassification.CreatedBy = item.CreatedBy;
                    itemClassification.UpdatedDate = item.UpdatedDate;
                    itemClassification.UpdatedBy = item.UpdatedBy;
                    itemClassification.IsActive = item.IsActive;
                    itemClassificationList.Add(itemClassification);
                }
                if (!string.IsNullOrEmpty(paginate.Description))
                {
                    itemClassificationList = itemClassificationList.Where(c => c.Description != null && c.Description.ToUpper().Contains(paginate.Description.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.ItemClassificationCode))
                {
                    itemClassificationList = itemClassificationList.Where(c => c.ItemClassificationCode != null && c.ItemClassificationCode.ToUpper().Contains(paginate.ItemClassificationCode.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.ItemType))
                {
                    itemClassificationList = itemClassificationList.Where(c => c.ItemType != null && c.ItemType.ToUpper().Contains(paginate.ItemType.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.Memo))
                {
                    itemClassificationList = itemClassificationList.Where(c => c.Memo != null && c.Memo.ToUpper().Contains(paginate.Memo.ToUpper().Trim())).ToList();
                }

                if (!string.IsNullOrEmpty(paginate.CreatedBy))
                {
                    itemClassificationList = itemClassificationList.Where(c => c.CreatedBy != null && c.CreatedBy.ToUpper().Contains(paginate.CreatedBy.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.UpdatedBy))
                {
                    itemClassificationList = itemClassificationList.Where(c => c.UpdatedBy != null && c.UpdatedBy.ToUpper().Contains(paginate.UpdatedBy.ToUpper().Trim())).ToList();
                }
                getData.TotalRecordsCount = itemClassificationList.Count();
            }
            else
            {
                var itemClassifications = _unitOfWork.ItemClassification.getItemClassification();
                foreach (var item in itemClassifications)
                {
                    itemClassification = new ItemClassificationViewModel();
                    itemClassification.ItemClassificationId = item.ItemClassificationId;
                    itemClassification.ItemClassificationCode = item.ItemClassificationCode;
                    itemClassification.Description = item.Description;
                    itemClassification.ItemType = item.ItemType;
                    itemClassification.Memo = item.Memo;
                    itemClassification.CreatedDate = item.CreatedDate;
                    itemClassification.CreatedBy = item.CreatedBy;
                    itemClassification.UpdatedDate = item.UpdatedDate;
                    itemClassification.UpdatedBy = item.UpdatedBy;
                    itemClassification.IsActive = item.IsActive;
                    itemClassificationList.Add(itemClassification);
                    getData.TotalRecordsCount = itemClassificationList.Count();
                }
            }
            queryable = itemClassificationList.AsQueryable();

            if (paginate != null)
            {
                var pageListPerPage = paginate.rows;
                var pageIndex = paginate.first;
                var pageCount = (pageIndex / pageListPerPage) + 1;
                getData.ItemClassificationList = DAL.Common.PaginatedList<ItemClassificationViewModel>.Create(queryable, pageCount, pageListPerPage);
                return Ok(getData);
            }
            else
                return BadRequest(new Exception("Error Occured while fetching customer specific details."));
        }
        public class GetData
        {
            public int TotalRecordsCount { get; set; }
            public List<ItemClassificationViewModel> ItemClassificationList { get; set; }
        }

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(ItemClassficationModel).GetProperties();
            ColumHeader columnHeader;
            DynamicGridData<ItemClassficationModel> dynamicGridData = new DynamicGridData<ItemClassficationModel>();
            foreach (PropertyInfo property in propertyInfos)
            {
                columnHeader = new ColumHeader();
                columnHeader.field = property.Name;
                columnHeader.header = property.Name;
                columHeaders.Add(columnHeader);
            }
            dynamicGridData.columHeaders = columHeaders;
            List<ItemClassficationModel> itemClassificationList = new List<ItemClassficationModel>();
            ItemClassficationModel itemClassification = null;
            var itemClassifications = _unitOfWork.ItemClassification.getItemClassification();
            foreach (var item in itemClassifications)
            {
                itemClassification = new ItemClassficationModel();
                itemClassification.ItemClassificationId = item.ItemClassificationId;
                itemClassification.ItemClassificationCode = item.ItemClassificationCode;
                itemClassification.Description = item.Description;
                itemClassification.ItemType = item.ItemType;
                itemClassification.Memo = item.Memo;
                itemClassification.CreatedDate = item.CreatedDate;
                itemClassification.CreatedBy = item.CreatedBy;
                itemClassification.UpdatedDate = item.UpdatedDate;
                itemClassification.UpdatedBy = item.UpdatedBy;
                //itemClassification.IsActive = item.IsActive;
                itemClassificationList.Add(itemClassification);
            }
            dynamicGridData.ColumnData = itemClassificationList;
            return Ok(dynamicGridData);
        }
    }
}
