

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AssetMovementBackEnd.Models;
using System.Security.Principal;
using System.DirectoryServices.Protocols;
using System.Web;
namespace AssetMovementBackEnd.Controllers
{
    public class IpInfo {
        public string Ip {get; set;}

        public IpInfo(string Ip) {
            this.Ip = Ip;
        }
    }

    public class IpController : ApiController
    {

        // GET: api/Ip
        [ResponseType(typeof(IpInfo))]
        public IHttpActionResult GetIP()
        {
            IpInfo ip = new IpInfo("::1");
            System.Net.Http.HttpRequestMessage request = this.Request;

            if (request.Properties.ContainsKey("MS_HttpContext"))
            {
                var ctx = request.Properties["MS_HttpContext"] as HttpContextWrapper;
                if (ctx != null)
                {
                    ip.Ip = ctx.Request.UserHostAddress;
                    return Ok(ip);                    
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return NotFound();
            }


        }


        protected override void Dispose(bool disposing)
        {

            base.Dispose(disposing);
        }


    }
}