﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuickApp.Pro.Helpers;
using QuickApp.Pro.ViewModels;

namespace QuickApp.Pro.Controllers
{

    [Route("api/[controller]")]
    public class PurchaseOrderController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        readonly IEmailer _emailer;
        private const string GetActionByIdActionName = "GetActionById";
        public PurchaseOrderController(IUnitOfWork unitOfWork, ILogger<PurchaseOrderController> logger, IEmailer emailer)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _emailer = emailer;
        }


        [HttpGet("Get")]
        [Produces(typeof(List<PurchaseOrderViewModel>))]
        public IActionResult Get()
        {
            var allpurchaseInfo = _unitOfWork.purchaseOrder.GetPurchaseOrderlist(); //.GetAllCustomersData();
            return Ok(Mapper.Map<IEnumerable<PurchaseOrderViewModel>>(allpurchaseInfo));

        }

        [HttpGet("auditHistoryById/{id}")]
        [Produces(typeof(List<AuditHistory>))]
        public IActionResult GetAuditHostoryById(long id)
        {
            var result = _unitOfWork.AuditHistory.GetAllHistory("PurchaseOrder", id); //.GetAllCustomersData();


            try
            {
                var resul1 = Mapper.Map<IEnumerable<AuditHistoryViewModel>>(result);

                return Ok(resul1);
            }
            catch (Exception ex)
            {

                throw;
            }



        }

        [HttpPost("createpoapprover")]
        public IActionResult CreatePOApprovers([FromBody] PurchaseOrderApprover poApprover)
        {
            if (ModelState.IsValid)
            {
                poApprover.POApproverId = _unitOfWork.purchaseOrder.CreatePOApprovers(poApprover);
                return Ok(poApprover);
            }
            return BadRequest(ModelState);
        }

        [HttpPost("updatepoapprover")]
        public IActionResult UpdatePOApprovers([FromBody] PurchaseOrderApprover poApprover)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.purchaseOrder.UpdatePOApprovers(poApprover);
                return Ok(poApprover);
            }
            return BadRequest(ModelState);
        }

        [HttpGet("updatepoapproverstatus")]
        public IActionResult UpdatePOApproversStatus(long poApproverListId, int statusId, string updatedBy)
        {
            _unitOfWork.purchaseOrder.UpdatePOApproversStatus(poApproverListId, statusId, updatedBy);
            return Ok();
        }

        [HttpGet("poapproverslist")]
        public IActionResult GetPoApproversList(long purchaseOrderId)
        {
           var result= _unitOfWork.purchaseOrder.GetPoApproversList(purchaseOrderId);
            return Ok(result);
        }

    }

}