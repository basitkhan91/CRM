using DAL.Models;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface ICharge : IRepository<Charge>
    {
        IEnumerable<object> GetAllChargeData();
        IEnumerable<object> getCurrencyData();
        IEnumerable<object> getPurchaseOrderNumbers();
        IEnumerable<object> getVendorNmaes();
        IEnumerable<object> IntegrationPortal();


        //  void CreateAction(DAL.Models.Action action);

    }
}
