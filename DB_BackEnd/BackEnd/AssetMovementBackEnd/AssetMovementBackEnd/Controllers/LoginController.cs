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

namespace AssetMovementBackEnd.Controllers
{

   public class UserAuthentication {
        public string UserName { get; set; }        
        public bool SuccessAuthentication { get; set; }

        public UserAuthentication(string pUserName, bool pSuccessAuthentication) {
            UserName = pUserName;
            SuccessAuthentication = pSuccessAuthentication;
        }

    }

    public class LoginController : ApiController
    {
       

        // GET: api/Login
        [ResponseType(typeof(UserAuthentication))]
        public IHttpActionResult GetLogin(string UserName, string Password)
        {
            UserAuthentication userAuth = new UserAuthentication(UserName, false);
            try
            {
                LdapConnection connection = new LdapConnection("tipfc.com");
                NetworkCredential credential = new NetworkCredential(UserName, Password);
                connection.Credential = credential;
                connection.Bind();
                userAuth.SuccessAuthentication = true;
            }
            catch (LdapException)
            {
                userAuth.SuccessAuthentication = false;
            
            }
            catch (Exception)
            {
                userAuth.SuccessAuthentication = true;
            
            }            

            return Ok(userAuth);
        }


        protected override void Dispose(bool disposing)
        {
           
            base.Dispose(disposing);
        }

       
    }
}