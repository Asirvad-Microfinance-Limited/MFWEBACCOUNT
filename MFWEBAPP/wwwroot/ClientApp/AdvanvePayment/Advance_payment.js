

var _Advance_payment = {

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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", CheckAccess, _Advance_payment.checkAccessRtn, token)
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _Advance_payment.checkAccessToken, userdata.token)
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


                _Advance_payment.GetBranch();


            }


        }

    },

    GetBranch: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADVANCE_PAYMENT",
            pagVal: "1",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Advance_payment.FillBranch, userdata.token)
    },


    FillBranch: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlbranch2").empty();

                jQuery("#ddlbranch2").append(jQuery("<option></option>").val("0").text("--Select--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlbranch2").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlbranch2").empty();
                jQuery("#ddlbranch2").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlbranch2").empty();
            jQuery("#ddlbranch2").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },



    GetAdditionalAdvanceBranch: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADVANCE_PAYMENT",
            pagVal: "2",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Advance_payment.FillAdditinalBranch, userdata.token)
    },


    FillAdditinalBranch: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlbranch").empty();

                jQuery("#ddlbranch").append(jQuery("<option></option>").val("0").text("--Select--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlbranch").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlbranch").empty();
                jQuery("#ddlbranch").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlbranch").empty();
            jQuery("#ddlbranch").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetAdvanceBranch: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADVANCE_PAYMENT",
            pagVal: "3",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Advance_payment.FillGetAdvanceBranch, userdata.token)
    },


    FillGetAdvanceBranch: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlbranch").empty();

                jQuery("#ddlbranch").append(jQuery("<option></option>").val("0").text("--Select--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlbranch").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlbranch").empty();
                jQuery("#ddlbranch").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlbranch").empty();
            jQuery("#ddlbranch").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    GetCategory: function () {

        jQuery('.page-loader-wrapper').show();

        var Branch_value = jQuery("#ddlbranch").val();
        var input_slipted = Branch_value.split('^');
        var flat_no = input_slipted[0];

        var GetRentDetails =
        {
            flag: "ADVANCE_PAYMENT",
            pagVal: "4",
            parVal: 3 + 'µ' + flat_no,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Advance_payment.FillCategory, userdata.token)
    },


    FillCategory: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlCategory").empty();

                jQuery("#ddlCategory").append(jQuery("<option></option>").val("0").text("--Select--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                    jQuery("#ddlCategory").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });



            }
            else {
                jQuery("#ddlCategory").empty();
                jQuery("#ddlCategory").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlCategory").empty();
            jQuery("#ddlCategory").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    GetOwner: function () {

        jQuery('.page-loader-wrapper').show();

        var Branch_value = jQuery("#ddlbranch").val();
        var input_slipted = Branch_value.split('^');
        var flat_no = input_slipted[0];
        var Category = jQuery("#ddlCategory").val();

        var GetRentDetails =
        {
            flag: "ADVANCE_PAYMENT",
            pagVal: "5",
            parVal: 3 + 'µ' + flat_no + 'µ' + Category,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Advance_payment.FillOwner, userdata.token)
    },


    FillOwner: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlOwner").empty();

                jQuery("#ddlOwner").append(jQuery("<option></option>").val("0").text("--Select--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlOwner").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlOwner").empty();
                jQuery("#ddlOwner").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlOwner").empty();
            jQuery("#ddlOwner").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    GetAccountDetails: function () {


        // jQuery('.page-loader-wrapper').show();


        var result = jQuery("#ddlOwner").val();
        var res = result.split('^');
        var rent_id = res[0];



        var GetRentDetails =
        {
            flag: "ADVANCE_PAYMENT",
            pagVal: "8",
            parVal: rent_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Advance_payment.FillAccounttDetails, userdata.token)


    },




    FillAccounttDetails: function (response) {

        if (response.status === "SUCCESS") {


            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                var res = response.data.queryResult.QueryResult[0].Param1;

                var parts = res.split("^");

                jQuery("#TxtCustName").val(parts[0]);
                jQuery("#TxtAccNo").val(parts[1]);
                jQuery("#TxtBank").val(parts[2]);
                jQuery("#TxtBranch").val(parts[3]);
                jQuery("#TxtIFSC").val(parts[4]);




            }
            jQuery('.page-loader-wrapper').hide();
        }

        jQuery('.page-loader-wrapper').hide();

    },

    ConfirmPayment: function (branch_id, rent_cat_id, rent_id, advance, remarks, paymode, payment_to, advStatus, advAmt) {




        jQuery('.page-loader-wrapper').show();

        var confrim = {

            flag: "ADVANCE_PAYMENT",
            pagVal: "Rent_advance_payment",
            ////    1               2                 3                4               5                6             7                8                    9                  10          11                 12
            parVal: 3 + 'µ' + branch_id + 'µ' + rent_cat_id + 'µ' + rent_id + 'µ' + advance + 'µ' + remarks + 'µ' + paymode + 'µ' + payment_to + 'µ' + userdata.userId + 'µ' + 3 + 'µ' + advStatus + 'µ' + advAmt,
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", confrim, _Advance_payment.ConfirmPaymentResponse, userdata.token)
    },

    ConfirmPaymentResponse: function (response) {

        jQuery('.page-loader-wrapper').hide();

        // var str = response.data.queryResult[0].param1;
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

    _Advance_payment.tokenValidate();

});

jQuery('#AdditinalAdvance').change(function () {

    jQuery('#Advance_div').show();
    jQuery("#ddlCategory").empty();
    jQuery("#ddlCategory").append(jQuery("<option></option>").val("0").text("--Select--"));
    jQuery("#ddlOwner").empty();
    jQuery("#ddlOwner").append(jQuery("<option></option>").val("0").text("--Select--"));
    jQuery("#TxtSeqDeposit").val('');
    jQuery("#TxtRemarks").val('');
    jQuery("#TxtCustName").val('');
    jQuery("#TxtAccNo").val('');
    jQuery("#TxtBank").val('');
    jQuery("#TxtBranch").val('');
    jQuery("#TxtIFSC").val('');
    jQuery('#account_div').hide();
    jQuery('#payment_branch_div').hide();
    jQuery("#ddlpaymode").empty();
    jQuery("#ddlpaymode").append(jQuery("<option></option>").val("0").text("--Select--"));
    jQuery("#ddlpaymode").append(jQuery("<option></option>").val("N").text("IMPS"));
    _Advance_payment.GetAdditionalAdvanceBranch();

});
jQuery('#AdvncNumber').change(function () {

    jQuery('#Advance_div').hide();
    jQuery("#ddlCategory").empty();
    jQuery("#ddlCategory").append(jQuery("<option></option>").val("0").text("--Select--"));
    jQuery("#ddlOwner").empty();
    jQuery("#ddlOwner").append(jQuery("<option></option>").val("0").text("--Select--"));
    jQuery("#TxtSeqDeposit").val('');
    jQuery("#TxtRemarks").val('');
    jQuery("#TxtCustName").val('');
    jQuery("#TxtAccNo").val('');
    jQuery("#TxtBank").val('');
    jQuery("#TxtBranch").val('');
    jQuery("#TxtIFSC").val('');
    jQuery('#account_div').hide();
    jQuery('#payment_branch_div').hide();
    jQuery("#ddlpaymode").empty();
    jQuery("#ddlpaymode").append(jQuery("<option></option>").val("0").text("--Select--"));
    jQuery("#ddlpaymode").append(jQuery("<option></option>").val("N").text("IMPS"));
    _Advance_payment.GetAdvanceBranch();

});
jQuery('#ddlbranch').change(function () {


    _Advance_payment.GetCategory();
    jQuery("#ddlOwner").empty();
    jQuery("#ddlOwner").append(jQuery("<option></option>").val("0").text("--Select--"));
    jQuery("#TxtSeqDeposit").val('');
    jQuery("#TxtRemarks").val('');
    jQuery("#TxtCustName").val('');
    jQuery("#TxtAdvanceAmt").val('');
    jQuery("#TxtAccNo").val('');
    jQuery("#TxtBank").val('');
    jQuery("#TxtBranch").val('');
    jQuery("#TxtIFSC").val('');
    jQuery('#account_div').hide();
    jQuery('#payment_branch_div').hide();
    jQuery("#ddlpaymode").empty();
    jQuery("#ddlpaymode").append(jQuery("<option></option>").val("0").text("--Select--"));
    jQuery("#ddlpaymode").append(jQuery("<option></option>").val("N").text("IMPS"));

});

jQuery('#ddlCategory').change(function () {


    _Advance_payment.GetOwner();

    var cat_id = jQuery('#ddlCategory').val();

    if (cat_id == 1 || cat_id == 11 || cat_id == 12) {
        jQuery("#ddlpaymode").empty();
        jQuery("#ddlpaymode").append(jQuery("<option></option>").val("0").text("--Select--"));
        jQuery("#ddlpaymode").append(jQuery("<option></option>").val("N").text("IMPS"));

    }
    else {

        jQuery("#ddlpaymode").empty();
        jQuery("#ddlpaymode").append(jQuery("<option></option>").val("0").text("--Select--"));
        jQuery("#ddlpaymode").append(jQuery("<option></option>").val("D").text("DEBIT ADVICE"));
        jQuery("#ddlpaymode").append(jQuery("<option></option>").val("N").text("NEFT"));

    }

});

jQuery('#ddlOwner').change(function () {


    var Owner = jQuery("#ddlOwner").val();
    var Owner_array = Owner.split('^');
    var Advance = Owner_array[1];
    jQuery("#TxtSeqDeposit").val(Advance);

});

jQuery('#ddlpaymode').change(function () {


    var paymod = jQuery('#ddlpaymode').val();
    if (paymod == 'N') {

        _Advance_payment.GetAccountDetails();
        jQuery('#account_div').show();
        jQuery('#payment_branch_div').hide();
    }
    else if (paymod == '0') {
        jQuery('#account_div').hide();
        jQuery('#payment_branch_div').hide();

    }
    else if (paymod == 'D') {
        jQuery('#payment_branch_div').show();
        jQuery('#account_div').hide();
    }

});


jQuery('#btn_exit').click(function () {

    window.location = "Dashboard";

});


jQuery('#BtnConfirm').click(function () {



    if (jQuery("#AdvncNumber").prop("checked") == true) {
        var adv_type = jQuery("#AdvncNumber").val();
    }
    else if (jQuery("#AdditinalAdvance").prop("checked") == true) {
        var adv_type = jQuery("#AdditinalAdvance").val();
    }
    else {
        var adv_type = 0;
    }
    var branch = jQuery("#ddlbranch").val();
    var category = jQuery("#ddlCategory").val();
    var owner = jQuery("#ddlOwner").val();
    var remarks = jQuery("#TxtRemarks").val().trim();
    var additional_advance = jQuery("#TxtAdvanceAmt").val();
    var paymode = jQuery("#ddlpaymode").val();

    if (adv_type == 0) {
        swal("Select Advance Type !!!....", "", "warning");
        return false;

    }
    else if (branch == 0) {
        swal("Select Branch !!!....", "", "warning");
        return false;
    }
    else if (category == 0) {
        swal("Select Category !!!....", "", "warning");
        return false;
    }
    else if (owner == 0) {
        swal("Select Owner !!!....", "", "warning");
        return false;
    }

    else if (remarks == '') {
        swal("Enter Remarks !!!....", "", "warning");
        return false;
    }

    else if (adv_type == 2 && additional_advance == '') {
        swal("Enter Additional Advance !!!....", "", "warning");
        return false;
    }
    else if (paymode == 0) {
        swal("Select Payment Mode !!!....", "", "warning");
        return false;
    }

    var branch_ddl_value = branch.split('^');

    if (branch_ddl_value[1] == undefined) {


        var branch_id = branch_ddl_value[0];
    }
    else {
        var branch_id = branch_ddl_value[1];
    }

    var rent_cat_id = category;
    var owner_ddl_value = owner.split('^');
    var rent_id = owner_ddl_value[0];
    var advance = jQuery("#TxtSeqDeposit").val();
    if (adv_type == 1) {
        var advStatus = 0;
        var advAmt = 0;
    }
    else if (adv_type == 1) {
        var advStatus = 1;
        var advAmt = jQuery("#TxtAdvanceAmt").val();
    }

    var paymode = 'N';

    if (jQuery("#ddlpaymode").val() == 'N') {
        var payment_to = 0;
    }
    else if (jQuery("#ddlpaymode").val() == 'D')
    {
        var payment_to = jQuery("#ddlbranch2").val();
    }
    else
    {
        var payment_to = 0;
    }
    
 

    _Advance_payment.ConfirmPayment(branch_id, rent_cat_id, rent_id, advance, remarks, paymode, payment_to, advStatus, advAmt);

});
