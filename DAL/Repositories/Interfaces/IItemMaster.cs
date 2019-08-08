using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface IItemMaster : IRepository<ItemMaster>
    {
        IEnumerable<object> GetAircraftMapped(string PNid);
        IEnumerable<object> GetATAMapped(string PNid);
        IEnumerable<ItemMaster> getAlldata();

        IEnumerable<object> getAllItemMasterdata();

        IEnumerable<object> getAllItemMasterStockdata();

        IEnumerable<object> getAllItemMasterNonstockdata();

        IEnumerable<object> getAllItemMasterequipmentdata();
        IEnumerable<object> getLegalEntityData();

        IEnumerable<object> getRolesData();

        IEnumerable<object> getRolesDatayRoleId(long value);
        IEnumerable<object> Getdescriptionbypart(string partNumber);
        IEnumerable<object> aircraftManufacturerData(long id);

        IEnumerable<object> getIntegrationData(long id);

        IEnumerable<object> getCapabilityData(long id);
        IEnumerable<object> getItemMasterData(long id);

        IEnumerable<object> getLegalEntityAccountsData(long id);

        

    }
}
