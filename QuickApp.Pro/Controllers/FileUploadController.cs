using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using DAL.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]
    
    public class FileUploadController : Controller
    {
        private IUnitOfWork _unitOfWork;
        private AppSettings AppSettings { get; set; }
        public FileUploadController(IUnitOfWork unitOfWork, IOptions<AppSettings> settings)
        {
            _unitOfWork = unitOfWork;
            AppSettings = settings.Value;
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
        [HttpGet]
        [Route("downloadfile")]
        public async Task<IActionResult> DownloadFile(string filePath)
        {
            if (filePath == null)
                return Content("filename not present");

            //var path = Path.Combine(
            //               Directory.GetCurrentDirectory(),
            //               "wwwroot", filename);

            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, GetContentType(filePath), Path.GetFileName(filePath));
        }

        

        [HttpGet]
        [Route("downloadsamplefile")]
        public async Task<IActionResult> DownloadSampleFile(string moduleName, string fileName)
        {
            var fileFullPath = Path.Combine(AppSettings.SampleUploadFilePath, moduleName, fileName);

            var memory = new MemoryStream();
            using (var stream = new FileStream(fileFullPath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, GetContentType(fileFullPath), Path.GetFileName(fileFullPath));
        }

        private string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return types[ext];
        }

        private Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
            {
                {".txt", "text/plain"},
                {".pdf", "application/pdf"},
                {".doc", "application/vnd.ms-word"},
                {".docx", "application/vnd.ms-word"},
                {".xls", "application/vnd.ms-excel"},
                {".xlsx", "application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet"},
                {".png", "image/png"},
                {".jpg", "image/jpeg"},
                {".jpeg", "image/jpeg"},
                {".gif", "image/gif"},
                {".csv", "text/csv"}
            };
        }
    }
}