using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AssetMovementBackEnd.Models
{
    public class AssetMovement
    {
        public int MovementId { get; set; }
        public string AssetNumber{ get; set; }
        public string AssetIp { get; set; }
        public string UserName { get; set; }
        public AssetMovementType MovementType { get; set; }
        public string AccesoriesDetal { get; set; }
        public string MovementReason { get; set; }
        public DateTime Movementdate { get; set; }
        


    }

    public enum AssetMovementType {
        IN,
        OUT
    }
}