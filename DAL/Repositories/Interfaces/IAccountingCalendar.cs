
using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{

    public interface IAccountingCalendar : IRepository<AccountingCalendar>
    {
        IEnumerable<AccountingCalendar> GetAllAccountingCalendar();

    }
}
