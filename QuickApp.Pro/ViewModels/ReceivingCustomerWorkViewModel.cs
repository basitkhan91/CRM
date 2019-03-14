using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class ReceivingCustomerWorkViewModel
    {
        public long? ReceivingCustomerWorkId { get; set; }

        public string ReceivingCustomerNumber { get; set; }
        public long? CustomerId { get; set; }

        public string CustomerReference { get; set; }

        public bool? IsSerialized { get; set; }

        public long? CustomerClassificationId { get; set; }

        public Byte? ScopeId { get; set; }

        public long? PriorityId { get; set; }

        public Byte? StatusId { get; set; }

        public long? CustomerContactId { get; set; }

        //public long? PartId { get; set; }

        public string ChangePartNumber { get; set; }

        public string PartCertificationNumber { get; set; }

        public Int16? Quantity { get; set; }

        public Int16? ConditionCodeId { get; set; }
        public long? SiteId { get; set; }
        public long? BinId { get; set; }
        public long? ShelfId { get; set; }
        public long? WarehouseId { get; set; }

        public long? WorkOrderId { get; set; }

        public long? LocationId { get; set; }

        public string Owner { get; set; }

        public bool? IsCustomerStock { get; set; }

        public long? TraceableToCustomerId { get; set; }

        public long? TraceableToVendorId { get; set; }

        public string TraceableToOther { get; set; }

        public DateTime ManufacturingDate { get; set; }

        public DateTime ExpirationDate { get; set; }

        public DateTime TimeLifeDate { get; set; }

        public string TimeLifeOrigin { get; set; }

        public bool? TimeRemainingId { get; set; }

        public string ManufacturingTrace { get; set; }

        public string ManufacturingLotNumber { get; set; }

        public string ReasonForRemoval { get; set; }

        public long? EmployeeId { get; set; }

        public string SerialNumber { get; set; }

        public string CertifiedBy { get; set; }

        public DateTime TagDate { get; set; }

        public string TagType { get; set; }

        public string TraceableTo { get; set; }

        public string ObtainFrom { get; set; }

        public bool? TimeLife { get; set; }

        public long? TimeLifeId { get; set; }

        public string Manufacturer { get; set; }

        public string ManufacturerLotNumber { get; set; }

        public long? ObtainFromVendorId { get; set; }
        public long? ObtainFromCustomerId { get; set; }
        public string ObtainFromOther { get; set; }
        public Int16? CompanyId { get; set; }

        public int? BusinessUnitId { get; set; }

        public int? DivisionId { get; set; }

        public int? DepartmentId { get; set; }

        public int? MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
        public bool? IsExpirationDate { get; set; }
        public string PartNumber { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public class ReceivingCustomerWorkViewModelValidator : AbstractValidator<ReceivingCustomerWorkViewModel>
        {
            public ReceivingCustomerWorkViewModelValidator()
            {
                
            }
        }

    }
}
