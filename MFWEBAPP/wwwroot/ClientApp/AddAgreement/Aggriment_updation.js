

jQuery(document).ready(function ($) {

    _Agreement_updation.tokenValidate();

});

var _Agreement_updation = {

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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", CheckAccess, _Agreement_updation.checkAccessRtn, token)
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _Agreement_updation.checkAccessToken, userdata.token)
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

                _Agreement_updation.GetBranch();



            }


        }

    },

    GetBranch: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "AGREEMENTUPDATION",
            pagVal: "1",
            parVal: 3,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Agreement_updation.FillBranch, userdata.token)
    },

    FillBranch: function (response) {

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

        var branch_id = jQuery("#ddlbranch").val();
        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "AGREEMENTUPDATION",
            pagVal: "2",
            parVal: 3 + 'µ' + branch_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Agreement_updation.FillCategory, userdata.token)
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

    GetBuilding: function () {

        var branch_id = jQuery("#ddlbranch").val();
        var category = jQuery("#ddlCategory").val();

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "AGREEMENTUPDATION",
            pagVal: "3",
            parVal: 3 + 'µ' + branch_id + 'µ' + category,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Agreement_updation.FillBuilding, userdata.token)
    },

    FillBuilding: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlbuilding").empty();

                jQuery("#ddlbuilding").append(jQuery("<option></option>").val("0").text("--Select--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlbuilding").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlbuilding").empty();
                jQuery("#ddlbuilding").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlbuilding").empty();
            jQuery("#ddlbuilding").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    GetAgreementDetails: function () {

        var building = jQuery("#ddlbuilding").val();
        if (building == 0) {
            jQuery("#TxtrentPeriod").val('');
            jQuery("#TxtEnhcePeriod").val('');
            jQuery("#TxtAdvncPaiddt").val('');
        }
        else {
            var branch_id = jQuery("#ddlbranch").val();
            var category = jQuery("#ddlCategory").val();

            jQuery('.page-loader-wrapper').show();


            var GetRentDetails =
            {
                flag: "AGREEMENTUPDATION",
                pagVal: "4",
                parVal: 3 + 'µ' + branch_id + 'µ' + category,
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


            _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Agreement_updation.FillAgreementDetails, userdata.token)
        }
    },


    FillAgreementDetails: function (response) {

        if (response.status === "SUCCESS") {


            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                var res = response.data.queryResult.QueryResult[0].Param1;

                var parts = res.split("^");

                jQuery("#TxtrentPeriod").val(parts[0]);
                jQuery("#TxtEnhcePeriod").val(parts[1]);
                jQuery("#TxtAdvncPaiddt").val(parts[2]);



            }
            jQuery('.page-loader-wrapper').hide();
        }

        jQuery('.page-loader-wrapper').hide();
    },


    ConfirmAgreement: function (branch_id, category, building, rent_period, enhance_period, advance_dt, agreement_dt, effective_dt, next_enhance_dt, agrrement_end_dt, Inaguration_dt, Completion_dt, Chk_advancePaid) {

        jQuery('.page-loader-wrapper').show();

        var confrim = {

            flag: "AGREEMENTUPDATION",
            pagVal: "Confirm_Agreement",
            //    1               2          3                  4                 5                6                     7                    8                   9                      10                    11                     12                       13                    14                     15              
            parVal: userdata.userId + 'µ' + 3 + 'µ' + branch_id + 'µ' + category + 'µ' + building + 'µ' + rent_period + 'µ' + enhance_period + 'µ' + advance_dt + 'µ' + agreement_dt + 'µ' + effective_dt + 'µ' + next_enhance_dt + 'µ' + agrrement_end_dt + 'µ' + Inaguration_dt + 'µ' + Completion_dt + 'µ' + Chk_advancePaid,
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", confrim, _Agreement_updation.ConfirmResponse, userdata.token)

    },


    ConfirmResponse: function (response) {

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




jQuery('#ddlbranch').change(function () {


    jQuery("#ddlbuilding").empty();
    jQuery("#ddlbuilding").append(jQuery("<option></option>").val("0").text("--Select --"));
    jQuery("#TxtrentPeriod").val('');
    jQuery("#TxtEnhcePeriod").val('');
    jQuery("#TxtAdvncPaiddt").val('');
    jQuery("#TxtAgrmtDt").val('');
    jQuery("#TxtEffectiveDt").val('');
    jQuery("#TxtNextEnhancementDat").val('');
    jQuery("#TxtAgreementEndDt").val('');
    jQuery("#TxtInaugurationDt").val('');
    jQuery("#TxtWorkCompletionDt").val('');
    _Agreement_updation.GetCategory();


});

jQuery('#ddlCategory').change(function () {

    jQuery("#TxtrentPeriod").val('');
    jQuery("#TxtEnhcePeriod").val('');
    jQuery("#TxtAdvncPaiddt").val('');
    jQuery("#TxtAgrmtDt").val('');
    jQuery("#TxtEffectiveDt").val('');
    jQuery("#TxtNextEnhancementDat").val('');
    jQuery("#TxtAgreementEndDt").val('');
    jQuery("#TxtInaugurationDt").val('');
    jQuery("#TxtWorkCompletionDt").val('');
    _Agreement_updation.GetBuilding();

});


jQuery('#ddlbuilding').change(function () {

    jQuery("#TxtrentPeriod").val('');
    jQuery("#TxtEnhcePeriod").val('');
    jQuery("#TxtAdvncPaiddt").val('');
    jQuery("#TxtAgrmtDt").val('');
    jQuery("#TxtEffectiveDt").val('');
    jQuery("#TxtNextEnhancementDat").val('');
    jQuery("#TxtAgreementEndDt").val('');
    jQuery("#TxtInaugurationDt").val('');
    jQuery("#TxtWorkCompletionDt").val('');

    _Agreement_updation.GetAgreementDetails();

});


jQuery('#bs_datepicker_container3 input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showButtonPanel: true,
    changeMonth: true,
    container: '#bs_datepicker_container3'
})/*.datepicker("setDate", new Date())*/;

jQuery('#bs_datepicker_container2 input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showButtonPanel: true,
    changeMonth: true,
    container: '#bs_datepicker_container2'
})/*.datepicker("setDate", new Date())*/;

