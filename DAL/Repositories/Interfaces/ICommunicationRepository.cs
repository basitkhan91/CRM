using System;
using System.Collections.Generic;
using DAL.Common;
using DAL.Models;
using Microsoft.AspNetCore.Http;

namespace DAL.Repositories.Interfaces
{
    public interface ICommunicationRepository : IRepository<Memo>
    {
        GetData<Memo> GetMemoList(long referenceId, int moduleId, string memoCode, string description, int pageNumber, int pageSize);
        long CreateMemo(Memo memo);
        object GetMemoById(long memoId);
        void DeleteMemo(long memoId, string updatedBy);
        void MemoStatus(long memoId, bool status, string updatedBy);
        IEnumerable<MemoAudit> MemoHistory(long memoId);
        IEnumerable<Memo> UploadCustomData(IFormFile file, long referenceId, int moduleId);


        GetData<Email> GetEmailList(long referenceId, int moduleId, int emailTypeId, string subject, long contactById, DateTime? contactDate, int pageNumber, int pageSize);
        long CreateEmail(Email email);
        object GetEmailById(long emailId);
        void DeleteEmail(long emailId, string updatedBy);
        void EmailStatus(long emailId, bool status, string updatedBy);
        IEnumerable<EmailAudit> EmailHistory(long emailId);


        GetData<CommunicationContact> GetCommunicationContactList(long referenceId, int moduleId, int contactTypeId, string contactNo, string memo, long contactById, DateTime? contactDate, int pageNumber, int pageSize);
        long CreateCommunicationContact(CommunicationContact communicationContact);
        object GetCommunicationContactById(long contactId);
        void DeleteCommunicationContact(long contactId, string updatedBy);
        void CommunicationContactStatus(long contactId, bool status, string updatedBy);
        IEnumerable<CommunicationContactAudit> CommunicationContactHistory(long contactId);



        GetData<CommunicationChat> GetCommunicationChatList(long referenceId, int moduleId, string notes, long contactById, DateTime? ChatDate, int pageNumber, int pageSize);
        long CreateCommunicationChat(CommunicationChat communicationChat);
        object GetCommunicationChatById(long communicationChatId);
        void DeleteCommunicationChat(long communicationChatId, string updatedBy);
        void CommunicationChatStatus(long communicationChatId, bool status, string updatedBy);
        IEnumerable<CommunicationChatAudit> CommunicationChatHistory(long communicationChatId);
    }
}

