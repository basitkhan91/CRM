
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
    public class ItemgroupController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";

        public ItemgroupController(IUnitOfWork unitOfWork, ILogger<ItemgroupController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }

        // GET: api/values
        [HttpGet("Get")]
        [Produces(typeof(List<ItemgroupViewModel>))]
        public IActionResult Get()
        {
            var allitemgroupinfo = _unitOfWork.Itemgroup.GetItemgroups(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<ItemgroupViewModel>>(allitemgroupinfo));

        }
        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("ItemGroup", id); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }



        }

        [HttpPost("itemgrouppost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] ItemgroupViewModel itemgroupViewModel)
        {
            if (ModelState.IsValid)
            {
                if (itemgroupViewModel == null)
                    return BadRequest($"{nameof(itemgroupViewModel)} cannot be null");

                DAL.Models.Itemgroup itemgroupobject = new DAL.Models.Itemgroup();
                itemgroupobject.ItemGroupCode = itemgroupViewModel.ItemGroupCode;
                itemgroupobject.Description = itemgroupViewModel.Description;
                itemgroupobject.MasterCompanyId = itemgroupViewModel.MasterCompanyId;
                itemgroupobject.Memo = itemgroupViewModel.Memo;
                itemgroupobject.IsActive = itemgroupViewModel.IsActive;
                itemgroupobject.CreatedDate = DateTime.Now;
                itemgroupobject.UpdatedDate = DateTime.Now;
                itemgroupobject.CreatedBy = itemgroupViewModel.CreatedBy;
                itemgroupobject.UpdatedBy = itemgroupViewModel.UpdatedBy;
                _unitOfWork.Itemgroup.Add(itemgroupobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("itemgrouppost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] ItemgroupViewModel itemgroupViewModel)
        {

            if (ModelState.IsValid)
            {
                if (itemgroupViewModel == null)
                    return BadRequest($"{nameof(itemgroupViewModel)} cannot be null");
                var existingResult = _unitOfWork.Itemgroup.GetSingleOrDefault(c => c.ItemGroupId == id);
                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = itemgroupViewModel.UpdatedBy;
                existingResult.ItemGroupCode = itemgroupViewModel.ItemGroupCode;
                existingResult.Memo = itemgroupViewModel.Memo;
                existingResult.Description = itemgroupViewModel.Description;
                existingResult.IsActive = itemgroupViewModel.IsActive;
                existingResult.MasterCompanyId = itemgroupViewModel.MasterCompanyId;
                _unitOfWork.Itemgroup.Update(existingResult);
                _unitOfWork.SaveChanges();

            }
            return Ok(ModelState);
        }
        [HttpDelete("itemgrouppost/{id}")]
        [Produces(typeof(ItemgroupViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Itemgroup.GetSingleOrDefault(c => c.ItemGroupId == id);
            existingResult.IsDelete = true;
            _unitOfWork.Itemgroup.Update(existingResult);

            //_unitOfWork.Itemgroup.Remove(existingResult);
            _unitOfWork.SaveChanges();
            return Ok(id);
        }

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = _unitOfWork.Repository<ItemgroupAudit>()
                .Find(x => x.ItemGroupId == id)
                .OrderByDescending(x => x.ItemGroupAuditId);

            var auditResult = new List<AuditResult<ItemgroupAudit>>();

            auditResult.Add(new AuditResult<ItemgroupAudit> { AreaName = "Item Group ", Result = audits.ToList() });

            return Ok(auditResult);
        }
        
        [HttpPost("pagination")]
        public IActionResult GetItemGroup([FromBody]ItemGroupViewModel paginate)
        {

            GetData getData = new GetData();
            IQueryable<ItemGroupViewModel> queryable = null;
            List<ItemGroupViewModel> itemGroupList = new List<ItemGroupViewModel>();
            ItemGroupViewModel itemGroup = null;
            if (!string.IsNullOrEmpty(paginate.ItemGroupCode)
                || !string.IsNullOrEmpty(paginate.Description)
                || !string.IsNullOrEmpty(paginate.Memo)
                || !string.IsNullOrEmpty(paginate.CreatedBy)
                || !string.IsNullOrEmpty(paginate.UpdatedBy))
            {
                //var itemGroups = _unitOfWork.itemGroup;
                var itemGroups = _unitOfWork.Itemgroup.GetItemgroups();
                foreach (var item in itemGroups)
                {
                    itemGroup = new ItemGroupViewModel();
                    itemGroup.ItemGroupId = item.ItemGroupId;
                    itemGroup.Description = item.Description;
                    itemGroup.ItemGroupCode = item.ItemGroupCode;
                    itemGroup.Memo = item.Memo;
                    itemGroup.CreatedDate = item.CreatedDate;
                    itemGroup.CreatedBy = item.CreatedBy;
                    itemGroup.UpdatedDate = item.UpdatedDate;
                    itemGroup.UpdatedBy = item.UpdatedBy;
                    itemGroup.IsActive = item.IsActive;
                    itemGroupList.Add(itemGroup);
                }
                if (!string.IsNullOrEmpty(paginate.Description))
                {
                    itemGroupList = itemGroupList.Where(c => c.Description != null && c.Description.ToUpper().Contains(paginate.Description.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.ItemGroupCode))
                {
                    itemGroupList = itemGroupList.Where(c => c.ItemGroupCode != null && c.ItemGroupCode.ToUpper().Contains(paginate.ItemGroupCode.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.Memo))
                {
                    itemGroupList = itemGroupList.Where(c => c.Memo != null && c.Memo.ToUpper().Contains(paginate.Memo.ToUpper().Trim())).ToList();
                }
               
                if (!string.IsNullOrEmpty(paginate.CreatedBy))
                {
                    itemGroupList = itemGroupList.Where(c => c.CreatedBy != null && c.CreatedBy.ToUpper().Contains(paginate.CreatedBy.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.UpdatedBy))
                {
                    itemGroupList = itemGroupList.Where(c => c.UpdatedBy != null && c.UpdatedBy.ToUpper().Contains(paginate.UpdatedBy.ToUpper().Trim())).ToList();
                }
                getData.TotalRecordsCount = itemGroupList.Count();
            }
            else
            {
                var itemGroups = _unitOfWork.Itemgroup.GetItemgroups();
                foreach (var item in itemGroups)
                {
                    itemGroup = new ItemGroupViewModel();
                    itemGroup.ItemGroupId = item.ItemGroupId;
                    itemGroup.ItemGroupCode = item.ItemGroupCode;
                    itemGroup.Description = item.Description;
                    itemGroup.Memo = item.Memo;
                    itemGroup.CreatedDate = item.CreatedDate;
                    itemGroup.CreatedBy = item.CreatedBy;
                    itemGroup.UpdatedDate = item.UpdatedDate;
                    itemGroup.UpdatedBy = item.UpdatedBy;
                    itemGroup.IsActive = item.IsActive;
                    itemGroupList.Add(itemGroup);
                    getData.TotalRecordsCount = itemGroupList.Count();
                }
                

            }
            queryable = itemGroupList.AsQueryable();

            if (paginate != null)
            {
                var pageListPerPage = paginate.rows;
                var pageIndex = paginate.first;
                var pageCount = (pageIndex / pageListPerPage) + 1;
                getData.ItemGroupList = DAL.Common.PaginatedList<ItemGroupViewModel>.Create(queryable, pageCount, pageListPerPage);
                return Ok(getData);
            }
            else
                return BadRequest(new Exception("Error Occured while fetching customer specific details."));
        }

        public class GetData
        {
            public int TotalRecordsCount { get; set; }
            public List<ItemGroupViewModel> ItemGroupList { get; set; }
        }


        #region Individual grids code

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(ItemgroupModel).GetProperties();
            ColumHeader columnHeader;
            DynamicGridData<ItemgroupModel> dynamicGridData = new DynamicGridData<ItemgroupModel>();
            foreach (PropertyInfo property in propertyInfos)
            {
                columnHeader = new ColumHeader();
                columnHeader.field = property.Name;
                columnHeader.header = property.Name;
                columHeaders.Add(columnHeader);
            }
            dynamicGridData.columHeaders = columHeaders;
            List<ItemgroupModel> itemGroupList = new List<ItemgroupModel>();
            ItemgroupModel itemGroup = null;
            var itemGroups = _unitOfWork.Itemgroup.GetItemgroups();
            foreach (var item in itemGroups)
            {
                itemGroup = new ItemgroupModel();
                itemGroup.ItemGroupId = item.ItemGroupId;
                itemGroup.ItemGroupCode = item.ItemGroupCode;
                itemGroup.Description = item.Description;
                itemGroup.Memo = item.Memo;
                itemGroup.CreatedDate = item.CreatedDate;
                itemGroup.CreatedBy = item.CreatedBy;
                itemGroup.UpdatedDate = item.UpdatedDate;
                itemGroup.UpdatedBy = item.UpdatedBy;
                itemGroupList.Add(itemGroup);
            }
            dynamicGridData.ColumnData = itemGroupList;
            return Ok(dynamicGridData);
        }
        #endregion

    }
}