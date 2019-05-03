﻿

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
            var calendaData = unitOfWork.Repository<AccountingCalendar>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.AccountingCalendarId);
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
                        calendarObj[i].MasterCompanyId = 1;
                        calendarObj[i].CreatedDate = DateTime.Now;
                        calendarObj[i].UpdatedDate = DateTime.Now;
                        if (calendarObj[i].AccountingCalendarId > 0)
                        {
                            unitOfWork.Repository<AccountingCalendar>().Update(calendarObj[i]);
                        }
                        else
                        {
                            unitOfWork.Repository<AccountingCalendar>().Add(calendarObj[i]);
                        }
                        
                       // unitOfWork.Repository<AccountingCalendar>().Add(calendarObj[i]);
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
