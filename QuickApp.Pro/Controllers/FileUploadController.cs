using DAL;
using DAL.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.Controllers
{
    [Route("api/[controller]")]

    public class FileUploadController : Controller
    {
        private readonly ApplicationDbContext _context;
        private IUnitOfWork _unitOfWork;
        private AppSettings AppSettings { get; set; }
        public FileUploadController(IUnitOfWork unitOfWork, IOptions<AppSettings> settings, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            AppSettings = settings.Value;
            _context = context;
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
            var result = _unitOfWork.FileUploadRepository.GetAttachmentDetails(attachmentId, referenceId, moduleId);
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
        [HttpGet]
        [Route("downloadattachedfile")]
        public async Task<IActionResult> DownloadAttachedFile(string filePath)
        {


            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, GetContentType(filePath), Path.GetFileName(filePath));
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

        [HttpPost]
        [Route("uploadcustomfile")]
        public IActionResult UploadCustomFile()
        {
            _unitOfWork.FileUploadRepository.UploadCustomFile(Convert.ToString(Request.Form["ModuleName"]), Request.Form.Files[0]);
            return Ok();

        }

        [HttpGet("getFileDocumentDetail/{id}")]
        public IActionResult GetDocumentDetail(long id, int moduleId)
        {
            var allvendorsGenralDocs = _unitOfWork.FileUploadRepository.GetDocumentDetailById(id, moduleId);
            return Ok(allvendorsGenralDocs);
        }

        [HttpDelete("AttachmentDelete/{id}")]
        public IActionResult GetDocumentDelete(long id, string updatedBy)
        {
            var deleteStatus = _unitOfWork.FileUploadRepository.GetDocumentDelete(id, updatedBy);
            return Ok(deleteStatus);
        }

        [HttpPost("commonDocumentUpload")]
        [Produces("application/json")]
        public IActionResult CommonDocumentUploadAction()
        {
            try
            {
                Attachment objAttachment = new Attachment();
                string moduleName = string.Empty;

                if (ModelState.IsValid)
                {
                    if (Request.Form == null)
                        return BadRequest($"{nameof(objAttachment)} cannot be null");
                    objAttachment.MasterCompanyId = Convert.ToInt32(Request.Form["MasterCompanyId"]);
                    objAttachment.UpdatedBy = Request.Form["UpdatedBy"];
                    objAttachment.ReferenceId = Convert.ToInt64(Request.Form["ReferenceId"]);
                    objAttachment.ModuleId = Convert.ToInt32(Request.Form["ModuleId"]);


                    foreach (var val in Enum.GetValues(typeof(ModuleEnum)))
                    {
                        if ((int)val == objAttachment.ModuleId)
                        {
                            moduleName = val.ToString();
                        }
                    }
                    //string moduleName = Request.Form["ModuleName"];


                    if (objAttachment.ReferenceId > 0)
                    {
                        var attachmentData = _context.Attachment.Where(p => p.ReferenceId == objAttachment.ReferenceId && p.ModuleId == objAttachment.ModuleId).FirstOrDefault();

                        if (attachmentData != null)
                        {
                            objAttachment.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objAttachment.ReferenceId,
                                                         objAttachment.ModuleId, moduleName, objAttachment.UpdatedBy, objAttachment.MasterCompanyId, attachmentData.AttachmentId);


                        }
                        else
                        {
                            objAttachment.AttachmentId = _unitOfWork.FileUploadRepository.UploadFiles(Request.Form.Files, objAttachment.ReferenceId,
                                                                       objAttachment.ModuleId, moduleName, objAttachment.UpdatedBy, objAttachment.MasterCompanyId);

                        }

                    }

                    return Ok(objAttachment);
                }
                return Ok(ModelState);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}