using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
  public  class AccountingCalendar:PasBase
    {
        [Key]
        public long AccountingCalendarId { get; set; }

        public string FiscalName { get; set; }

        public byte FiscalYear { get; set; }

        public byte Quater { get; set; }

        public byte Period { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public string PeriodName { get; set; }

        public int MasterCompanyId { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDelete { get; set; }
    }
}
