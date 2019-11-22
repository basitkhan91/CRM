using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using DAL.Common;
using DAL.Models;
using DAL.Repositories.Interfaces;
using ExcelDataReader;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace DAL.Repositories
{
    public class CommunicationRepository : Repository<Memo>, ICommunicationRepository
    {
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
        private AppSettings AppSettings { get; set; }
        public CommunicationRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

        #region Memo
        public GetData<Memo> GetMemoList(long referenceId, int moduleId, string memoCode, string description, int pageNumber, int pageSize)
        {
            try
            {
                GetData<Memo> getData = new GetData<Memo>();
                Memo memo;
                pageNumber = pageNumber + 1;
                var take = pageSize;
                var skip = take * (pageNumber - 1);

                getData.TotalRecordsCount = (from m in _appContext.Memo
                                             where m.IsDeleted == false && m.ReferenceId == referenceId && m.ModuleId == moduleId
                                                    && m.MemoCode.Contains(!string.IsNullOrEmpty(memoCode) ? memoCode : m.MemoCode)
                                                    && m.Description.Contains(!string.IsNullOrEmpty(description) ? description : m.Description)
                                             select new
                                             {
                                                 MemoId = m.MemoId,
                                             })
                         .Count();

                var result = (from m in _appContext.Memo
                              where m.IsDeleted == false && m.ReferenceId == referenceId && m.ModuleId == moduleId
                                     && m.MemoCode.Contains(!string.IsNullOrEmpty(memoCode) ? memoCode : m.MemoCode)
                                     && m.Description.Contains(!string.IsNullOrEmpty(description) ? description : m.Description)
                              select new
                              {

                                  MemoId = m.MemoId,
                                  MemoCode = m.MemoCode,
                                  Description = m.Description,
                                  IsActive = m.IsActive,
                                  UpdatedDate = m.UpdatedDate

                              })
                         .OrderByDescending(p => p.UpdatedDate)
                         .Skip(skip)
                         .Take(take)
                         .ToList();

                if (result != null && result.Count > 0)
                {
                    getData.PaginationList = new List<Memo>();
                    foreach (var item in result)
                    {
                        memo = new Memo();
                        memo.MemoId = item.MemoId;
                        memo.MemoCode = item.MemoCode;
                        memo.Description = item.Description;
                        memo.IsActive = item.IsActive;

                        getData.PaginationList.Add(memo);
                    }
                }


                return getData;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public long CreateMemo(Memo memo)
        {
            try
            {
                memo.CreatedDate = memo.UpdatedDate = DateTime.Now;
                memo.IsActive = true;
                memo.IsDeleted = false;
                _appContext.Add(memo);
                _appContext.SaveChanges();
                return memo.MemoId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object GetMemoById(long memoId)
        {
            try
            {
                var result = (from m in _appContext.Memo
                              where m.MemoId == memoId
                              select new
                              {
                                  m
                              })
                              .FirstOrDefault();
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteMemo(long memoId, string updatedBy)
        {
            Memo memo = new Memo();
            memo.MemoId = memoId;
            memo.UpdatedDate = DateTime.Now;
            memo.UpdatedBy = updatedBy;
            memo.IsDeleted = true;

            _appContext.Memo.Attach(memo);
            _context.Entry(memo).Property(x => x.IsDeleted).IsModified = true;
            _context.Entry(memo).Property(x => x.UpdatedDate).IsModified = true;
            _context.Entry(memo).Property(x => x.UpdatedBy).IsModified = true;

            _context.SaveChanges();
        }

        public void MemoStatus(long memoId, bool status, string updatedBy)
        {
            Memo memo = new Memo();
            memo.MemoId = memoId;
            memo.UpdatedDate = DateTime.Now;
            memo.UpdatedBy = updatedBy;
            memo.IsActive = status;

            _appContext.Memo.Attach(memo);
            _context.Entry(memo).Property(x => x.IsActive).IsModified = true;
            _context.Entry(memo).Property(x => x.UpdatedDate).IsModified = true;
            _context.Entry(memo).Property(x => x.UpdatedBy).IsModified = true;

            _context.SaveChanges();
        }

        public IEnumerable<MemoAudit> MemoHistory(long memoId)
        {
            try
            {
                return _appContext.MemoAudit.Where(c => c.MemoId == memoId).OrderByDescending(p => p.UpdatedDate).ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<Memo> UploadCustomData(IFormFile file, long referenceId, int moduleId)
        {
            string memoCode = string.Empty;
            string description = string.Empty;

            List<Memo> memos = new List<Memo>();


            int count = 0;
            try
            {
                Memo memo;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Enum.GetName(typeof(ModuleEnum), moduleId), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                string fullPath = Path.Combine(filePath, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                    {
                        using (var reader = ExcelReaderFactory.CreateReader(stream))
                        {
                            do
                            {
                                while (reader.Read())
                                {
                                    if (count > 0 && !string.IsNullOrEmpty(Convert.ToString(reader.GetValue(0))))
                                    {
                                        var flag = _appContext.Memo.Any(p => p.MemoCode == Convert.ToString(reader.GetValue(0)).Trim() && p.IsDeleted == false);
                                        if (!flag)
                                        {
                                            memo = new Memo();
                                            if (!string.IsNullOrEmpty(Convert.ToString(reader.GetValue(0))))
                                                memoCode = memo.MemoCode = Convert.ToString(reader.GetValue(0)).Trim();
                                            if (!string.IsNullOrEmpty(Convert.ToString(reader.GetValue(1))))
                                                description = memo.Description = Convert.ToString(reader.GetValue(1)).Trim();
                                            memo.MasterCompanyId = 1;
                                            memo.IsActive = true;
                                            memo.IsDeleted = false;
                                            memo.CreatedBy = memo.UpdatedBy = "System";
                                            memo.UpdatedDate = memo.CreatedDate = DateTime.Now;
                                            memo.ReferenceId = referenceId;
                                            memo.ModuleId = moduleId;

                                            _appContext.Memo.Add(memo);
                                            _appContext.SaveChanges();
                                            memo.UploadStatus = "Success";
                                            memos.Add(memo);
                                        }
                                        else
                                        {
                                            memo = new Memo();
                                            if (!string.IsNullOrEmpty(Convert.ToString(reader.GetValue(0))))
                                                memo.MemoCode = Convert.ToString(reader.GetValue(0)).Trim();
                                            if (!string.IsNullOrEmpty(Convert.ToString(reader.GetValue(1))))
                                                memo.Description = Convert.ToString(reader.GetValue(1)).Trim();
                                            memo.MasterCompanyId = 1;
                                            memo.IsActive = true;
                                            memo.IsDeleted = false;
                                            memo.CreatedBy = memo.UpdatedBy = "System";
                                            memo.UpdatedDate = memo.CreatedDate = DateTime.Now;
                                            memo.ReferenceId = referenceId;
                                            memo.ModuleId = moduleId;

                                            memo.UploadStatus = "Duplicate";
                                            memos.Add(memo);
                                        }
                                    }
                                    count++;
                                }
                            } while (reader.NextResult());

                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Memo memo = new Memo();
                memo.MemoCode = memoCode;
                memo.Description = description;
                memo.UploadStatus = "Failed";
                memos.Add(memo);
            }
            return memos;
        }

        #endregion

        #region Email
        public GetData<Email> GetEmailList(long referenceId, int moduleId, int emailTypeId, string subject, long contactById, DateTime? contactDate, int pageNumber, int pageSize)
        {

            try
            {
                GetData<Email> getData = new GetData<Email>();
                Email email;
                pageNumber = pageNumber + 1;
                var take = pageSize;
                var skip = take * (pageNumber - 1);

                getData.TotalRecordsCount = (from e in _appContext.Email
                                             join emp in _appContext.Employee on e.ContactById equals emp.EmployeeId
                                             where e.IsDeleted == false && e.ReferenceId == referenceId && e.ModuleId == moduleId
                                                    && e.EmailTypeId == (emailTypeId > 0 ? emailTypeId : e.EmailTypeId)
                                                    && e.Subject.Contains(!string.IsNullOrEmpty(subject) ? subject : e.Subject)
                                                    && e.ContactById == (contactById > 0 ? contactById : e.ContactById)
                                             select new
                                             {
                                                 EmailId = e.EmailId,
                                             })
                         .Count();

                var result = (from e in _appContext.Email
                              join emp in _appContext.Employee on e.ContactById equals emp.EmployeeId
                              where e.IsDeleted == false && e.ReferenceId == referenceId && e.ModuleId == moduleId
                                                    && e.EmailTypeId == (emailTypeId > 0 ? emailTypeId : e.EmailTypeId)
                                                    && e.Subject.Contains(!string.IsNullOrEmpty(subject) ? subject : e.Subject)
                                                    && e.ContactById == (contactById > 0 ? contactById : e.ContactById)
                              select new
                              {
                                  EmailId = e.EmailId,
                                  EmailType = string.Empty,
                                  Subject = e.Subject,
                                  EmailBody = e.EmailBody,
                                  ContactBy = emp.FirstName + ' ' + emp.LastName,
                                  ContactDate = e.ContactDate,
                                  IsActive = e.IsActive,
                                  UpdatedDate = e.UpdatedDate
                              })
                         .OrderByDescending(p => p.UpdatedDate)
                         .Skip(skip)
                         .Take(take)
                         .ToList();

                if (result != null && result.Count > 0)
                {
                    getData.PaginationList = new List<Email>();
                    foreach (var item in result)
                    {
                        email = new Email();
                        email.EmailId = item.EmailId;
                        email.EmailType = item.EmailType;
                        email.Subject = item.Subject;
                        email.EmailBody = item.EmailBody;
                        email.ContactBy = item.ContactBy;
                        email.ContactDate = item.ContactDate;
                        email.IsActive = item.IsActive;

                        getData.PaginationList.Add(email);
                    }
                }


                return getData;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public long CreateEmail(Email email)
        {
            try
            {
                email.CreatedDate = email.UpdatedDate = DateTime.Now;
                email.IsActive = true;
                email.IsDeleted = false;
                _appContext.Add(email);
                _appContext.SaveChanges();
                return email.EmailId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object GetEmailById(long emailId)
        {
            try
            {
                var result = (from e in _appContext.Email
                              where e.EmailId == emailId
                              select new
                              {
                                  e
                              })
                              .FirstOrDefault();
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteEmail(long emailId, string updatedBy)
        {
            Email email = new Email();
            email.EmailId = emailId;
            email.UpdatedDate = DateTime.Now;
            email.UpdatedBy = updatedBy;
            email.IsDeleted = true;

            _appContext.Email.Attach(email);
            _context.Entry(email).Property(x => x.IsDeleted).IsModified = true;
            _context.Entry(email).Property(x => x.UpdatedDate).IsModified = true;
            _context.Entry(email).Property(x => x.UpdatedBy).IsModified = true;

            _context.SaveChanges();
        }

        public void EmailStatus(long emailId, bool status, string updatedBy)
        {
            Email email = new Email();
            email.EmailId = emailId;
            email.UpdatedDate = DateTime.Now;
            email.UpdatedBy = updatedBy;
            email.IsActive = status;

            _appContext.Email.Attach(email);
            _context.Entry(email).Property(x => x.IsActive).IsModified = true;
            _context.Entry(email).Property(x => x.UpdatedDate).IsModified = true;
            _context.Entry(email).Property(x => x.UpdatedBy).IsModified = true;

            _context.SaveChanges();
        }

        public IEnumerable<EmailAudit> EmailHistory(long emailId)
        {
            try
            {
                return _appContext.EmailAudit.Where(c => c.EmailId == emailId).OrderByDescending(p => p.UpdatedDate).ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        #region Contacts
        public GetData<CommunicationContact> GetCommunicationContactList(long referenceId, int moduleId, int contactTypeId, string contactNo, string memo, long contactById, DateTime? contactDate, int pageNumber, int pageSize)
        {

            try
            {
                GetData<CommunicationContact> getData = new GetData<CommunicationContact>();
                CommunicationContact communicationContact;
                pageNumber = pageNumber + 1;
                var take = pageSize;
                var skip = take * (pageNumber - 1);

                getData.TotalRecordsCount = (from e in _appContext.CommunicationContact
                                             join emp in _appContext.Employee on e.ContactById equals emp.EmployeeId
                                             where e.IsDeleted == false && e.ReferenceId == referenceId && e.ModuleId == moduleId && e.ContactTypeId == contactTypeId
                                                    && e.ContactNo.Contains(!string.IsNullOrEmpty(contactNo) ? contactNo : e.ContactNo)
                                                    && e.Memo.Contains(!string.IsNullOrEmpty(memo) ? memo : e.Memo)
                                                    && e.ContactById == (contactById > 0 ? contactById : e.ContactById)
                                             select new
                                             {
                                                 ContactId = e.ContactId,
                                             })
                         .Count();

                var result = (from e in _appContext.CommunicationContact
                              join emp in _appContext.Employee on e.ContactById equals emp.EmployeeId
                              where e.IsDeleted == false && e.ReferenceId == referenceId && e.ModuleId == moduleId && e.ContactTypeId == contactTypeId
                                     && e.ContactNo.Contains(!string.IsNullOrEmpty(contactNo) ? contactNo : e.ContactNo)
                                     && e.Memo.Contains(!string.IsNullOrEmpty(memo) ? memo : e.Memo)
                                     && e.ContactById == (contactById > 0 ? contactById : e.ContactById)
                              select new
                              {
                                  ContactId = e.ContactId,
                                  ContactNo = e.ContactNo,
                                  ContactBy = emp.FirstName + ' ' + emp.LastName,
                                  ContactDate = e.ContactDate,
                                  Memo = e.Memo,
                                  IsActive = e.IsActive,
                                  UpdatedDate = e.UpdatedDate
                              })
                         .OrderByDescending(p => p.UpdatedDate)
                         .Skip(skip)
                         .Take(take)
                         .ToList();

                if (result != null && result.Count > 0)
                {
                    getData.PaginationList = new List<CommunicationContact>();
                    foreach (var item in result)
                    {
                        communicationContact = new CommunicationContact();
                        communicationContact.ContactId = item.ContactId;
                        communicationContact.ContactNo = item.ContactNo;
                        communicationContact.Memo = item.Memo;
                        communicationContact.ContactBy = item.ContactBy;
                        communicationContact.ContactDate = item.ContactDate;
                        communicationContact.IsActive = item.IsActive;

                        getData.PaginationList.Add(communicationContact);
                    }
                }


                return getData;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public long CreateCommunicationContact(CommunicationContact communicationContact)
        {
            try
            {
                communicationContact.CreatedDate = communicationContact.UpdatedDate = DateTime.Now;
                communicationContact.IsActive = true;
                communicationContact.IsDeleted = false;
                _appContext.Add(communicationContact);
                _appContext.SaveChanges();
                return communicationContact.ContactId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object GetCommunicationContactById(long contactId)
        {
            try
            {
                var result = (from e in _appContext.CommunicationContact
                              where e.ContactId == contactId
                              select new
                              {
                                  e
                              })
                              .FirstOrDefault();
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteCommunicationContact(long contactId, string updatedBy)
        {
            CommunicationContact communicationContact = new CommunicationContact();
            communicationContact.ContactId = contactId;
            communicationContact.UpdatedDate = DateTime.Now;
            communicationContact.UpdatedBy = updatedBy;
            communicationContact.IsDeleted = true;

            _appContext.CommunicationContact.Attach(communicationContact);
            _context.Entry(communicationContact).Property(x => x.IsDeleted).IsModified = true;
            _context.Entry(communicationContact).Property(x => x.UpdatedDate).IsModified = true;
            _context.Entry(communicationContact).Property(x => x.UpdatedBy).IsModified = true;

            _context.SaveChanges();
        }

        public void CommunicationContactStatus(long contactId, bool status, string updatedBy)
        {
            CommunicationContact communicationContact = new CommunicationContact();
            communicationContact.ContactId = contactId;
            communicationContact.UpdatedDate = DateTime.Now;
            communicationContact.UpdatedBy = updatedBy;
            communicationContact.IsActive = status;

            _appContext.CommunicationContact.Attach(communicationContact);
            _context.Entry(communicationContact).Property(x => x.IsActive).IsModified = true;
            _context.Entry(communicationContact).Property(x => x.UpdatedDate).IsModified = true;
            _context.Entry(communicationContact).Property(x => x.UpdatedBy).IsModified = true;

            _context.SaveChanges();
        }

        public IEnumerable<CommunicationContactAudit> CommunicationContactHistory(long contactId)
        {
            try
            {
                return _appContext.CommunicationContactAudit.Where(c => c.ContactId == contactId)
                                                            .OrderByDescending(p => p.UpdatedDate).ToList();
            }
            catch (Exception)
            {

                throw;

            }


        }

        #endregion

        #region Communication Chats
        public GetData<CommunicationChat> GetCommunicationChatList(long referenceId, int moduleId, string notes, long contactById, DateTime? ChatDate, int pageNumber, int pageSize)
        {

            try
            {
                GetData<CommunicationChat> getData = new GetData<CommunicationChat>();
                CommunicationChat communicationChat;
                pageNumber = pageNumber + 1;
                var take = pageSize;
                var skip = take * (pageNumber - 1);

                getData.TotalRecordsCount = (from e in _appContext.CommunicationChat
                                             join emp in _appContext.Employee on e.ContactById equals emp.EmployeeId
                                             where e.IsDeleted == false && e.ReferenceId == referenceId && e.ModuleId == moduleId && e.ContactById == contactById
                                                    && e.Notes.Contains(!string.IsNullOrEmpty(notes) ? notes : e.Notes)
                                                    && e.ContactById == (contactById > 0 ? contactById : e.ContactById)
                                             select new
                                             {
                                                 CommunicationChatId = e.CommunicationChatId,
                                             })
                         .Count();

                var result = (from e in _appContext.CommunicationChat
                              join emp in _appContext.Employee on e.ContactById equals emp.EmployeeId
                              where e.IsDeleted == false && e.ReferenceId == referenceId && e.ModuleId == moduleId && e.ContactById == contactById
                                     && e.Notes.Contains(!string.IsNullOrEmpty(notes) ? notes : e.Notes)
                                     && e.ContactById == (contactById > 0 ? contactById : e.ContactById)
                              select new
                              {
                                  CommunicationChatId = e.CommunicationChatId,
                                  Notes = e.Notes,
                                  ContactBy = emp.FirstName + ' ' + emp.LastName,
                                  ContactDate = e.ContactDate,
                                  IsActive = e.IsActive,
                                  UpdatedDate = e.UpdatedDate
                              })
                         .OrderByDescending(p => p.UpdatedDate)
                         .Skip(skip)
                         .Take(take)
                         .ToList();

                if (result != null && result.Count > 0)
                {
                    getData.PaginationList = new List<CommunicationChat>();
                    foreach (var item in result)
                    {
                        communicationChat = new CommunicationChat();
                        communicationChat.CommunicationChatId = item.CommunicationChatId;
                        communicationChat.Notes = item.Notes;
                        communicationChat.ContactBy = item.ContactBy;
                        communicationChat.ContactDate = item.ContactDate;
                        communicationChat.IsActive = item.IsActive;

                        getData.PaginationList.Add(communicationChat);
                    }
                }


                return getData;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public long CreateCommunicationChat(CommunicationChat communicationChat)
        {
            try
            {
                communicationChat.CreatedDate = communicationChat.UpdatedDate = DateTime.Now;
                communicationChat.IsActive = true;
                communicationChat.IsDeleted = false;
                _appContext.Add(communicationChat);
                _appContext.SaveChanges();
                return communicationChat.CommunicationChatId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object GetCommunicationChatById(long communicationChatId)
        {
            try
            {
                var result = (from e in _appContext.CommunicationChat
                              where e.CommunicationChatId == communicationChatId
                              select new
                              {
                                  e
                              })
                              .FirstOrDefault();
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteCommunicationChat(long communicationChatId, string updatedBy)
        {
            CommunicationChat communicationChat = new CommunicationChat();
            communicationChat.CommunicationChatId = communicationChatId;
            communicationChat.UpdatedDate = DateTime.Now;
            communicationChat.UpdatedBy = updatedBy;
            communicationChat.IsDeleted = true;

            _appContext.CommunicationChat.Attach(communicationChat);
            _context.Entry(communicationChat).Property(x => x.IsDeleted).IsModified = true;
            _context.Entry(communicationChat).Property(x => x.UpdatedDate).IsModified = true;
            _context.Entry(communicationChat).Property(x => x.UpdatedBy).IsModified = true;

            _context.SaveChanges();
        }

        public void CommunicationChatStatus(long communicationChatId, bool status, string updatedBy)
        {
            CommunicationChat communicationChat = new CommunicationChat();
            communicationChat.CommunicationChatId = communicationChatId;
            communicationChat.UpdatedDate = DateTime.Now;
            communicationChat.UpdatedBy = updatedBy;
            communicationChat.IsActive = status;

            _appContext.CommunicationChat.Attach(communicationChat);
            _context.Entry(communicationChat).Property(x => x.IsActive).IsModified = true;
            _context.Entry(communicationChat).Property(x => x.UpdatedDate).IsModified = true;
            _context.Entry(communicationChat).Property(x => x.UpdatedBy).IsModified = true;

            _context.SaveChanges();
        }

        public IEnumerable<CommunicationChatAudit> CommunicationChatHistory(long communicationChatId)
        {
            try
            {
                return _appContext.CommunicationChatAudit.Where(c => c.CommunicationChatId == communicationChatId)
                                                            .OrderByDescending(p => p.UpdatedDate).ToList();
            }
            catch (Exception)
            {

                throw;

            }


        }

        #endregion

    }
}
