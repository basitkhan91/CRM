﻿using DAL.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
  public  interface ILegalEntity : IRepository<LegalEntity>
    {
        void UploadLegalEntityContactsCustomData(IFormFile file, long legalEntityId);
        void UploadLegalEntityInternationalCustomData(IFormFile file, long legalEntityId);
        IEnumerable<object> UploadLegalEntityShippingAddressCustomData(IFormFile file, long legalEntityId);
        IEnumerable<object> UploadLegalEntityBillingAddressCustomData(IFormFile file, long legalEntityId);
        IEnumerable<object> GetLegalEntityInternationalShippingAuditHistoryByid(long legalEntityId, long InternationalShippingId);
        IEnumerable<object> GetAllLegalEntityData();
        IEnumerable<object> GetParentEntities();  
        long CreateLegalEntityBillingAddress(LegalEntityBillingAddress billingAddress);
        void UpdateLegalEntityBillingAddress(LegalEntityBillingAddress billingAddress);
        void DeleteLegalEntityBillingAddress(long billingAddressId, string updatedBy);
        void LegalEntityBillingAddressStatus(long billingAddressId, bool status, string updatedBy);
        IEnumerable<object> GetLegalEntityBillingAddress();
        object LegalEntityBillingAddressById(long billingAddressId);

        long CreateLegalEntityShippingAddress(LegalEntityShippingAddress ShippingAddress);
        void UpdateLegalEntityShippingAddress(LegalEntityShippingAddress ShippingAddress);
        void DeleteLegalEntityShippingAddress(long shippingAddressId, string updatedBy);
        void LegalEntityShippingAddressStatus(long shippingAddressId, bool status, string updatedBy);
        IEnumerable<object> GetLegalEntityShippingAddress();
        object LegalEntityShippingAddressById(long ShippingAddressId);

        IEnumerable<object> GetLegalEntitySiteNames(long legalEntityId);

        IEnumerable<object> GetChildEntitiesByParentId(long parentId);
        
        object GetLegalEntityAddress(long addressId);
        IEnumerable<object> GetLegalEntityContacts(long legalEntityId);

		IEnumerable<object> GetLegalEntityShippingSiteNames(long legalEntityId);
		object GetLegalEntityShippingAddress(long addressId);
        IEnumerable<object> GetLegalEntityAddressById(long legalEntityId);



    }
}
