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
    public class ManufacturerController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        public ManufacturerController(IUnitOfWork unitOfWork, ILogger<ManufacturerController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;

        }
        [HttpGet("Get")]
        [Produces(typeof(List<ManufacturerViewModel>))]
        public IActionResult Get()
        {
            var allManufacturer = _unitOfWork.Manufacturer.GetAllManufacturerData();
            return Ok(Mapper.Map<IEnumerable<ManufacturerViewModel>>(allManufacturer));

        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("Manufacturer", id);

            try
            {
                var resul1 = Mapper.Map<IEnumerable<ManufacturerViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }

        [HttpPost("manufacturerpost")]
        //[Authorize(Authorization.Policies.ManageAllRolesPolicy)]
        public IActionResult CreateAction([FromBody] ManufacturerViewModel ManufacturerViewModel)
        {
            if (ModelState.IsValid)
            {
                if (ManufacturerViewModel == null)
                    return BadRequest($"{nameof(ManufacturerViewModel)} cannot be null");

                DAL.Models.Manufacturer manufacturerobject = new DAL.Models.Manufacturer();
                manufacturerobject.ManufacturerId = ManufacturerViewModel.ManufacturerId;
                manufacturerobject.Comments = ManufacturerViewModel.Comments;
                manufacturerobject.Name = ManufacturerViewModel.Name;
                manufacturerobject.MasterCompanyId = ManufacturerViewModel.MasterCompanyId;
                manufacturerobject.IsActive = ManufacturerViewModel.IsActive;
                manufacturerobject.CreatedDate = DateTime.Now;
                manufacturerobject.UpdatedDate = DateTime.Now;
                manufacturerobject.CreatedBy = ManufacturerViewModel.CreatedBy;
                manufacturerobject.UpdatedBy = ManufacturerViewModel.UpdatedBy;
                _unitOfWork.Manufacturer.Add(manufacturerobject);
                _unitOfWork.SaveChanges();

            }

            return Ok(ModelState);
        }
        [HttpPut("manufacturerpost/{id}")]
        public IActionResult UpdateAction(long id, [FromBody] ManufacturerViewModel ManufacturerViewModel)
        {

            if (ModelState.IsValid)
            {
                if (ManufacturerViewModel == null)
                    return BadRequest($"{nameof(ManufacturerViewModel)} cannot be null");

                var existingResult = _unitOfWork.Manufacturer.GetSingleOrDefault(c => c.ManufacturerId == id);
                // DAL.Models.Action updateObject = new DAL.Models.Action();


                existingResult.UpdatedDate = DateTime.Now;
                existingResult.UpdatedBy = ManufacturerViewModel.UpdatedBy;
                existingResult.ManufacturerId = ManufacturerViewModel.ManufacturerId;
                existingResult.Name = ManufacturerViewModel.Name;
                existingResult.Comments = ManufacturerViewModel.Comments;
                existingResult.IsActive = ManufacturerViewModel.IsActive;
                existingResult.MasterCompanyId = ManufacturerViewModel.MasterCompanyId;

                _unitOfWork.Manufacturer.Update(existingResult);
                _unitOfWork.SaveChanges();

            }


            return Ok(ModelState);
        }
        [HttpDelete("manufacturerpost/{id}")]
        [Produces(typeof(ManufacturerViewModel))]
        public IActionResult DeleteAction(long id)
        {
            var existingResult = _unitOfWork.Manufacturer.GetSingleOrDefault(c => c.ManufacturerId == id);
            existingResult.IsDelete = true;
            _unitOfWork.Manufacturer.Update(existingResult);

            //_unitOfWork.ActionAttribute.Remove(existingResult);

            _unitOfWork.SaveChanges();

            return Ok(id);
        }

        [HttpGet("audits/{Id}")]
        public IActionResult GetManufacturerAuditDetails(long Id)
        {
            var audits = _unitOfWork.Repository<ManufacturerAudit>()
                .Find(x => x.ManufacturerId == Id)
                .OrderByDescending(x => x.ManufacturerAuditId).ToList();
            var auditResult = new List<AuditResult<ManufacturerAudit>>();

            auditResult.Add(new AuditResult<ManufacturerAudit>
            {
                AreaName = "Manufacturer",
                Memo = "",
                Result = audits
            });

            return Ok(auditResult);
        }
        

        [HttpPost("pagination")]
        public IActionResult GetManufacturer([FromBody]ManufacturerPaginationViewModel paginate)
        {
            GetData getData = new GetData();
            IQueryable<ManufacturerPaginationViewModel> queryable = null;
            List<ManufacturerPaginationViewModel> manufacturerList = new List<ManufacturerPaginationViewModel>();
            ManufacturerPaginationViewModel manufacturer = null;
            if (!string.IsNullOrEmpty(paginate.Name)
                || !string.IsNullOrEmpty(paginate.Comments)
                || !string.IsNullOrEmpty(paginate.CreatedBy)
                || !string.IsNullOrEmpty(paginate.UpdatedBy))
            {
                //var manufacturers = _unitOfWork.manufacturer;
                var manufacturers = _unitOfWork.Manufacturer.GetAllManufacturerData();
                foreach (var item in manufacturers)
                {
                    manufacturer = new ManufacturerPaginationViewModel();
                    manufacturer.ManufacturerId = item.ManufacturerId;
                    manufacturer.Name = item.Name;
                    manufacturer.Comments = item.Comments;
                    manufacturer.CreatedDate = item.CreatedDate;
                    manufacturer.CreatedBy = item.CreatedBy;
                    manufacturer.UpdatedDate = item.UpdatedDate;
                    manufacturer.UpdatedBy = item.UpdatedBy;
                    manufacturer.IsActive = item.IsActive;
                    manufacturerList.Add(manufacturer);
                }
                if (!string.IsNullOrEmpty(paginate.Name))
                {
                    manufacturerList = manufacturerList.Where(c => c.Name != null && c.Name.ToUpper().Contains(paginate.Name.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.Comments))
                {
                    manufacturerList = manufacturerList.Where(c => c.Comments != null && c.Comments.ToUpper().Contains(paginate.Comments.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.CreatedBy))
                {
                    manufacturerList = manufacturerList.Where(c => c.CreatedBy != null && c.CreatedBy.ToUpper().Contains(paginate.CreatedBy.ToUpper().Trim())).ToList();
                }
                if (!string.IsNullOrEmpty(paginate.UpdatedBy))
                {
                    manufacturerList = manufacturerList.Where(c => c.UpdatedBy != null && c.UpdatedBy.ToUpper().Contains(paginate.UpdatedBy.ToUpper().Trim())).ToList();
                }
                getData.TotalRecordsCount = manufacturerList.Count();
            }
            else
            {
                var manufacturers = _unitOfWork.Manufacturer.GetAllManufacturerData();
                foreach (var item in manufacturers)
                {
                    manufacturer = new ManufacturerPaginationViewModel();
                    manufacturer.ManufacturerId = item.ManufacturerId;
                    manufacturer.Name = item.Name;
                    manufacturer.Comments = item.Comments;
                    manufacturer.CreatedDate = item.CreatedDate;
                    manufacturer.CreatedBy = item.CreatedBy;
                    manufacturer.UpdatedDate = item.UpdatedDate;
                    manufacturer.UpdatedBy = item.UpdatedBy;
                    manufacturer.IsActive = item.IsActive;
                    manufacturerList.Add(manufacturer);
                    getData.TotalRecordsCount = manufacturerList.Count();
                }
            }
            queryable = manufacturerList.AsQueryable();

            if (paginate != null)
            {
                var pageListPerPage = paginate.rows;
                var pageIndex = paginate.first;
                var pageCount = (pageIndex / pageListPerPage) + 1;
                getData.ManufacturerList = DAL.Common.PaginatedList<ManufacturerPaginationViewModel>.Create(queryable, pageCount, pageListPerPage);
                return Ok(getData);
            }
            else
                return BadRequest(new Exception("Error Occured while fetching customer specific details."));
        }

        public class GetData
        {
            public int TotalRecordsCount { get; set; }
            public List<ManufacturerPaginationViewModel> ManufacturerList { get; set; }
        }
        #region Individual grids code

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(ManufacturerModel).GetProperties();
            ColumHeader columnHeader;
            DynamicGridData<ManufacturerModel> dynamicGridData = new DynamicGridData<ManufacturerModel>();
            foreach (PropertyInfo property in propertyInfos)
            {
                columnHeader = new ColumHeader();
                columnHeader.field = property.Name;
                columnHeader.header = property.Name;
                columHeaders.Add(columnHeader);
            }
            dynamicGridData.columHeaders = columHeaders;
            List<ManufacturerModel> manufacturerList = new List<ManufacturerModel>();
            ManufacturerModel manufacturer = null;
            var manufacturers = _unitOfWork.Manufacturer.GetAllManufacturerData();
            foreach (var item in manufacturers)
            {
                manufacturer = new ManufacturerModel();
                manufacturer.ManufacturerId = item.ManufacturerId;
                manufacturer.Name = item.Name;
                manufacturer.Comments = item.Comments;
                manufacturer.CreatedDate = item.CreatedDate;
                manufacturer.CreatedBy = item.CreatedBy;
                manufacturer.UpdatedDate = item.UpdatedDate;
                manufacturer.UpdatedBy = item.UpdatedBy;
                //manufacturer.IsActive = item.IsActive;
                manufacturerList.Add(manufacturer);
            }
            dynamicGridData.ColumnData = manufacturerList;
            return Ok(dynamicGridData);
        }
        #endregion
    }
}



