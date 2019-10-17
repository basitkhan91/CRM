﻿using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;

namespace DAL.Repositories.Interfaces
{
    public interface IVendorClassificationRepository : IRepository<VendorClassification>
    {
        IEnumerable<VendorClassification> GetAllVendorClassificationData();
        IEnumerable<VendorClassification> GetAllActiveVendorClassificationData();
        IEnumerable<DAL.Models.VendorClassificationAudit> GetVendorClassificationAuditDetails(long vendorClassificationId);
    }
}
