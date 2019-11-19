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
    [Route("api/[controller]")]
    public class CommunicationController : Controller
    {

        private IUnitOfWork _unitOfWork;
        private readonly ApplicationDbContext _context;

        public CommunicationController(IUnitOfWork unitOfWork, ApplicationDbContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
        }

        #region Memo

        [HttpGet("memoList")]
        public IActionResult GetMemoList(long referenceId = 0, int moduleId = 0, string memoCode = "", string description = "", int pageNumber = 0, int pageSize = 10)
        {
            var result = _unitOfWork.CommunicationRepository.GetMemoList(referenceId, moduleId, memoCode, description, pageNumber, pageSize);
            return Ok(result);
        }

        [HttpGet("memobyid")]
        public IActionResult GetMemoById(long memoId)
        {
            var result = _unitOfWork.CommunicationRepository.GetMemoById(memoId);
            return Ok(result);

        }

        [HttpPost("creatememo")]
        public IActionResult CreateMemo(Memo memo)
        {
            if (ModelState.IsValid)
            {
                memo.MemoId = _unitOfWork.CommunicationRepository.CreateMemo(memo);
                return Ok(memo);
            }
            return Ok(ModelState);
        }

        [HttpPost("updatememo")]
        public IActionResult UpdateMemo(Memo memo)
        {
            if (ModelState.IsValid)
            {
                IDictionary<string, object> keyValuePairs = new Dictionary<string, object>();
                var dbResult = (Memo)_unitOfWork.CommunicationRepository.GetMemoById(memo.MemoId);
                dbResult = _unitOfWork.CommonRepository.UpdateEntity(memo, dbResult, ref keyValuePairs);
                if (keyValuePairs != null && keyValuePairs.Count > 0)
                {
                    _context.Memo.Attach(dbResult);
                    foreach (var item in keyValuePairs)
                    {
                        _context.Entry(dbResult).Property(item.Key).IsModified = true;
                    }

                    dbResult.UpdatedDate = DateTime.Now;
                    dbResult.UpdatedBy = memo.UpdatedBy;

                    _context.Entry(dbResult).Property(x => x.UpdatedDate).IsModified = true;
                    _context.Entry(dbResult).Property(x => x.UpdatedBy).IsModified = true;

                    _context.SaveChanges();
                }
                return Ok(dbResult);
            }
            return Ok(ModelState);
        }

        [HttpGet("deletememo")]
        public IActionResult DeleteMemo(long memoId, string updatedBy)
        {
            _unitOfWork.CommunicationRepository.DeleteMemo(memoId, updatedBy);
            return Ok();

        }

        [HttpGet("memostatus")]
        public IActionResult MemoStatus(long memoId, bool status, string updatedBy)
        {
            _unitOfWork.CommunicationRepository.MemoStatus(memoId, status, updatedBy);
            return Ok();

        }

        [HttpGet("memohistory")]
        public IActionResult MemoHistory(long memoId)
        {
            var result = _unitOfWork.CommunicationRepository.MemoHistory(memoId);
            return Ok(result);

        }

        [HttpPost("uploadmemocustomdata")]
        public IActionResult UploadCustomData()
        {
            long referenceId = 0;
            int moduleId = 0;
            var result = _unitOfWork.CommunicationRepository.UploadCustomData(Request.Form.Files[0], referenceId, moduleId);
            return Ok(result);
        }

        #endregion

        #region Email

        [HttpGet("emailList")]
        public IActionResult GetEmailList(long referenceId = 0, int moduleId = 0, int emailTypeId = 0, string subject = "", long contactById = 0, DateTime? contactDate = null, int pageNumber = 0, int pageSize = 10)
        {
            var result = _unitOfWork.CommunicationRepository.GetEmailList(referenceId, moduleId, emailTypeId, subject, contactById, contactDate, pageNumber, pageSize);
            return Ok(result);
        }

        [HttpGet("emailbyid")]
        public IActionResult GetEmailById(long emailId)
        {
            var result = _unitOfWork.CommunicationRepository.GetEmailById(emailId);
            return Ok(result);

        }

        [HttpPost("createemail")]
        public IActionResult CreateEmail(Email email)
        {
            if (ModelState.IsValid)
            {
                email.EmailId = _unitOfWork.CommunicationRepository.CreateEmail(email);
                return Ok(email);
            }
            return Ok(ModelState);
        }

        [HttpPost("updateemail")]
        public IActionResult UpdateEmail(Email email)
        {
            if (ModelState.IsValid)
            {
                IDictionary<string, object> keyValuePairs = new Dictionary<string, object>();
                var dbResult = (Email)_unitOfWork.CommunicationRepository.GetEmailById(email.EmailId);
                dbResult = _unitOfWork.CommonRepository.UpdateEntity(email, dbResult, ref keyValuePairs);
                if (keyValuePairs != null && keyValuePairs.Count > 0)
                {
                    _context.Email.Attach(dbResult);
                    foreach (var item in keyValuePairs)
                    {
                        _context.Entry(dbResult).Property(item.Key).IsModified = true;
                    }

                    dbResult.UpdatedDate = DateTime.Now;
                    dbResult.UpdatedBy = email.UpdatedBy;

                    _context.Entry(dbResult).Property(x => x.UpdatedDate).IsModified = true;
                    _context.Entry(dbResult).Property(x => x.UpdatedBy).IsModified = true;

                    _context.SaveChanges();
                }
                return Ok(dbResult);
            }
            return Ok(ModelState);
        }

        [HttpGet("deleteemail")]
        public IActionResult DeleteEmail(long emailId, string updatedBy)
        {
            _unitOfWork.CommunicationRepository.DeleteEmail(emailId, updatedBy);
            return Ok();

        }

        [HttpGet("emailstatus")]
        public IActionResult EmailStatus(long emailId, bool status, string updatedBy)
        {
            _unitOfWork.CommunicationRepository.EmailStatus(emailId, status, updatedBy);
            return Ok();

        }

        [HttpGet("emailhistory")]
        public IActionResult EmailHistory(long emailId)
        {
            var result = _unitOfWork.CommunicationRepository.EmailHistory(emailId);
            return Ok(result);

        }



        #endregion

        #region Communication Contact 

        [HttpGet("communicationcontactlist")]
        public IActionResult GetCommunicationContactList(long referenceId = 0, int moduleId = 0, int contactTypeId=0, string phoneNo = "", string memo = "", long contactById = 0, DateTime? contactDate = null, int pageNumber = 0, int pageSize = 10)
        {
            var result = _unitOfWork.CommunicationRepository.GetCommunicationContactList(referenceId, moduleId, contactTypeId, phoneNo, memo, contactById, contactDate, pageNumber, pageSize);
            return Ok(result);
        }

        [HttpGet("communicationcontactbyid")]
        public IActionResult GetCommunicationContactById(long communicationContactId)
        {
            var result = _unitOfWork.CommunicationRepository.GetCommunicationContactById(communicationContactId);
            return Ok(result);

        }

        [HttpPost("createcommunicationcontact")]
        public IActionResult CreateCommunicationContact(CommunicationContact communicationContact)
        {
            if (ModelState.IsValid)
            {
                communicationContact.ContactId = _unitOfWork.CommunicationRepository.CreateCommunicationContact(communicationContact);
                return Ok(communicationContact);
            }
            return Ok(ModelState);
        }

        [HttpPost("updatecommunicationcontact")]
        public IActionResult UpdateCommunicationContact(CommunicationContact communicationContact)
        {
            if (ModelState.IsValid)
            {
                IDictionary<string, object> keyValuePairs = new Dictionary<string, object>();
                var dbResult = (CommunicationContact)_unitOfWork.CommunicationRepository.GetCommunicationContactById(communicationContact.ContactId);
                dbResult = _unitOfWork.CommonRepository.UpdateEntity(communicationContact, dbResult, ref keyValuePairs);
                if (keyValuePairs != null && keyValuePairs.Count > 0)
                {
                    _context.CommunicationContact.Attach(dbResult);
                    foreach (var item in keyValuePairs)
                    {
                        _context.Entry(dbResult).Property(item.Key).IsModified = true;
                    }

                    dbResult.UpdatedDate = DateTime.Now;
                    dbResult.UpdatedBy = communicationContact.UpdatedBy;

                    _context.Entry(dbResult).Property(x => x.UpdatedDate).IsModified = true;
                    _context.Entry(dbResult).Property(x => x.UpdatedBy).IsModified = true;

                    _context.SaveChanges();
                }
                return Ok(dbResult);
            }
            return Ok(ModelState);
        }

        [HttpGet("deletecommunicationcontact")]
        public IActionResult DeleteCommunicationContact(long communicationContactId, string updatedBy)
        {
            _unitOfWork.CommunicationRepository.DeleteCommunicationContact(communicationContactId, updatedBy);
            return Ok();

        }

        [HttpGet("communicationcontactstatus")]
        public IActionResult CommunicationContactStatus(long communicationContactId, bool status, string updatedBy)
        {
            _unitOfWork.CommunicationRepository.CommunicationContactStatus(communicationContactId, status, updatedBy);
            return Ok();

        }

        [HttpGet("communicationcontacthistory")]
        public IActionResult CommunicationContactHistory(long communicationContactId)
        {
            var result = _unitOfWork.CommunicationRepository.CommunicationContactHistory(communicationContactId);
            return Ok(result);

        }



        #endregion

        #region Communication Chat 

        [HttpGet("communicationchatlist")]
        public IActionResult GetCommunicationChatList(long referenceId = 0, int moduleId = 0,  string notes = "", long ChatById = 0, DateTime? ChatDate = null, int pageNumber = 0, int pageSize = 10)
        {
            var result = _unitOfWork.CommunicationRepository.GetCommunicationChatList(referenceId, moduleId, notes, ChatById, ChatDate, pageNumber, pageSize);
            return Ok(result);
        }

        [HttpGet("communicationchatbyid")]
        public IActionResult GetCommunicationChatById(long communicationChatId)
        {
            var result = _unitOfWork.CommunicationRepository.GetCommunicationChatById(communicationChatId);
            return Ok(result);

        }

        [HttpPost("createcommunicationchat")]
        public IActionResult CreateCommunicationChat(CommunicationChat communicationChat)
        {
            if (ModelState.IsValid)
            {
                communicationChat.CommunicationChatId = _unitOfWork.CommunicationRepository.CreateCommunicationChat(communicationChat);
                return Ok(communicationChat);
            }
            return Ok(ModelState);
        }

        [HttpPost("updatecommunicationchat")]
        public IActionResult UpdateCommunicationChat(CommunicationChat communicationChat)
        {
            if (ModelState.IsValid)
            {
                IDictionary<string, object> keyValuePairs = new Dictionary<string, object>();
                var dbResult = (CommunicationChat)_unitOfWork.CommunicationRepository.GetCommunicationChatById(communicationChat.CommunicationChatId);
                dbResult = _unitOfWork.CommonRepository.UpdateEntity(communicationChat, dbResult, ref keyValuePairs);
                if (keyValuePairs != null && keyValuePairs.Count > 0)
                {
                    _context.CommunicationChat.Attach(dbResult);
                    foreach (var item in keyValuePairs)
                    {
                        _context.Entry(dbResult).Property(item.Key).IsModified = true;
                    }

                    dbResult.UpdatedDate = DateTime.Now;
                    dbResult.UpdatedBy = communicationChat.UpdatedBy;

                    _context.Entry(dbResult).Property(x => x.UpdatedDate).IsModified = true;
                    _context.Entry(dbResult).Property(x => x.UpdatedBy).IsModified = true;

                    _context.SaveChanges();
                }
                return Ok(dbResult);
            }
            return Ok(ModelState);
        }

        [HttpGet("deletecommunicationchat")]
        public IActionResult DeleteCommunicationChat(long communicationChatId, string updatedBy)
        {
            _unitOfWork.CommunicationRepository.DeleteCommunicationChat(communicationChatId, updatedBy);
            return Ok();

        }

        [HttpGet("communicationchatstatus")]
        public IActionResult CommunicationChatStatus(long communicationChatId, bool status, string updatedBy)
        {
            _unitOfWork.CommunicationRepository.CommunicationChatStatus(communicationChatId, status, updatedBy);
            return Ok();

        }

        [HttpGet("communicationchathistory")]
        public IActionResult CommunicationChatHistory(long communicationChatId)
        {
            var result = _unitOfWork.CommunicationRepository.CommunicationChatHistory(communicationChatId);
            return Ok(result);

        }



        #endregion
    }
}