jQuery('#bs_datepicker_container4 input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showButtonPanel: true,
    changeMonth: true,
    container: '#bs_datepicker_container4'
})/*.datepicker("setDate", new Date())*/;

jQuery('#bs_datepicker_container5 input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showButtonPanel: true,
    changeMonth: true,
    container: '#bs_datepicker_container5'
})/*.datepicker("setDate", new Date())*/;


jQuery('#bs_datepicker_container6 input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showButtonPanel: true,
    changeMonth: true,
    container: '#bs_datepicker_container6',
    orientation: "top auto"
});

jQuery('#bs_datepicker_container7 input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showButtonPanel: true,
    changeMonth: true,
    container: '#bs_datepicker_container7',
    orientation: "top auto"
});







jQuery('#TxtEffectiveDt, #TxtAgrmtDt').change(function () {
    var effectiveStr = jQuery('#TxtEffectiveDt').val();
    var agreementStr = jQuery('#TxtAgrmtDt').val();
    var enhancementMonths = parseInt(jQuery('#TxtEnhcePeriod').val()) || 0;

    if (effectiveStr && agreementStr) {
        var effectiveDate = parseDate(effectiveStr);
        var agreementDate = parseDate(agreementStr);

        // 1. Validation & Correction
        if (effectiveDate < agreementDate) {
            // UPDATED: Set the datepicker value instead of just the text value
            jQuery('#TxtEffectiveDt').datepicker('setDate', agreementDate);

            // Re-sync local variable
            effectiveDate = new Date(agreementDate);

            swal("Effective Date Must Be After Agreement Date...", "", "warning");
        }

        // 2. Calculate Future Date
        var futureDate = new Date(effectiveDate);
        futureDate.setMonth(futureDate.getMonth() + enhancementMonths);

        // 3. UPDATED: Set the result datepickers
        // Using 'setDate' handles the formatting (DD/MM/YYYY) automatically based on your init settings
        jQuery('#TxtAgreementEndDt').datepicker('setDate', futureDate);
        jQuery('#TxtNextEnhancementDat').datepicker('setDate', futureDate);
    }
});


