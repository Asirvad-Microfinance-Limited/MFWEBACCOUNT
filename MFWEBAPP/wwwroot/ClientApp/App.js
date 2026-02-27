
//var MFPUBLICCUSTOMERAPI_URL = "https://asirvad.macom.in/mfpubliccustomerapi/";
//var MFPUBLICLOSAPI_URL = "https://asirvad.macom.in/mfpubliclosapi/";
//var MFPUBLICLMSAPI_URL = "https://asirvad.macom.in/mfpubliclmsapi/"
//var MFAADHARAPI_URL = " https://asirvad.macom.in/mfpublickycapi/";

//var MFPUBLICCUSTOMERAPI_URL = "https://amflnewtest.mactech.net.in/mfpubliccustomerapi/";
var MFPUBLICCUSTOMERAPI_URL = "https://lms.asirvad.com/mfpubliccustomerapi/";

var MFPUBLICACCOUNTSAPI_URL = "http://lms.asirvad.com/Accounts/MFPublicAccountsAPI/";
//var MFPUBLICACCOUNTSAPI_URL = "https://amflnewtest.mactech.net.in/amflaccounts/mfpublicaccountsapi/";
var MFPUBLICKYCAPI_URL = "https://lms.asirvad.com/mfpublickycapi/";
var MFPUBLICREPORTSAPI_URL = "https://reports.asirvad.com/MFPublicreportsAPI/";
//var MFPUBLICCUSTOMERAPI_URL = "http://localhost:60611/mfpubliccustomerapi/";
//var MFPUBLICLOSAPI_URL = "http://localhost:60603/mfpubliclosapi/";
//var MFPUBLICLMSAPI_URL = "http://localhost:60608/mfpubliclmsapi/";
//var MFAADHARAPI_URL = " https://mac.mactech.net.in/mfpublickycapi/";
var MFPUBLICRENTAPI_URL = "https://amfluat.asirvad.com/MFPublicRentAPI/";

//var MFPUBLICCUSTOMERAPI_URL = "https://amfluat.mactech.net.in/mfpubliccustomerapi/";
//var MFPUBLICLOSAPI_URL = "https://amfluat.mactech.net.in/mfpubliclosapi/";
//var MFPUBLICLMSAPI_URL = "https://amfluat.mactech.net.in/mfpubliclmsapi/";
//var MFAADHARAPI_URL = "https://amfluat.mactech.net.in/mfpublickycapi/";

var encryptkey = "microfinancekey";
var moduleId = 10;
var DOMAIN_URL = "https://localhost:44396/";
//var DOMAIN_URL = "http://lms.asirvad.com/Accounts/MFWEBACCOUNTS/";


//var DOMAIN_URL = "https://mac.mactech.net.in/mfwebaccounts/";

//var DOMAIN_URL = "https://amflapps.macom.in/mfwebaccounts/";
//var DOMAIN_URL = "https://asirvad.macom.in/mfweb/";
//var DOMAIN_URL = "https://mac.mactech.net.in/mfweb/";
//var DOMAIN_URL = "https://amfluat.mactech.net.in/mfweb/";

function LogOutClearLocalStorage() {
    localStorage.ClearLocalStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('vendorIdForEdit');
    localStorage.removeItem('LoanNo');
    localStorage.removeItem('userTypeIdForEdit');
    localStorage.removeItem('slno');
    localStorage.removeItem('loanid');
    localStorage.removeItem('IntentId');
    localStorage.removeItem('BranchIDCenterReport');
    localStorage.removeItem('BranchIDPendingReport');
    localStorage.removeItem('claimListDetails');
}


