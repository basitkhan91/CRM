using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    
    public class FileUploadController : Controller
    {
        private IUnitOfWork _unitOfWork;
        public FileUploadController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        [Route("uploadfiles")]
        public IActionResult UploadFiles(long? referenceId, int moduleId, string moduleName, string uploadedBy, int? masterCompanyId)
        {
            _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, referenceId, moduleId, moduleName, uploadedBy, masterCompanyId);
            return Ok();

        }

        [HttpGet]
        [Route("getattachmentdetails")]
        public IActionResult GetAttachmentDetails(long attachmentId, long? referenceId, int moduleId)
        {
           var result= _unitOfWork.FileUploadRepository.GetAttachmentDetails(attachmentId, referenceId, moduleId);
            return Ok(result);

        }

        [HttpGet]
        [Route("deleteattachement")]
        public IActionResult DeleteAttachement(List<long> attachmentDetailIds, string deletedBy)
        {
             _unitOfWork.FileUploadRepository.DeleteAttachement(attachmentDetailIds, deletedBy);
            return Ok();

        }
    }
}