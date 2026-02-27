using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MFWEBACCOUNTS;
using Microsoft.AspNetCore.Mvc;

namespace MFWEBAPP.Controllers
{
    //[NoDirectAccess]
    public class ProductMastersController : Controller
    {
        
        
       
       

     
      
    
        
        
       

       
      
     
  
      
        
       
       

        //[HttpGet("MenuAssign")]
        //public IActionResult MenuAssign()
        //{
        //    return View();
        //}
       
        [HttpGet("DenominationCash")]
        public IActionResult DenominationCash()
        {
            return View();
        }
        [HttpGet("frmUpdateBranchDet")]
        public IActionResult frmUpdateBranchDet()
        {
            return View();
        }


        [HttpGet("AH_newSiteConfirm")]
        public IActionResult AH_newSiteConfirm()
        {
            return View();
        }

        [HttpGet("FZM_newSiteConfirm")]
        public IActionResult FZM_newSiteConfirm()
        {
            return View();
        }

        [HttpGet("AddNewBranchDetailfirmWise")]
        public IActionResult AddNewBranchDetailfirmWise()
        {
            return View();
        }
        [HttpGet("cust_add")]
        public IActionResult cust_add()
        {
            return View();
        }
    }
}