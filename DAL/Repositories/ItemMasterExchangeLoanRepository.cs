using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories
{
    public class ItemMasterExchangeLoanRepository :Repository<ItemMasterExchangeLoan>, IItemMasterExchangeLoanRepository
    {
        private Common.AppSettings AppSettings { get; set; }
        public ItemMasterExchangeLoanRepository(ApplicationDbContext context, Microsoft.Extensions.Options.IOptions<Common.AppSettings> _appSettings) : base(context)
        { }

    }
}
