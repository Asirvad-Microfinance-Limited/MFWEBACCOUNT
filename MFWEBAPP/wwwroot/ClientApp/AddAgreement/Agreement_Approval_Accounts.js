

jQuery(document).ready(function ($) {

    _Agreement_approval.tokenValidate();

});




var _Agreement_approval = {

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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", CheckAccess, _Agreement_approval.checkAccessRtn, token)
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _Agreement_approval.checkAccessToken, userdata.token)
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


                _Agreement_approval.GetAgreement();



            }


        }

    },


    GetAgreement: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "AGREEMENTAPVACCOUNTS",
            pagVal: "2",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Agreement_approval.FillAgreement, userdata.token)
    },

    FillAgreement: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlAgreementh").empty();

                jQuery("#ddlAgreementh").append(jQuery("<option></option>").val("0").text("--Select--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlAgreementh").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlAgreementh").empty();
                jQuery("#ddlAgreementh").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlAgreementh").empty();
            jQuery("#ddlAgreementh").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    GetAgreementCMD: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "AGREEMENTAPVACCOUNTS",
            pagVal: "6",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Agreement_approval.FillAgreementcmd, userdata.token)
    },

    FillAgreementcmd: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlAgreementh").empty();

                jQuery("#ddlAgreementh").append(jQuery("<option></option>").val("0").text("--Select--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlAgreementh").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlAgreementh").empty();
                jQuery("#ddlAgreementh").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlAgreementh").empty();
            jQuery("#ddlAgreementh").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    GetAgreementDetails: function () {


        // jQuery('.page-loader-wrapper').show();

        jQuery("#TxtrentPeriod").val('');
        jQuery("#TxtEnhancePrd").val('');
        jQuery("#TxtAgrmtDt").val('');
        jQuery("#TxtEffDate").val('');
        jQuery("#TxtAggEndDate").val('');
        jQuery("#TxtNxtEnhancement").val('');
        jQuery("#TxtInagurationDt").val('');
        jQuery("#TxtCompletionDt").val('');
        jQuery("#TxtEffectiveDtIfAny").val('');
        jQuery("#TxtAggEndDate2").val('');
        jQuery("#TxtNxtEnhancement2").val('');

        var result = jQuery("#ddlAgreementh").val();
        var res = result.split('~');
        var branch_id = res[0];
        var flat_no = res[1];


        var GetRentDetails =
        {
            flag: "AGREEMENTAPVACCOUNTS",
            pagVal: "4",
            parVal: 3 + 'µ' + branch_id + 'µ' + flat_no,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Agreement_approval.FillAgreementDetails, userdata.token)


    },




    FillAgreementDetails: function (response) {

        if (response.status === "SUCCESS") {


            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                var res = response.data.queryResult.QueryResult[0].Param1;

                var parts = res.split("^");

                jQuery("#TxtrentPeriod").val(parts[0]);
                jQuery("#TxtEnhancePrd").val(parts[1]);
                jQuery("#TxtAgrmtDt").val(DateFormating(parts[2]));
                jQuery("#TxtEffDate").val(DateFormating(parts[3]));
                jQuery("#TxtInagurationDt").val(DateFormating(parts[4]));
                jQuery("#TxtAggEndDate").val(DateFormating(parts[5]));
                jQuery("#TxtNxtEnhancement").val(DateFormating(parts[6]));
                jQuery("#TxtCompletionDt").val(DateFormating(parts[7]));
                jQuery("#TxtEffectiveDtIfAny").val(DateFormating(parts[3]));
                jQuery("#TxtAggEndDate2").val(DateFormating(parts[5]));
                jQuery("#TxtNxtEnhancement2").val(DateFormating(parts[6]));



            }
            jQuery('.page-loader-wrapper').hide();
        }

        jQuery('.page-loader-wrapper').hide();

    },

    ConfirmAgreement: function (branch_id, flat_no, EffectiveDt, AgreementEndDt, NxtEnhancementDt) {

        /// alert(branch_id + '^' + flat_no + '^' + EffectiveDt + '^' + AgreementEndDt + '^' + NxtEnhancementDt);


        jQuery('.page-loader-wrapper').show();

        var confrim = {

            flag: "AGREEMENTAPVACCOUNTS",
            pagVal: "Agreement_approval",
            ////    1               2                    3                    4                     5                       6                 7
            parVal: 3 + 'µ' + userdata.userId + 'µ' + branch_id + 'µ' + AgreementEndDt + 'µ' + NxtEnhancementDt + 'µ' + EffectiveDt + 'µ' + flat_no,
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", confrim, _Agreement_approval.ConfirmResponse, userdata.token)
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




jQuery('#bs_datepicker_container1 input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showButtonPanel: true,
    changeMonth: true,
    container: '#bs_datepicker_container1',
    orientation: "top auto"
});




jQuery('#TxtEffectiveDtIfAny').change(function () {

    var effectiveStr = jQuery('#TxtEffectiveDtIfAny').val();
    var agreementStr = jQuery('#TxtAgrmtDt').val();
    var enhancementMonths = parseInt(jQuery('#TxtEnhancePrd').val()) || 0;


    if (effectiveStr && agreementStr) {

        var effectiveDate = parseDate(effectiveStr);
        var agreementDate = parseDate(agreementStr);

        // 1. Validation & Correction
        if (effectiveDate < agreementDate) {
            // UPDATED: Set the datepicker value instead of just the text value
            jQuery('#TxtEffectiveDtIfAny').datepicker('setDate', agreementDate);

            // Re-sync local variable
            effectiveDate = new Date(agreementDate);

            swal("Effective Date Must Be After Agreement Date...", "", "warning");
        }

        // 2. Calculate Future Date
        var futureDate = new Date(effectiveDate);
        futureDate.setMonth(futureDate.getMonth() + enhancementMonths);


        var dd = String(futureDate.getDate()).padStart(2, '0');
        var mm = String(futureDate.getMonth() + 1).padStart(2, '0');
        var yyyy = futureDate.getFullYear();
        var formattedDate = dd + '/' + mm + '/' + yyyy;

        // 3. UPDATED: Set the result datepickers
        // Using 'setDate' handles the formatting (DD/MM/YYYY) automatically based on your init settings
        jQuery('#TxtAggEndDate2').val(formattedDate);
        jQuery('#TxtNxtEnhancement2').val(formattedDate);
    }
});


jQuery('#btn_exit').click(function () {

    window.location = "Dashboard";

});

jQuery('#rbApprovalCMD').change(function () {

    jQuery("#TxtrentPeriod").val('');
    jQuery("#TxtEnhancePrd").val('');
    jQuery("#TxtAgrmtDt").val('');
    jQuery("#TxtEffDate").val('');
    jQuery("#TxtAggEndDate").val('');
    jQuery("#TxtNxtEnhancement").val('');
    jQuery("#TxtInagurationDt").val('');
    jQuery("#TxtCompletionDt").val('');
    jQuery("#TxtEffectiveDtIfAny").val('');
    jQuery("#TxtAggEndDate2").val('');
    jQuery("#TxtNxtEnhancement2").val('');

    _Agreement_approval.GetAgreementCMD();

});

jQuery('#rbApprovalList').change(function () {

    jQuery("#TxtrentPeriod").val('');
    jQuery("#TxtEnhancePrd").val('');
    jQuery("#TxtAgrmtDt").val('');
    jQuery("#TxtEffDate").val('');
    jQuery("#TxtAggEndDate").val('');
    jQuery("#TxtNxtEnhancement").val('');
    jQuery("#TxtInagurationDt").val('');
    jQuery("#TxtCompletionDt").val('');
    jQuery("#TxtEffectiveDtIfAny").val('');
    jQuery("#TxtAggEndDate2").val('');
    jQuery("#TxtNxtEnhancement2").val('');

    _Agreement_approval.GetAgreement();

});

jQuery('#ddlAgreementh').change(function () {

    _Agreement_approval.GetAgreementDetails();

});

jQuery('#BtnConfirm').click(function () {

    //    jQuery('.page-loader-wrapper').hide();

    var Agreement = jQuery("#ddlAgreementh").val();
    var EffectiveDt = jQuery("#TxtEffectiveDtIfAny").val();
    var AgreementEndDt = jQuery("#TxtAggEndDate2").val();
    var NxtEnhancementDt = jQuery("#TxtNxtEnhancement2").val();

    if (Agreement == 0) {
        swal("Please Select Agreement !!!....", "", "warning");
        return false;

    }

    var res = Agreement.split('~');
    var branch_id = res[0];
    var flat_no = res[1];

    _Agreement_approval.ConfirmAgreement(branch_id, flat_no, EffectiveDt, AgreementEndDt, NxtEnhancementDt);

});






function DateFormating(dateStr) {
    if (!dateStr) return "";

    // 1. Split the string (supports both dd-mon-yyyy and dd/mon/yyyy)
    var parts = dateStr.split(/[-/ ]/);
    if (parts.length < 3) return dateStr;

    var day = parts[0].padStart(2, '0');
    var mon = parts[1].toLowerCase(); // Convert to lowercase for consistent lookup
    var year = parts[2];

    // 2. Define the month mapping
    var monthMap = {
        jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
        jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12"
    };

    // 3. Get the numeric month (default to '01' if the name isn't found)
    var mm = monthMap[mon] || "01";

    // 4. Return formatted string
    return day + '/' + mm + '/' + year;
}

function parseDate(str) {
    var parts = str.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}




