
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
    public class SalesOrderQuotePartRepository : Repository<SalesOrderQuotePart>, ISalesOrderQuotePartRepository
    {
        private ApplicationDbContext Context => (ApplicationDbContext)_context;

        public SalesOrderQuotePartRepository(ApplicationDbContext context) : base(context)
        {
        }

        public IEnumerable<SalesOrderQuotePart> GetPartsBySalesQuoteId(long salesQuoteId)
        {
            return this.Context.SalesOrderQuotePart.Where(part => part.SalesOrderQuoteId == salesQuoteId).ToList();
        }

        public IEnumerable<SalesOrderQuotePart> BulkCreate(IEnumerable<SalesOrderQuotePart> parts)
        {
            try
            {
                Context.SalesOrderQuotePart.AddRange(parts);
                Context.SaveChanges();
            }
            catch (Exception e)
            {
                throw;
            }

            return parts;
        }

        public IEnumerable<SalesOrderQuotePart> BulkUpdate(IEnumerable<SalesOrderQuotePart> parts)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<SalesOrderQuotePart> BulkMege(IEnumerable<SalesOrderQuotePart> parts)
        {
            foreach (var part in parts)
            {
                if (part.SalesOrderQuotePartId.HasValue)
                {
                    this.Context.SalesOrderQuotePart.Update(part);
                }
                else
                {
                    this.Context.SalesOrderQuotePart.Add(part);
                }
            }

            this.Context.SaveChanges();

            return parts;

        }

        /*
        * Don't delete the data which is already saved in the system
        * We may need it for auditing purpose 
        * Just mark IsDeleted column to true ( 1 ) 
        */
        public bool Delete(long salesOrderQuotePartId)
        {
            var part = this.Context.SalesOrderQuotePart.Where(q => q.SalesOrderQuotePartId == salesOrderQuotePartId).FirstOrDefault();

            if (part != null)
            {

                part.IsDeleted = true;

                this.Context.SalesOrderQuotePart.Update(part);

                this.Context.SaveChanges();

            }
            return true;
        }

    }
}
