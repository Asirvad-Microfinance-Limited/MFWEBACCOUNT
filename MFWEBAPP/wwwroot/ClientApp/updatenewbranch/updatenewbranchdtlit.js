


var _Update_newbranch = {

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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", CheckAccess, _Update_newbranch.checkAccessRtn, token)
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _Update_newbranch.checkAccessToken, userdata.token)
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



                _Update_newbranch.GetBranch();
                _Update_newbranch.GetFirm();
                _Update_newbranch.GetLanguage();


            }


        }

    },

    GetBranch: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "UPDATE_NEW_BRANCH_DETAIL",
            pagVal: "branch_load",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Update_newbranch.FillBranch, userdata.token)
    },

    FillBranch: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#branchname").empty();

                jQuery("#branchname").append(jQuery("<option></option>").val("0").text("--SELECT BRANCH--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                    //var branch_name = val.Param2;
                    //var branch = branch_name.split('~');
                    jQuery("#branchname").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#branchname").empty();
                jQuery("#branchname").append(jQuery("<option></option>").val("0").text("--SELECT BRANCH--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#branchname").empty();
            jQuery("#branchname").append(jQuery("<option></option>").val("0").text("--SELECT BRANCH--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetFirm: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "UPDATE_NEW_BRANCH_DETAIL",
            pagVal: "firm_load",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Update_newbranch.FillFirm, userdata.token)
    },

    FillFirm: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#firmname").empty();

                //jQuery("#firmname").append(jQuery("<option></option>").val("0").text("--SELECT BRANCH--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                    //var branch_name = val.Param2;
                    //var branch = branch_name.split('~');
                    jQuery("#firmname").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#firmname").empty();
                jQuery("#firmname").append(jQuery("<option></option>").val("0").text("--SELECT FIRM--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#firmname").empty();
            jQuery("#firmname").append(jQuery("<option></option>").val("0").text("--SELECT FIRM--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetLanguage: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "UPDATE_NEW_BRANCH_DETAIL",
            pagVal: "language_load",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Update_newbranch.FillLanguage, userdata.token)
    },

    FillLanguage: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#language").empty();

                jQuery("#language").append(jQuery("<option></option>").val("0").text("--SELECT LANGUAGE--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {


                    jQuery("#language").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#language").empty();
                jQuery("#language").append(jQuery("<option></option>").val("0").text("--SELECT LANGUAGE--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#language").empty();
            jQuery("#language").append(jQuery("<option></option>").val("0").text("--SELECT LANGUAGE--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetBranchType: function () {

        jQuery('.page-loader-wrapper').show();

        var branch_name = jQuery("#branchname").val();
        var input = branch_name.split('~');
        var branch_id = input[0];

        var GetRentDetails =
        {
            flag: "UPDATE_NEW_BRANCH_DETAIL",
            pagVal: "brach_type",
            typeID: "4",
            parVal: branch_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Update_newbranch.FillBranchType, userdata.token)
    },

    FillBranchType: function (response) {

        if (response.status === "SUCCESS") {


            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                var res = response.data.queryResult.QueryResult[0].Param1;

                var parts = res.split("^");

                jQuery("#branchtype").val(parts[1]);

                jQuery("#branchtype").data("actual-value", parts[0]);

                // To retrieve the ID later for a form submission or API call:
               // var savedId = jQuery("#branchtype").data("actual-value");

            }


            jQuery('.page-loader-wrapper').hide();
        }

        jQuery('.page-loader-wrapper').hide();

    },

    GetEmployee: function () {

        // jQuery('.page-loader-wrapper').show();

        var emp_code = jQuery("#empcode").val();

        jQuery("#headname").val('');




        var GetRentDetails =
        {
            flag: "UPDATE_NEW_BRANCH_DETAIL",
            pagVal: "empname_load",
            parVal: emp_code,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Update_newbranch.FillEmpName, userdata.token)
    },




    FillEmpName: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                var res = response.data.queryResult.QueryResult[0].Param1;

                jQuery("#headname").val(res);

            }
            // jQuery('.page-loader-wrapper').hide();
        }

        //jQuery('.page-loader-wrapper').hide();
    },

    UpdateNewBranch: function (old_id, Language, BranchType, BHEmpcode, InagDate, BranchPhone, BranchEmail, GSTnumber, CINnumber, RBIregno) {




        //alert(old_id + 'µ' + Language + 'µ' + BranchType + 'µ' + BHEmpcode + 'µ' + InagDate + 'µ' + BranchPhone + 'µ' + BranchEmail + 'µ' + GSTnumber + 'µ' + CINnumber + 'µ' + RBIregno);

        jQuery('.page-loader-wrapper').show();


        var confrim = {

            flag: "UPDATE_NEW_BRANCH_DETAIL",
            pagVal: "upd_newbranch_confirm",
            parVal: old_id + 'µ' + Language + 'µ' + BranchType + 'µ' + BHEmpcode + 'µ' + InagDate + 'µ' + BranchPhone + 'µ' + BranchEmail + 'µ' + GSTnumber + 'µ' + CINnumber + 'µ' + RBIregno,
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", confrim, _Update_newbranch.ConfirmUpdateNewBranchResponse, userdata.token)

    },

    ConfirmUpdateNewBranchResponse: function (response) {


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

    _Update_newbranch.tokenValidate();

});

jQuery('#btn_exit').click(function () {

    window.location = "Dashboard";

});

function ChkEmail() {

    var emailInput = document.getElementById("bemail");
    var val = emailInput.value;

    if (val !== "") {

        var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/i;

        if (val.match(emailPattern)) {
            return true;
        } else {
            alert("Invalid Email...");
            emailInput.value = "";
            emailInput.focus();
            return false;
        }
    }
}
jQuery("#bphone").on("change", function () {
    var input = jQuery(this).val();

    // Check if there is a value and if it's less than 10 digits
    if (input.length > 0 && input.length < 10) {
        alert("Invalid Entry: Phone number must be exactly 10 digits.");

        // Optional: Clear the field and refocus so they fix it immediately
        jQuery(this).val("");
        jQuery(this).focus();
    }
});

function GstIn() {
    var val = document.getElementById("gstinno").value;
    if (val != "") {
        var Gstno = /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([zZ]){1}([0-9a-zA-Z]){1}?$/;
        if (document.getElementById("gstinno").value.match(Gstno)) {

        }
        else {
            alert("Invalid GSTIN Number...!");
            document.getElementById("gstinno").value = "";
            document.getElementById("gstinno").focus();
            return false;
        }
    }
}



jQuery('#bs_datepicker_container7 input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showbuttonPanel: true,
    changeMonth: true,
    container: '#bs_datepicker_container7'
});


document.addEventListener("DOMContentLoaded", function () {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    document.getElementById("inagurationdate").value =
        `${day}-${month}-${year}`;
});

jQuery('#branchname').change(function () {


    //jQuery("#branchtype").val('');
    _Update_newbranch.GetBranchType();


});

jQuery('#empcode').change(function () {
    var code = jQuery('#empcode').val();

    // Only alert if they actually typed something but it's less than 6
    if (code.length > 0 && code.length < 6) {
        alert("Employee Code must be exactly 6 digits.");
        jQuery('#empcode').focus(); // Bring cursor back to fix it
    }
    else {
        _Update_newbranch.GetEmployee();
    }

});

jQuery('#BtnConfirm').click(function () {



    //validation required
    var BranchName = jQuery("#branchname").val();
    var input = BranchName.split('~');
    var old_id = input[1];
    var Language = jQuery("#language").val();
    var BHEmpcode = jQuery("#empcode").val().trim();
    var InagDate = jQuery("#inagurationdate").val();
    var BranchPhone = jQuery("#bphone").val().trim();
    var BranchEmail = jQuery("#bemail").val().trim();
    var BranchType = jQuery("#branchtype").data("actual-value");//jQuery("#branchtype").val();
    var GSTnumber = jQuery("#gstinno").val();
    var CINnumber = jQuery("#cinno").val();
    var RBIregno = jQuery("#rbiregno").val();

    ///alert(BranchType);


    if (BranchName == '0') {
        swal("Please Select Branch Name !!!....", "", "warning");
        return false;

    }
    else if (Language == '0') {
        swal("Please Select Language !!!....", "", "warning");
        return false;

    }
    else if (BHEmpcode == '') {
        swal("Please Enter Branch Head Employee Code !!!....", "", "warning");
        return false;

    }

    else if (InagDate == '') {
        swal("Please Select Inauguration Date !!!....", "", "warning");
        return false;

    }

    else if (BranchPhone == '') {
        swal("Please Enter Branch Phone Number !!!....", "", "warning");
        return false;

    }

    else if (BranchEmail == '') {
        swal("Please Enter Branch Email !!!....", "", "warning");
        return false;

    }



    _Update_newbranch.UpdateNewBranch(old_id, Language, BranchType, BHEmpcode, InagDate, BranchPhone, BranchEmail, GSTnumber, CINnumber, RBIregno);

});