jQuery('#TxtInaugurationDt').change(function () {


    var effectiveStr = jQuery('#TxtEffectiveDt').val();
    var Inaugurationdt = jQuery('#TxtInaugurationDt').val();

    if (effectiveStr && Inaugurationdt) {

        // Convert strings to Date Objects for accurate comparison
        var effectiveDate = parseDate(effectiveStr);
        var InaugurationDate = parseDate(Inaugurationdt);
        // var agrrementEndDate = parseDate(effectiveStr - 1);

        if (effectiveDate > InaugurationDate) {
            swal("Inauguration Date Must Be After Effective Date!", "", "warning");
            jQuery('#TxtInaugurationDt').val('');
            // return false;
        }

    }

});

// Helper function to parse "DD/MM/YYYY" strings
function parseDate(str) {
    var parts = str.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

jQuery('#btn_exit').click(function () {

    window.location = "Dashboard";

});




function updateCheckboxValue(chk) {
    // If checked, assign 'T', otherwise assign 'F'
    chk.value = chk.checked ? "T" : "F";

    // Log to console so you can verify it's working
    //console.log("Current Value:", chk.value);
}

jQuery('#BtnConfirm').click(function () {

    //    jQuery('.page-loader-wrapper').hide();

    var branch_id = jQuery("#ddlbranch").val();
    var category = jQuery("#ddlCategory").val();
    var building = jQuery("#ddlbuilding").val();
    var rent_period = jQuery("#TxtrentPeriod").val();
    var enhance_period = jQuery("#TxtEnhcePeriod").val();
    var advance_dt = jQuery("#TxtAdvncPaiddt").val();
    var agreement_dt = jQuery("#TxtAgrmtDt").val();
    var effective_dt = jQuery("#TxtEffectiveDt").val();
    var next_enhance_dt = jQuery("#TxtNextEnhancementDat").val();
    var agrrement_end_dt = jQuery("#TxtAgreementEndDt").val();
    var Inaguration_dt = jQuery("#TxtInaugurationDt").val();
    var Completion_dt = jQuery("#TxtWorkCompletionDt").val();
    var Chk_advancePaid = jQuery("#chkRentPaid").val();


    if (branch_id == 0) {
        swal("Please Select Branch !!!....", "", "warning");
        return false;

    }
    else if (category == 0) {
        swal("Please Select Category!!!....", "", "warning");
        return false;

    }

    else if (building == 0) {
        swal("Please Select Building !!!....", "", "warning");
        return false;

    }

    else if (agreement_dt == '') {
        swal("Please Select Agreement date !!!....", "", "warning");
        return false;

    }

    else if (effective_dt == '') {
        swal("Please Select Effective Date  !!!....", "", "warning");
        return false;

    }

    else if (Inaguration_dt == '') {
        swal("Please Select Inauguration Date  !!!....", "", "warning");
        return false;

    }

    else if (Completion_dt == '') {
        swal("Please Select Work Completion Date  !!!....", "", "warning");
        return false;

    }

    _Agreement_updation.ConfirmAgreement(branch_id, category, building, rent_period, enhance_period, advance_dt, agreement_dt, effective_dt, next_enhance_dt, agrrement_end_dt, Inaguration_dt, Completion_dt, Chk_advancePaid);

});


