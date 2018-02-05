using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace AssetMovementBackEnd.Models
{
    public class Storage: DbContext
    {
        public Storage():base("AssetMovementBackEnd") {

        }

        public DbSet<AssetByUser>
    }
}