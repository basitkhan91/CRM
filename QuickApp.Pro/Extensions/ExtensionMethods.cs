using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace QuickApp.Pro.Extensions
{
    public static class ExtensionMethods
    {
        public static IEnumerable<T> Sort<T>(this IEnumerable<T> source, string sortBy, string sortDirection)
        {
            var param = Expression.Parameter(typeof(T), "item");

            var sortExpression = Expression.Lambda<Func<T, object>>
                (Expression.Convert(Expression.Property(param, sortBy), typeof(object)), param);

            switch (sortDirection.ToLower())
            {
                case "asc":
                    return source.AsQueryable<T>().OrderBy<T, object>(sortExpression);
                case "desc":
                    return source.AsQueryable<T>().OrderByDescending<T, object>(sortExpression);
            }

            return source;
        }
    }
}
