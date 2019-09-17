using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro
{
    public class CustomExceptionHandler : IExceptionFilter
    {
        readonly ILogger _logger;

        public CustomExceptionHandler(ILogger<CustomExceptionHandler> logger)
        {
            _logger = logger;
        }

        void IExceptionFilter.OnException(ExceptionContext context)
        {
            _logger.LogError(context.Exception.StackTrace, null);
        }
    }
}
