using DAL;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro
{

    [Route("api/receivingRO")]
    public class ReceiveROController : Controller
    {
        #region Private Members

        private IUnitOfWork unitOfWork;
        private string UserName
        {
            get { return "admin"; }
        }

        #endregion Private Members

        #region Constructor

        public ReceiveROController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        #endregion Constructor

        #region Public Members

        [HttpGet("getRepairOrderHeaderById/{repairOrderId}")]
        public IActionResult GetRepairOrderHeaderById(long repairOrderId)
        {
            var repairOrderHeader = unitOfWork.ReceiveRepairOrder.GetRepairOrderHeader(repairOrderId);
            return Ok(repairOrderHeader);
        }

        #endregion Public Members


    }
}
