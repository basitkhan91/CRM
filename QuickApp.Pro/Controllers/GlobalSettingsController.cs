using DAL;
using DAL.Common;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuickApp.Pro.Controllers
{
    [Route("api/globalsettings")]
    public class GlobalSettingsController : Controller
    {
        private IUnitOfWork _unitOfWork;
        public GlobalSettingsController(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        #region Global Settings

        [HttpPost("createglobalsettings")]
        public IActionResult CreateGlobalSettings([FromBody] GlobalSettings globalSetting)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = _unitOfWork.GlobalSettingsRepository.CreateGlobalSettings(globalSetting);
                    return Ok(result);
                }
                else
                {
                    return BadRequest(ModelState.Values.FirstOrDefault().Errors);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("globalsettings")]
        public IActionResult GetGlobalSettings(int masterCompanyId)
        {
            try
            {
                var result = _unitOfWork.GlobalSettingsRepository.GetGlobalSettings(masterCompanyId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getcultureinfos")]
        public IActionResult GetCultureInfos()
        {
            try
            {
               var result= _unitOfWork.GlobalSettingsRepository.GetCultureInfos();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("globalsettingsinfo")]
        public IActionResult GetGlobalSettingsInfo(string culture)
        {
            try
            {
                var result = _unitOfWork.GlobalSettingsRepository.GetGlobalSettingsInfo(culture);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

        #region Code Prefix

        [HttpPost("createcodeprefix")]
        public IActionResult CreateCodePrefixes([FromBody] CodePrefixes codePrefixes)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = _unitOfWork.GlobalSettingsRepository.CreateCodePrefixes(codePrefixes);
                    return Ok(result);
                }
                else
                {
                    return BadRequest(ModelState.Values.FirstOrDefault().Errors);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("codeprefixebyid")]
        public IActionResult CodePrefixeById(long codePrefixeId)
        {
            try
            {
                var result = _unitOfWork.GlobalSettingsRepository.CodePrefixeById(codePrefixeId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("deletecodeprefix")]
        public IActionResult DeleteCodePrefix(long codePrefixeId, string updatedBy)
        {
            try
            {
                _unitOfWork.GlobalSettingsRepository.DeleteCodePrefix(codePrefixeId, updatedBy);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("codeprefixstatus")]
        public IActionResult CodePrefixStatus(long codePrefixeId, bool status, string updatedBy)
        {
            try
            {
                _unitOfWork.GlobalSettingsRepository.CodePrefixStatus(codePrefixeId, status, updatedBy);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("codeprefixlist")]
        public IActionResult GetCodePrefixList([FromBody] Filters<CodePrefixFilters> cpFilters)
        {
            try
            {
                    var result = _unitOfWork.GlobalSettingsRepository.GetCodePrefixList(cpFilters);
                    return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        #endregion
    }
}