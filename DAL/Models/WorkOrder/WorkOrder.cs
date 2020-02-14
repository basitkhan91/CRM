using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class WorkOrder
    {
        public WorkOrder()
        {
            PartNumbers = new List<WorkOrderPartNumber>();
        }
        [Key]
        public long WorkOrderId { get; set; }

        public string WorkOrderNum { get; set; }

        public bool IsSinglePN { get; set; }

        public long WorkOrderTypeId { get; set; }

        [Required(ErrorMessage = "Open date is required")]
        public DateTime OpenDate { get; set; }

        public long CustomerId { get; set; }

        public bool IsContractAvl { get; set; }

        public string Contract { get; set; }

        // public long CustomerContactId { get; set; }

        [Required(ErrorMessage = "Status is required")]
        [ForeignKey("WorkOrderStatusId")]
        public long WorkOrderStatusId { get; set; }
        public long? EmployeeId { get; set; }
        public long? SalesPersonId { get; set; }
        public long ManagementStructureId { get; set; }
        public long? CSRId { get; set; }
        public long ReceivingCustomerWorkId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<DateTime> CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        public virtual List<WorkOrderPartNumber> PartNumbers { get; set; }

        [NotMapped]
        public long WorkFlowWorkOrderId { get; set; }
        [NotMapped]
        public string CustomerName { get; set; }
        [NotMapped]
        public CustomerDetails CustomerDetails { get; set; }
        [NotMapped]
        public bool IsSubWorkOrder { get; set; }
        [NotMapped]
        public string PrimarySalesPersonId { get; set; }
        [NotMapped]
        public Int16 CreditTermsId { get; set; }
        [NotMapped]
        public decimal CreditLimit { get; set; }
        [NotMapped]
        public string ContractReference { get; set; }
        [NotMapped]
        public string CustomerReference { get; set; }
        [NotMapped]
        public string CSRName { get; set; }
        [NotMapped]
        public bool isRecCustomer { get; set; }
        [NotMapped]
        public string CustomerContact { get; set; }
        [NotMapped]
        public string CustomerCode { get; set; }

    }

    public class CustomerDetails
    {
        public long CustomerId { get; set; }
        public string CustomerName { get; set; }
        public decimal? CreditLimit { get; set; }
        public short? CreditTermsId { get; set; }
        public string CustomerContact { get; set; }
        public string CustomerRef { get; set; }
        public string CSRName { get; set; }
        public long? CSRId { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerCode { get; set; }
    }
}
