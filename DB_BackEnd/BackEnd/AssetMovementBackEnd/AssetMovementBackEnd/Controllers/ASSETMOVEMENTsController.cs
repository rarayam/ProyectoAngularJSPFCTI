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

    public class MovementResponse {
        public string ResponseOK { get; set; } //1=OK 2=Error
        public string ResultMessage { get; set; }
    }

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
        [ResponseType(typeof(MovementResponse))]
        public IHttpActionResult PostASSETMOVEMENT(ASSETMOVEMENT aSSETMOVEMENT)
        {
            Boolean isOK = true;
            MovementResponse response = new MovementResponse();

            if (!ModelState.IsValid)
            {
               
                return BadRequest(ModelState);
            }

            var asset = (from s1 in db.ASSETBYUSERs
                         where (s1.ASSETNUMBER == aSSETMOVEMENT.ASSETNUMBER
                         && s1.USERNAME == aSSETMOVEMENT.USERNAME
                         && s1.ASSETIP == aSSETMOVEMENT.ASSETIP)
                         select s1).SingleOrDefault();

            if (asset == null)
            {
                response.ResponseOK = "2";
                response.ResultMessage = "El activo indicado no aparece como asignado";
                isOK = false;
            }
            else {

                var lastmovement = (from s1 in db.ASSETMOVEMENTs
                             where (s1.ASSETNUMBER == aSSETMOVEMENT.ASSETNUMBER
                             && s1.USERNAME == aSSETMOVEMENT.USERNAME
                             && s1.ASSETIP == aSSETMOVEMENT.ASSETIP)
                             orderby aSSETMOVEMENT.MOVEMENTDATE descending
                             select s1).FirstOrDefault();

                if (aSSETMOVEMENT.MOVEMENTTYPE.Equals("OUT")) //Si es una salida
                {
                    //sino tiene movimientos registrados o el ultimo movimiento es una entrada
                    if (lastmovement == null) {
                        isOK = true;
                    } else if (lastmovement.MOVEMENTTYPE == "IN")
                    {
                        //Se puede registrar la salida
                        isOK = true;
                    }else if (lastmovement.MOVEMENTTYPE == "OUT"){
                        response.ResponseOK = "2";
                        response.ResultMessage = "Por favor registre la entrada del activo antes de procesar su salida";
                        isOK = false;
                    }

                }
                else //Si es una entrada
                {
                    if (lastmovement == null)
                    {
                        isOK = true;
                    }
                    else if (lastmovement.MOVEMENTTYPE == "OUT")
                    {
                        //Se puede registrar la entrada
                        isOK = true;
                    }
                    else if (lastmovement.MOVEMENTTYPE == "IN")
                    {
                        response.ResponseOK = "2";
                        response.ResultMessage = "Por favor registre la salida del activo antes de procesar su entrada";
                        isOK = false;
                    }
                }
            }

            try
            {
                if (isOK)
                {
                    db.ASSETMOVEMENTs.Add(aSSETMOVEMENT);
                    db.SaveChanges();
                    response.ResponseOK = "1";
                    response.ResultMessage = "Registro insertado exitosamente";
                }
            }
            catch (DbUpdateException)
            {
                if (ASSETMOVEMENTExists(aSSETMOVEMENT.MOVEMENTID))
                {
                    response.ResponseOK = "2";
                    response.ResultMessage = "Movimiento ya fue registrado";
                    return Conflict();
                }
                else
                {
                    response.ResponseOK = "2";
                    response.ResultMessage = "Movimiento con errores de ingreso";
                    throw;
                }
            }


            return CreatedAtRoute("DefaultApi", new { id = response.ResponseOK }, response);
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