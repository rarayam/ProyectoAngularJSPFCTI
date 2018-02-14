﻿using System;
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
        public string Password { get; set; }
        public bool SuccessAuthentication { get; set; }

        public UserAuthentication(string pUserName, string pPassword, bool pSuccessAuthentication) {
            UserName = pUserName;
            Password = pPassword;
            SuccessAuthentication = pSuccessAuthentication;
        }

    }

    public class LoginController : ApiController
    {
       

        // POST: api/Login
        [ResponseType(typeof(UserAuthentication))]
        public IHttpActionResult PostLogin(UserAuthentication pUserAuth)
        {
            UserAuthentication userAuth = pUserAuth;
            try
            {
                LdapConnection connection = new LdapConnection("tipfc.com");
                NetworkCredential credential = new NetworkCredential(pUserAuth.UserName, pUserAuth.Password);
                connection.Credential = credential;
                connection.Bind();
                userAuth.SuccessAuthentication = true;
                userAuth.Password = "*******";
                
            }
            catch (LdapException)
            {
                userAuth.SuccessAuthentication = false;
                userAuth.Password = "*******";

            }
            catch (Exception)
            {
                userAuth.SuccessAuthentication = true;
            
            }
            

            return CreatedAtRoute("DefaultApi", new { UserName = userAuth.UserName }, userAuth);
            //return Ok(userAuth);
        }


        protected override void Dispose(bool disposing)
        {
           
            base.Dispose(disposing);
        }

       
    }
}