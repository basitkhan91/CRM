using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{

    [Route("api/DisposalType")]
    public class DisposalTypeController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public DisposalTypeController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Methods

        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(AssetDisposalTypeColModel).GetProperties();
            ColumHeader columnHeader;
            DynamicGridData<dynamic> dynamicGridData = new DynamicGridData<dynamic>();
            foreach (PropertyInfo property in propertyInfos)
            {
                columnHeader = new ColumHeader();
                columnHeader.field = char.ToLower(property.Name[0]) + property.Name.Substring(1);//FirstCharToUpper(property.Name);
                // columnHeader.field = property.Name;
                columnHeader.header = property.Name;
                columHeaders.Add(columnHeader);
            }
            dynamicGridData.columHeaders = columHeaders;
            List<AssetDisposalTypeSPModel> assetDisposalMethods = new List<AssetDisposalTypeSPModel>();
            AssetDisposalTypeSPModel assetDisposalType = null;
            var gLAccounts = unitOfWork.Repository<AssetDisposalType>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.AssetDisposalTypeId);
            foreach (var item in gLAccounts)
            {
                assetDisposalType = new AssetDisposalTypeSPModel();

                assetDisposalType.Code = item.AssetDisposalCode;
                assetDisposalType.Name = item.AssetDisposalName;
                assetDisposalType.Memo = item.AssetDisposalMemo;
                assetDisposalType.AssetDisposalTypeId = item.AssetDisposalTypeId;
                assetDisposalType.CreatedDate = item.CreatedDate;
                assetDisposalType.CreatedBy = item.CreatedBy;
                assetDisposalType.UpdatedDate = item.UpdatedDate;
                assetDisposalType.UpdatedBy = item.UpdatedBy;
                assetDisposalType.IsActive = item.IsActive;
                assetDisposalMethods.Add(assetDisposalType);
            }
            dynamicGridData.ColumnData = assetDisposalMethods;
            return Ok(dynamicGridData);

            //var disposalTypes = unitOfWork.Repository<AssetDisposalType>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.AssetDisposalTypeId);
            //return Ok(disposalTypes);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getdisposalTypeById(long id)
        {
            var disposalType = unitOfWork.Repository<AssetDisposalType>().Find(x => x.AssetDisposalTypeId == id && x.IsDelete != true);
            return Ok(disposalType);
        }

        [HttpPost("add")]
        public IActionResult adddisposalType([FromBody]AssetDisposalType disposalType)
        {
            if (disposalType != null)
            {
                if (ModelState.IsValid)
                {
                    disposalType.CreatedDate = DateTime.Now;
                    disposalType.UpdatedDate = DateTime.Now;
                    disposalType.IsActive = disposalType.IsActive;
                    disposalType.MasterCompanyId = 1;
                    unitOfWork.Repository<AssetDisposalType>().Add(disposalType);
                    unitOfWork.SaveChanges();
                    return Ok(disposalType);
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

        [HttpPost("update")]
        public IActionResult updatedisposalType([FromBody]AssetDisposalType disposalType)
        {
            if (disposalType != null)
            {
                if (ModelState.IsValid)
                {
                    disposalType.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AssetDisposalType>().Update(disposalType);
                    unitOfWork.SaveChanges();
                    return Ok(disposalType);
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

        [HttpGet("removeById/{id}")]
        public IActionResult removedisposalTypeById(long id)
        {
            var disposalType = unitOfWork.Repository<AssetDisposalType>().Find(x => x.AssetDisposalTypeId == id).FirstOrDefault();
            if (disposalType != null)
            {
                disposalType.IsDelete = true;
                unitOfWork.Repository<AssetDisposalType>().Update(disposalType);
                unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods

        [HttpGet("audits/{id}")]
        public IActionResult AuditDetails(long id)
        {
            var audits = unitOfWork.Repository<AssetDisposalTypeAudit>()
                .Find(x => x.AssetDisposalTypeId == id)
                .OrderByDescending(x => x.AssetDisposalTypeAuditId);

            var auditResult = new List<AuditResult<AssetDisposalTypeAudit>>();

            auditResult.Add(new AuditResult<AssetDisposalTypeAudit> { AreaName = "Disposal", Result = audits.ToList() });

            return Ok(auditResult);
        }
    }
}