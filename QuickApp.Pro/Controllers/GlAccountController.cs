using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuickApp.Pro.ViewModels;

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
                    glAccountData.UpdatedDate = DateTime.Now;
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

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            List<ColumHeader> columHeaders = new List<ColumHeader>();
            PropertyInfo[] propertyInfos = typeof(GLAccountModel).GetProperties();
            ColumHeader columnHeader;
            DynamicGridData<GLAccountModel> dynamicGridData = new DynamicGridData<GLAccountModel>();
            foreach (PropertyInfo property in propertyInfos)
            {
                columnHeader = new ColumHeader();
                columnHeader.field = property.Name;
                columnHeader.header = property.Name;
                columHeaders.Add(columnHeader);
            }
            dynamicGridData.columHeaders = columHeaders;
            List<GLAccountModel> gLAccountModels = new List<GLAccountModel>();
            GLAccountModel gLAccount = null;
            var gLAccounts = unitOfWork.Repository<GLAccount>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.GLAccountId);
            foreach (var item in gLAccounts)
            {
                gLAccount = new GLAccountModel();
                gLAccount.GLAccountTypeId = item.GLAccountTypeId;
                gLAccount.Name = item.AccountName; /// Need to get "Name"
                gLAccount.CreatedDate = item.CreatedDate;
                gLAccount.CreatedBy = item.CreatedBy;
                gLAccount.UpdatedDate = item.UpdatedDate;
                gLAccount.UpdatedBy = item.UpdatedBy;
                //currency.IsActive = item.IsActive;
                gLAccountModels.Add(gLAccount);
            }
            dynamicGridData.ColumnData = gLAccountModels;
            return Ok(dynamicGridData);
        }

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}
