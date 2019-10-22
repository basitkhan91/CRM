using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuickApp.Pro.Controllers
{

    [Route("api/StageCode")]
    public class StageCodeController : Controller
    {
        private IUnitOfWork unitOfWork;
        public StageCodeController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpPost("add")]
        public IActionResult add([FromBody]StageCode item)
        {

            if (item != null)
            {
                if (ModelState.IsValid)
                {
                    item.CreatedDate = DateTime.Now;
                    item.UpdatedDate = DateTime.Now;
                    item.UpdatedBy = item.CreatedBy;
                    item.MasterCompanyId = 1;
                    unitOfWork.Repository<StageCode>().Add(item);
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
        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            IEnumerable<StageCode> items = unitOfWork.Repository<StageCode>().GetAll().Where(item => !(item?.IsDelete ?? false)).OrderByDescending(item => item.StageCodeId);
            return Ok(items);
        }

        [HttpGet("getById/{id}")]
        public IActionResult getItemById(long id)
        {
            StageCode item = unitOfWork.Repository<StageCode>().Find(x => x.StageCodeId == id && (bool)x.IsDelete).FirstOrDefault();
            return Ok(item);
        }

        [HttpPost("update")]
        public IActionResult update([FromBody]StageCode item)
        {
            if (item != null)
            {
                if (ModelState.IsValid)
                {
                    item.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<StageCode>().Update(item);
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
            StageCode item = unitOfWork.Repository<StageCode>().Find(x => x.StageCodeId == id).FirstOrDefault();
            if (item != null)
            {
                item.IsDelete = true;
                unitOfWork.Repository<StageCode>().Update(item);
                unitOfWork.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("audit/{id}")]
        public IActionResult getAuditHistory(long id)
        {
            IEnumerable<StageCodeAudit> auditHistory = unitOfWork.Repository<StageCodeAudit>().Find(x => x.StageCodeId == id).OrderByDescending(x => x.StageCodeAuditId).ToList();

            return Ok(auditHistory);
        }
    }
}