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


        [HttpGet("ADD_NEW_AGREEMENT")]
        public IActionResult ADD_NEW_AGREEMENT()
        {
            return View();
        }


        [HttpGet("AGREEMENT_UPDATION")]
        public IActionResult AGREEMENT_UPDATION()
        {
            return View();
        }

        [HttpGet("AGREEMENT_APPROVAL_GM")]
        public IActionResult AGREEMENT_APPROVAL_GM()
        {
            return View();
        }

        [HttpGet("Rent_neft_verification")]
        public IActionResult Rent_neft_verification()
        {
            return View();
        }

        [HttpGet("AdvancePayment")]
        public IActionResult AdvancePayment()
        {
            return View();
        }


        [HttpGet("New_Agreement_Detail")]
        public IActionResult New_Agreement_Detail()
        {
            return View();
        }

        [HttpGet("Agreement_upload")]
        public IActionResult Agreement_upload()
        {
            return View();
        }

        [HttpGet("Agreement_approval")]
        public IActionResult Agreement_approval()
        {
            return View();
        }

        [HttpGet("Rent_Neft")]
        public IActionResult Rent_Neft()
        {
            return View();
        }

        [HttpGet("update_new_branchdtll")]
        public IActionResult update_new_branchdtll()
        {
            return View();
        }

        [HttpGet("AddNewBranchHostel")]
        public IActionResult AddNewBranchHostel()
        {
            return View();
        }

        [HttpGet("HostelApproval")]
        public IActionResult HostelApproval()
        {
            return View();
        }

        [HttpGet("RecommendNewHostel")]
        public IActionResult RecommendNewHostel()
        {
            return View();
        }

        [HttpGet("Hostel_AddNewAgreement")]
        public IActionResult Hostel_AddNewAgreement()
        {
            return View();
        }

        [HttpGet("Hostel_renew_agre_recom")]
        public IActionResult Hostel_renew_agre_recom()
        {
            return View();
        }

        [HttpGet("Hostel_renew_agre_aprv")]
        public IActionResult Hostel_renew_agre_aprv()
        {
            return View();
        }

        [HttpGet("Agreement_upload_hostel")]
        public IActionResult Agreement_upload_hostel()
        {
            return View();
        }

        [HttpGet("RenewHostelAgreement")]
        public IActionResult RenewHostelAgreement()
        {
            return View();
        }
    }
}