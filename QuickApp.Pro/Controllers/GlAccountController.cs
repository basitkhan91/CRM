using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace QuickApp.Pro.Controllers
{

    [Route("api/GlAccount")]
    public class GlAccountController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public GlAccountController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        #endregion Constructor

        #region Public Methods

        [HttpGet("getAllGLAccount")]
        public IActionResult getAllGLAccount()
        {
            try
            {

                var glAccountData = unitOfWork.Repository<GLAccount>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.GLAccountId);
               return Ok(glAccountData);
            }
            catch(Exception ex)
            {

            }
            return Ok(ModelState);

        }

        [HttpGet("getMiscData")]
        public IActionResult getMiscData()
        {
            var glAccountMiscdata = unitOfWork.Repository<GLAccountMiscCategory>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.GLAccountMiscCategoryId);
            return Ok(glAccountMiscdata);
        }

        
        [HttpGet("getById/{id}")]
        public IActionResult getGlAccountById(long id)
        {
            var glAccountData = unitOfWork.gLAccount.GetAllglacoounts(id);
            return Ok(glAccountData);
        }

        [HttpPost("add")]
        public IActionResult addGlAccount([FromBody]GLAccount glAccountData)
        {
            if (glAccountData != null)
            {
                if (ModelState.IsValid)
                {
                    glAccountData.IsActive = true;
                    glAccountData.MasterCompanyId = 1;
                    glAccountData.CreatedDate = DateTime.Now;
                    unitOfWork.Repository<GLAccount>().Add(glAccountData);
                    unitOfWork.SaveChanges();
                    return Ok(glAccountData);
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
        public IActionResult updateGlAccount([FromBody]GLAccount glAccount)
        {
            if (glAccount != null)
            {
                if (ModelState.IsValid)
                {

                    glAccount.UpdatedDate = DateTime.Now;
                    unitOfWork.Repository<GLAccount>().Update(glAccount);
                    unitOfWork.SaveChanges();
                    return Ok(glAccount);
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

        [HttpGet("removeGlaccountId/{id}")]
        public IActionResult removeGlAccountById(long id)
        {
            var glAccount = unitOfWork.Repository<GLAccount>().Find(x => x.GLAccountId == id).FirstOrDefault();
            if (glAccount != null)
            {
                glAccount.IsDelete = true;
                unitOfWork.Repository<GLAccount>().Update(glAccount);
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
    }
}
