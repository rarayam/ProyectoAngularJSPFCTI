using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AssetMovementBackEnd.Models
{
    public class AssetByUser
    {
        public string UserCompName{get; set;}
        public string UserName { get; set; }
        public string UserPersonalId { get; set; }
        public string EmployeeerviceUnit { get; set; }
        public string AssetNumber { get; set; }
        public string AssetIP { get; set; }
        public DateTime AddDate { get; set; }
    }
}