

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

    [Route("api/AccountingCalendar")]
    public class AccountingCalendarController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;

        #endregion Private Members

        #region Constructor

        public AccountingCalendarController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        #endregion Constructor

        #region Public Methods

        [HttpGet("getAllCalendarData")]
        public IActionResult getAll()
        {
            var calendaData = unitOfWork.Repository<AccountingCalendar>().GetAll().Where(x => x.IsDeleted != true).OrderByDescending(x => x.AccountingCalendarId);
            return Ok(calendaData);
        }

        [HttpPost("addCalendarData")]
        public IActionResult addCalendarData([FromBody] List<AccountingCalendar> calendarObj)
        {
            if (calendarObj != null)
            {
                if (ModelState.IsValid)
                {
                    for (var i = 0; i < calendarObj.Count; i++)
                    {
                        
                        if (calendarObj[i].AccountingCalendarId > 0)
                        {
                            calendarObj[i].UpdatedDate = DateTime.Now.Date;
                            calendarObj[i].isUpdate = true;

                            unitOfWork.Repository<AccountingCalendar>().Update(calendarObj[i]);
                        }
                        else
                        {
                            calendarObj[i].MasterCompanyId = 1;
                            calendarObj[i].IsActive = true;
                            calendarObj[i].IsDeleted = false;
                            calendarObj[i].isUpdate = false;                         
                            calendarObj[i].CreatedDate = DateTime.Now;
                            calendarObj[i].UpdatedDate = DateTime.Now;
                            unitOfWork.Repository<AccountingCalendar>().Add(calendarObj[i]);
                        }
                        
                        unitOfWork.SaveChanges();
                        
                    }
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
            return Ok(ModelState);
        }

        

        #endregion Public Methods

        #region Private Methods

        #endregion Private Methods
    }
}
