//using DAL.Models;
//using DAL.Repositories.Interfaces;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;

//namespace DAL.Repositories
//{
//   public class VendorShippingRepository : Repository<VendorShipping>, IVendorShippingRepository
//    {
//        List<Vendor> iList = new List<Vendor>();
//        public VendorShippingRepository(ApplicationDbContext context) : base(context)
//        { }

//        public IEnumerable<VendorShipping> GetVendorShippingDetails()
//        {
//            return _appContext.VendorShipping.OrderByDescending(c => c.VendorShippingId).ToList();
//        }

//        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

//    }
//}
