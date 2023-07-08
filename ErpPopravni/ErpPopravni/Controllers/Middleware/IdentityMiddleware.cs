using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ErpPopravni.Controllers.Middleware
{
    public class IdentityMiddleware
    {
        private readonly RequestDelegate _next;

        public IdentityMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public Task Invoke(HttpContext context)
        {
            if (context.User != null && context.User.Identity.IsAuthenticated)
            {
                var claims = context.User.Identity as ClaimsIdentity;
                context.Request.Headers.Add("userId", claims.FindFirst("userId").Value);
            }

            return _next(context);
        }
    }
}
