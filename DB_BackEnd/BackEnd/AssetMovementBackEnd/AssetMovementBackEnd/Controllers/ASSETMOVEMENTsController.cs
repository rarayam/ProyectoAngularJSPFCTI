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

namespace AssetMovementBackEnd.Controllers
{
    public class ASSETMOVEMENTsController : ApiController
    {
        private Entities db = new Entities();

        // GET: api/ASSETMOVEMENTs
        public IQueryable<ASSETMOVEMENT> GetASSETMOVEMENTs()
        {
            return db.ASSETMOVEMENTs;
        }

        // GET: api/ASSETMOVEMENTs/5
        [ResponseType(typeof(ASSETMOVEMENT))]
        public IHttpActionResult GetASSETMOVEMENT(decimal id)
        {
            ASSETMOVEMENT aSSETMOVEMENT = db.ASSETMOVEMENTs.Find(id);
            if (aSSETMOVEMENT == null)
            {
                return NotFound();
            }

            return Ok(aSSETMOVEMENT);
        }

        // PUT: api/ASSETMOVEMENTs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutASSETMOVEMENT(decimal id, ASSETMOVEMENT aSSETMOVEMENT)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != aSSETMOVEMENT.MOVEMENTID)
            {
                return BadRequest();
            }

            db.Entry(aSSETMOVEMENT).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ASSETMOVEMENTExists(id))
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

        // POST: api/ASSETMOVEMENTs
        [ResponseType(typeof(ASSETMOVEMENT))]
        public IHttpActionResult PostASSETMOVEMENT(ASSETMOVEMENT aSSETMOVEMENT)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ASSETMOVEMENTs.Add(aSSETMOVEMENT);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ASSETMOVEMENTExists(aSSETMOVEMENT.MOVEMENTID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = aSSETMOVEMENT.MOVEMENTID }, aSSETMOVEMENT);
        }

        // DELETE: api/ASSETMOVEMENTs/5
        [ResponseType(typeof(ASSETMOVEMENT))]
        public IHttpActionResult DeleteASSETMOVEMENT(decimal id)
        {
            ASSETMOVEMENT aSSETMOVEMENT = db.ASSETMOVEMENTs.Find(id);
            if (aSSETMOVEMENT == null)
            {
                return NotFound();
            }

            db.ASSETMOVEMENTs.Remove(aSSETMOVEMENT);
            db.SaveChanges();

            return Ok(aSSETMOVEMENT);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ASSETMOVEMENTExists(decimal id)
        {
            return db.ASSETMOVEMENTs.Count(e => e.MOVEMENTID == id) > 0;
        }
    }
}