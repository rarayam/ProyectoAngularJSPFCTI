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

namespace AssetMovementBackEnd.Controllers
{
    public class ASSETBYUSERsController : ApiController
    {
        private Entities db = new Entities();

        // GET: api/ASSETBYUSERs
        public IQueryable<ASSETBYUSER> GetASSETBYUSERs()
        {
            return db.ASSETBYUSERs;
        }

        // GET: api/ASSETBYUSERs/5
        [ResponseType(typeof(ASSETBYUSER))]
        public IHttpActionResult GetASSETBYUSER(string id)
        {
            ASSETBYUSER aSSETBYUSER = db.ASSETBYUSERs.Find(id);
            if (aSSETBYUSER == null)
            {
                return NotFound();
            }

            return Ok(aSSETBYUSER);
        }

        // PUT: api/ASSETBYUSERs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutASSETBYUSER(string id, ASSETBYUSER aSSETBYUSER)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != aSSETBYUSER.USERNAME)
            {
                return BadRequest();
            }

            db.Entry(aSSETBYUSER).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ASSETBYUSERExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ASSETBYUSERs
        [ResponseType(typeof(ASSETBYUSER))]
        public IHttpActionResult PostASSETBYUSER(ASSETBYUSER aSSETBYUSER)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ASSETBYUSERs.Add(aSSETBYUSER);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ASSETBYUSERExists(aSSETBYUSER.USERNAME))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = aSSETBYUSER.USERNAME }, aSSETBYUSER);
        }

        // DELETE: api/ASSETBYUSERs/5
        [ResponseType(typeof(ASSETBYUSER))]
        public IHttpActionResult DeleteASSETBYUSER(string id)
        {
            ASSETBYUSER aSSETBYUSER = db.ASSETBYUSERs.Find(id);
            if (aSSETBYUSER == null)
            {
                return NotFound();
            }

            db.ASSETBYUSERs.Remove(aSSETBYUSER);
            db.SaveChanges();

            return Ok(aSSETBYUSER);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ASSETBYUSERExists(string id)
        {
            return db.ASSETBYUSERs.Count(e => e.USERNAME == id) > 0;
        }
    }
}