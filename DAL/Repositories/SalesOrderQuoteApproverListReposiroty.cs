
using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using DAL;
using DAL.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;
using DAL.Models.Sales;


namespace DAL.Repositories
{
    public class SalesOrderQuoteApproverListRepository : Repository<SalesOrderQuoteApproverList>
        , ISalesOrderQuoteApproverList
    {
        private ApplicationDbContext Context => (ApplicationDbContext)_context;

        public SalesOrderQuoteApproverListRepository(ApplicationDbContext context) : base(context)
        {
        }

        public IEnumerable<SalesOrderQuoteApproverList> GetApproverList(long salesQuoteId)
        {
            return Context.SalesOrderQuoteApproverList.Where(list => list.SalesOrderQuoteId == salesQuoteId).ToList();
        }

        public SalesOrderQuoteApproverList Create(SalesOrderQuoteApproverList quote)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<SalesOrderQuoteApproverList> GetBySalesOrderQuoteId(int salesQuoteId, int masterCompanyId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<SalesOrderQuoteApproverList> BulkCreate(IEnumerable<SalesOrderQuoteApproverList> approverLists)
        {
            try
            {
                Context.SalesOrderQuoteApproverList.AddRange(approverLists);
                Context.SaveChanges();
            }
            catch (Exception e)
            {
                throw;
            }

            return approverLists;
        }

        public IEnumerable<SalesOrderQuoteApproverList> BulkMerge(IEnumerable<SalesOrderQuoteApproverList> approverLists)
        {
            foreach (var list in approverLists)
            {
                if (list.SalesOrderQuoteApproverListId.HasValue)
                {
                    this.Context.SalesOrderQuoteApproverList.Update(list);
                }
                else
                {
                    this.Context.SalesOrderQuoteApproverList.Add(list);
                }
            }

            this.Context.SaveChanges();

            return approverLists;
        }
    }
}
