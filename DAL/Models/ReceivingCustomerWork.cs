using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class ReceivingCustomerWork : PasBase
    {

        public long? ReceivingCustomerWorkId { get; set; }

        public long? CustomerId { get; set; }

        public string ReceivingCustomerNumber { get; set; }

        public string CustomerReference { get; set; }

        public bool? IsSerialized { get; set; }

        public long? ItemMasterId { get; set; }
        public long? CustomerClassificationId { get; set; }

        public Byte? ScopeId { get; set; }

        public long? PriorityId { get; set; }

        public Byte? StatusId { get; set; }

        public string ContactId { get; set; }

         public Int32? TraceableToType { get; set; }

        public string ChangePartNumber { get; set; }

        public string PartCertificationNumber { get; set; }

        public Int16? Quantity { get; set; }
        public string WorkPhone { get; set; }
        public long? ConditionId { get; set; }
        public long? SiteId { get; set; }
        public long? BinId { get; set; }
        public long? ShelfId { get; set; }
        public long? WarehouseId { get; set; }

        public long? WorkOrderId { get; set; }

        public long? LocationId { get; set; }

        public Int32? ObtainFromType { get; set; }

        public Int32? OwnerType { get; set; }
        public string PartDescription { get; set; }

        public string Owner { get; set; }
        public bool? IsCustomerStock { get; set; }

        public DateTime? ManufacturingDate { get; set; }

        public DateTime? ExpirationDate { get; set; }

        public DateTime? TimeLifeDate { get; set; }

        public string TimeLifeOrigin { get; set; }

        public long? TimeLifeCyclesId { get; set; }

        public string ManufacturingTrace { get; set; }

        public string ManufacturingLotNumber { get; set; }

        public string ReasonForRemoval { get; set; }

        public long? EmployeeId { get; set; }

        public string SerialNumber { get; set; }

        public string CertifiedBy { get; set; }

        public DateTime? TagDate { get; set; }

        public string TagType { get; set; }

        public string TraceableTo { get; set; }

        public string ObtainFrom { get; set; }

        public bool? IsTimeLife { get; set; }

        public bool? IsMFGDate { get; set; }

        public long? TimeLifeId { get; set; }

        public string Manufacturer { get; set; }

        public string ManufacturerLotNumber { get; set; }

        public int? CompanyId { get; set; }

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
        public DateTime? UpdatedDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public virtual Condition Condition { get; set; }
        public virtual ItemMaster ItemMaster { get; set; }
        public virtual Company Company { get; set; }
        public virtual Site Site { get; set; }
        public virtual Warehouse Warehouse { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual Location Location { get; set; }
        public virtual Bin Bin { get; set; }
        public virtual Shelf Shelf { get; set; }
        public virtual TimeLife TimeLife { get; set; }
      //  public virtual CustomerContact CustomerContact { get; set; }

    }
}
