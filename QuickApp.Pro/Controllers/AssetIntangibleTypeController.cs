using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuickApp.Pro.Controllers
{

    [Route("api/AssetIntangibleType")]
    public class AssetIntangibleTypeController : Controller
    {
        private IUnitOfWork unitOfWork;
        public AssetIntangibleTypeController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpPost("add")]
        public IActionResult add([FromBody]AssetIntangibleType item)
        {
            try
            {
                if (item != null)
                {
                    if (ModelState.IsValid)
                    {
                        item.CreatedDate = DateTime.Now;
                        item.UpdatedDate = DateTime.Now;
                        item.UpdatedBy = item.CreatedBy;
                        item.MasterCompanyId = 1;
                        unitOfWork.Repository<AssetIntangibleType>().Add(item);
                        unitOfWork.SaveChanges();
                        return Ok(item);
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
            catch (Exception ex)
            {

                throw ex;
            }

        }
        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            IEnumerable<AssetIntangibleType> items = unitOfWork.Repository<AssetIntangibleType>().GetAll().Where(x => !x.IsDelete).OrderByDescending(x => x.AssetIntangibleTypeId);
            return Ok(items);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getAssetById(long id)
        {
            AssetIntangibleType item = unitOfWork.Repository<AssetIntangibleType>().Find(x => x.AssetIntangibleTypeId == id && x.IsDelete).FirstOrDefault();
            return Ok(item);
        }

        [HttpPost("update")]
        public IActionResult update([FromBody]AssetIntangibleType item)
        {
            if (item != null)
            {
                if (ModelState.IsValid)
                {
                    item.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<AssetIntangibleType>().Update(item);
                    unitOfWork.SaveChanges();
                    return Ok(item);
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
        public IActionResult removeItemById(long id)
        {
            AssetIntangibleType item = unitOfWork.Repository<AssetIntangibleType>().Find(x => x.AssetIntangibleTypeId == id).FirstOrDefault();
            if (item != null)
            {
                item.IsDelete = true;
                unitOfWork.Repository<AssetIntangibleType>().Update(item);
                unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("audit/{id}")]
        public IActionResult AuditHistory(long id)
        {
            IEnumerable<AssetIntangibleTypeAudit> auditHistory = unitOfWork.Repository<AssetIntangibleTypeAudit>().Find(x => x.AssetIntangibleTypeId == id).OrderByDescending(x => x.AssetIntangibleTypeAuditId).ToList();

            return Ok(auditHistory);
        }
    }
}