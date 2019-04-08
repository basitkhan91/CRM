﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
            var disposalTypes = unitOfWork.Repository<AssetDisposalType>().GetAll().Where(x => x.IsDelete != true).OrderByDescending(x => x.AssetDisposalTypeId);
            return Ok(disposalTypes);
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
                    disposalType.IsActive = true;
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
    }
}