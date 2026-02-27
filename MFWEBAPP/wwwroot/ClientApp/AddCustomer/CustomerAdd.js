


var _Customer_add = {

    checkAccess: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";

        var CheckAccess = {
            "typeID": "2",
            "flag1": "CHECKACCESS",
            "flag2": "",
            "inptvar1": userdata.userId,
            "inptvar2": "1001",
            "userID": userdata.userId,
            "branchID": userdata.branchId
        };
        try {
            CheckAccess = JSON.stringify(CheckAccess);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        CheckAccess = { "encryptedRqstStr": EncryptAPIReq(CheckAccess) };
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", CheckAccess, _Customer_add.checkAccessRtn, token)
    },

    checkAccessRtn: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            if (response.data != null && response.data.queryResult.QueryResult.length > 0) {
                token = response.data.token;
                var x = response.data.queryResult[0].param1;
                if (x == "0") {
                    swal({
                        title: "Access Denied",
                        text: "You are not autherized to view this page.!",
                        type: "info"
                    }, function () {
                        window.location.href = "dashboard";
                    });
                }
                //else {
                //    Int_accr_posting_Approval.loadSelectFundType();
                //}

            }
        }
        else {
            swal({
                title: "Access Denied",
                text: "You are not autherized to view this page.!",
                type: "info"
            }, function () {
                window.location.href = "dashboard";
            });
        }
    },

    tokenValidate: function () {
        jQuery('.page-loader-wrapper').show();
        var Str = " ";

        var CheckToken = {
            "typeID": "1",
            "userID": userdata.userId,
            "branchID": userdata.branchId

        };

        try {
            CheckToken = JSON.stringify(CheckToken);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        CheckToken = { "encryptedRqstStr": EncryptAPIReq(CheckToken) };


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _Customer_add.checkAccessToken, userdata.token)
    },

    // Token response



    checkAccessToken: function (response) {
        if (response.status === "SUCCESS") {
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            jQuery('.page-loader-wrapper').hide();
            token = response.data.queryResult.tokenId;
            if (response.data.errStatus == 0) {
                swal({
                    title: "Access Denied",
                    text: "You are already login in pr module!",
                    type: "info"
                }, function () {
                    window.location.href = "dashboard";
                });
            }
            else {


                _Customer_add.GetCountry();
                _Customer_add.GetState();
                _Customer_add.GetCustomerStatus();
                _Customer_add.GetIdType();
                _Customer_add.GetOccupation();


            }


        }

    },

    GetCountry: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADD_OWNER",
            pagVal: "country_load",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };


        try {
            GetRentDetails = JSON.stringify(GetRentDetails);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetRentDetails = { "encryptedRqstStr": EncryptAPIReq(GetRentDetails) };


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Customer_add.FillCountry, userdata.token)
    },

    FillCountry: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ccountry").empty();

                //jQuery("#ccountry").append(jQuery("<option></option>").val("0").text("--Select--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ccountry").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ccountry").empty();
                jQuery("#ccountry").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ccountry").empty();
            jQuery("#ccountry").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetState: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADD_OWNER",
            pagVal: "state_load",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };


        try {
            GetRentDetails = JSON.stringify(GetRentDetails);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetRentDetails = { "encryptedRqstStr": EncryptAPIReq(GetRentDetails) };


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Customer_add.FillState, userdata.token)
    },

    FillState: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#cstate").empty();

                jQuery("#cstate").append(jQuery("<option></option>").val("0").text("--SELECT STATE--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#cstate").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#cstate").empty();
                jQuery("#cstate").append(jQuery("<option></option>").val("0").text("--SELECT STATE--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#cstate").empty();
            jQuery("#cstate").append(jQuery("<option></option>").val("0").text("--SELECT STATE--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetDistrict: function () {

        jQuery('.page-loader-wrapper').show();

        var State_id = jQuery("#cstate").val();


        var GetRentDetails =
        {
            flag: "ADD_OWNER",
            pagVal: "district_load",
            parVal: State_id,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };


        try {
            GetRentDetails = JSON.stringify(GetRentDetails);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetRentDetails = { "encryptedRqstStr": EncryptAPIReq(GetRentDetails) };


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Customer_add.FillDistrict, userdata.token)
    },

    FillDistrict: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#cdistrict").empty();

                jQuery("#cdistrict").append(jQuery("<option></option>").val("0").text("--SELECT DISTRICT--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#cdistrict").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#cdistrict").empty();
                jQuery("#cdistrict").append(jQuery("<option></option>").val("0").text("--SELECT DISTRICT--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#cdistrict").empty();
            jQuery("#cdistrict").append(jQuery("<option></option>").val("0").text("--SELECT DISTRICT--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetPost: function () {

        jQuery('.page-loader-wrapper').show();

        var District_id = jQuery("#cdistrict").val();


        var GetRentDetails =
        {
            flag: "ADD_OWNER",
            pagVal: "pin_load",
            parVal: District_id,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };


        try {
            GetRentDetails = JSON.stringify(GetRentDetails);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetRentDetails = { "encryptedRqstStr": EncryptAPIReq(GetRentDetails) };


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Customer_add.FillPost, userdata.token)
    },

    FillPost: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#cpost").empty();

                jQuery("#cpost").append(jQuery("<option></option>").val("0").text("--SELECT POST--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#cpost").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#cpost").empty();
                jQuery("#cpost").append(jQuery("<option></option>").val("0").text("--SELECT POST--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#cpost").empty();
            jQuery("#cpost").append(jQuery("<option></option>").val("0").text("--SELECT POST--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetCustomerStatus: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADD_OWNER",
            pagVal: "customertype_load",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };


        try {
            GetRentDetails = JSON.stringify(GetRentDetails);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetRentDetails = { "encryptedRqstStr": EncryptAPIReq(GetRentDetails) };


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Customer_add.FillCustomerStatus, userdata.token)
    },

    FillCustomerStatus: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#cstatus").empty();

                jQuery("#cstatus").append(jQuery("<option></option>").val("0").text("--SELECT STATUS--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#cstatus").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#cstatus").empty();
                jQuery("#cstatus").append(jQuery("<option></option>").val("0").text("--SELECT STATUS--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#cstatus").empty();
            jQuery("#cstatus").append(jQuery("<option></option>").val("0").text("--SELECT STATUS--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetIdType: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADD_OWNER",
            pagVal: "type_load",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };


        try {
            GetRentDetails = JSON.stringify(GetRentDetails);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetRentDetails = { "encryptedRqstStr": EncryptAPIReq(GetRentDetails) };


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Customer_add.FillIdType, userdata.token)
    },

    FillIdType: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#cidtype").empty();

                jQuery("#cidtype").append(jQuery("<option></option>").val("0").text("--SELECT ID TYPE--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#cidtype").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#cidtype").empty();
                jQuery("#cidtype").append(jQuery("<option></option>").val("0").text("--SELECT ID TYPE--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#cidtype").empty();
            jQuery("#cidtype").append(jQuery("<option></option>").val("0").text("--SELECT ID TYPE--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    GetOccupation: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADD_OWNER",
            pagVal: "occupation_load",
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };


        try {
            GetRentDetails = JSON.stringify(GetRentDetails);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        GetRentDetails = { "encryptedRqstStr": EncryptAPIReq(GetRentDetails) };


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Customer_add.FillOccupation, userdata.token)
    },

    FillOccupation: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#coccupation").empty();

                jQuery("#coccupation").append(jQuery("<option></option>").val("0").text("--SELECT OCCUPATION--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#coccupation").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#coccupation").empty();
                jQuery("#coccupation").append(jQuery("<option></option>").val("0").text("--SELECT OCCUPATION--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#coccupation").empty();
            jQuery("#coccupation").append(jQuery("<option></option>").val("0").text("--SELECT OCCUPATION--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    ConfirmCustomer: function (CustomerName, CustomerDOB, CustomerAddress, Customerphone, CustomerMobile, FatherorHusband, Locality, Customerpin, Country_id, Customerpassport, CustomerPAN, Occupation, customerStatus, Customeremail, IdType, IdNumber, DateOfissue, ExpiryDate, PlaceOfIssue, Description) {



        //alert(userdata.branchId + 'µ' + CustomerName + 'µ' + CustomerDOB + 'µ' + CustomerAddress + 'µ' + Customerphone + 'µ' + CustomerMobile + 'µ' + FatherorHusband + 'µ' + Locality + 'µ' + Customerpin + 'µ' + Country_id + 'µ' + Customerpassport + 'µ' + CustomerPAN + 'µ' + Occupation + 'µ' + customerStatus + 'µ' + Customeremail + 'µ' + IdType + 'µ' + IdNumber + 'µ' + DateOfissue + 'µ' + ExpiryDate + 'µ' + PlaceOfIssue + 'µ' + Description);
        jQuery('.page-loader-wrapper').show();


        var confrim = {

            flag: "ADD_OWNER",
            pagVal: "addowner_confirm",
            parVal: userdata.branchId + 'µ' + CustomerName + 'µ' + CustomerDOB + 'µ' + CustomerAddress + 'µ' + Customerphone + 'µ' + CustomerMobile + 'µ' + FatherorHusband + 'µ' + Locality + 'µ' + Customerpin + 'µ' + Country_id + 'µ' + Customerpassport + 'µ' + CustomerPAN + 'µ' + Occupation + 'µ' + customerStatus + 'µ' + Customeremail + 'µ' + IdType + 'µ' + IdNumber + 'µ' + DateOfissue + 'µ' + ExpiryDate + 'µ' + PlaceOfIssue + 'µ' + Description,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId

        };

        try {
            confrim = JSON.stringify(confrim);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        confrim = { "encryptedRqstStr": EncryptAPIReq(confrim) };

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", confrim, _Customer_add.ConfirmCustomerResponse, userdata.token)

    },

    ConfirmCustomerResponse: function (response) {


        jQuery('.page-loader-wrapper').hide();
        response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


        if (response.status == "SUCCESS") {


            var res = response.data.queryResult.QueryResult[0].Param1;



            swal({
                title: "success",
                text: res,
                type: "success"
            },



                function () {
                    window.location.reload(true);
                });


        }

        else {
            swal("Error", "Error", "error");
        }

    },


}
jQuery(document).ready(function ($) {

    _Customer_add.tokenValidate();

});

jQuery('#cstate').change(function () {

    _Customer_add.GetDistrict();
    jQuery("#cpost").empty();
    jQuery("#cpost").append(jQuery("<option></option>").val("0").text("--SELECT POST--"));
    jQuery("#cpincode").val('');


});

jQuery('#cdistrict').change(function () {

    _Customer_add.GetPost();
    jQuery("#cpincode").val('');
});

jQuery('#cpost').change(function () {

    var Post_id = jQuery("#cpost").val();
    //alert(Post_id);
    var pid = Post_id.split("@");
    jQuery('#cpincode').val(pid[0]);
});

//document.addEventListener("DOMContentLoaded", function () {
//    const today = new Date().toISOString().split('T')[0];
//    document.getElementById("cdateofissue").value = today;
//});

document.addEventListener("DOMContentLoaded", function () {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    document.getElementById("cdateofissue").value =
        `${day}-${month}-${year}`;
});


jQuery('#btn_exit').click(function () {

    window.location = "Dashboard";

});

jQuery('#BtnConfirm').click(function () {


    var Customerphone = jQuery("#cphone").val();
    var Customeremail = jQuery("#cemail").val();
    var Customerpassport = jQuery("#cpassport").val();
    var Country_id = jQuery("#ccountry").val();
    var Customerpin = jQuery("#cpincode").val();
    var ExpiryDate = jQuery("#cexpirydate").val();
    var PlaceOfIssue = jQuery("#cplace").val();
    var Description = jQuery("#cdescription").val();
    //validation required
    var CusName = jQuery("#custname").val();
    var gen = jQuery("#gen").val();
    var CustomerName = gen + CusName;

    var CustomerMobile = jQuery("#cmobile").val();
    var CustomerDOB = jQuery("#cdob").val();
    var FatherorHusband = jQuery("#forhname").val();
    var CustomerAddress = jQuery("#caddress").val();
    var CustomerPAN = jQuery("#cpan").val();
    var State_id = jQuery("#cstate").val();
    var District_id = jQuery("#cdistrict").val();
    var Post_id = jQuery("#cpost").val();
    var Locality = jQuery("#clocality").val();
    var customerStatus = jQuery("#cstatus").val();
    var Occupation = jQuery("#coccupation").val();
    var IdType = jQuery("#cidtype").val();
    var IdNumber = jQuery("#cidno").val();
    var DateOfissue = jQuery("#cdateofissue").val();
    // var Emp_brid = userdata.branchId;



    if (CustomerName == '') {
        swal("Please enter Customer Name !!!....", "", "warning");
        return false;

    }
    else if (CustomerMobile == '') {
        swal("Please Enter Mobile Number!!!....", "", "warning");
        return false;

    }

    else if (CustomerMobile.length > 0 && CustomerMobile.length < 10) {

        alert("Mobile number must be exactly 10 digits.");
        return false;

    }

    else if (CustomerDOB == '') {
        swal("Please Select Date Of Birth!!!....", "", "warning");
        return false;

    }

    else if (FatherorHusband == '') {
        swal("Please Enter Father/Husband Name!!!....", "", "warning");
        return false;

    }

    else if (CustomerAddress == '') {
        swal("Please Enter Address!!!....", "", "warning");
        return false;
    }

    else if (CustomerPAN == '') {
        swal("Please Enter PAN Number!!!....", "", "warning");
        return false;

    }

    else if (State_id == 0) {
        swal("Please select State !!!....", "", "warning");
        return false;

    }

    else if (District_id == 0) {
        swal("Please select District !!!....", "", "warning");
        return false;

    }
    else if (Post_id == 0) {
        swal("Please select Post !!!....", "", "warning");
        return false;

    }

    else if (Locality == '') {
        swal("Please Enter Locality!!!....", "", "warning");
        return false;
    }

    else if (customerStatus == 0) {
        swal("Please select Customer Status !!!....", "", "warning");
        return false;

    }

    else if (Occupation == 0) {
        swal("Please select Occupation !!!....", "", "warning");
        return false;

    }

    else if (IdType == 0) {
        swal("Please select ID Type !!!....", "", "warning");
        return false;

    }

    else if (IdNumber == '') {
        swal("Please ID Number!!!....", "", "warning");
        return false;
    }

    else if (DateOfissue == '') {
        swal("Select Date Of Issue!!!....", "", "warning");
        return false;
    }


    _Customer_add.ConfirmCustomer(CustomerName, CustomerDOB, CustomerAddress, Customerphone, CustomerMobile, FatherorHusband, Locality, Customerpin, Country_id, Customerpassport, CustomerPAN, Occupation, customerStatus, Customeremail, IdType, IdNumber, DateOfissue, ExpiryDate, PlaceOfIssue, Description);

});

jQuery('#bs_datepicker_container6 input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showbuttonPanel: true,
    defaultDate: "+1w",
    changeMonth: true,
    endDate: new Date(),
    endDate: '-1d',
    container: '#bs_datepicker_container6'
}).datepicker("setDate", new Date());

jQuery('#bs_datepicker_container7 input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showbuttonPanel: true,
    defaultDate: "+1w",
    changeMonth: true,
    endDate: new Date(),
    container: '#bs_datepicker_container7',
    orientation: "top auto"
}).datepicker("setDate", new Date());

jQuery('#bs_datepicker_container8 input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showbuttonPanel: true,
    changeMonth: true,
    container: '#bs_datepicker_container8',
    orientation: "top auto"
});

jQuery("#cemail").change(function () {

    var emailValue = jQuery("#cemail").val();

    // The standard email regex pattern
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (emailValue.length > 0) { // Only validate if not empty
        if (!emailPattern.test(emailValue)) {
            alert("Invalid Email Entry: Please enter a valid email address (e.g., name@domain.com).");

            jQuery("#cemail").val(""); // Clear the invalid input
            // Put the cursor back
        }
    }
});

document.getElementById("cpan").addEventListener("blur", function () {
    const pan = this.value.toUpperCase().trim();
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (this.value !== "" && !panRegex.test(pan)) {
        alert("Invalid PAN format. Example: ABCDE1234F");
        this.value = "";
        this.focus();
    } else {
        this.value = pan;
    }
});

jQuery("#cmobile").change(function () {

    var input = jQuery("#cmobile").val();

    if (input.length > 0 && input.length < 10) {

        alert("Invalid Entry: input must be exactly 10 digits.");


    }
});