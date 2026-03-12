

jQuery(document).ready(function ($) {

    _Add_Agreement.tokenValidate();

    const mandatoryIds = ['TxtPercentIncrese', 'TxtDtIntitail'];

    mandatoryIds.forEach(id => {

        const input = document.getElementById(id);

        if (input) {

            // Find the label associated with this input

            const label = input.parentElement.querySelector('label');


            if (label && !label.innerHTML.includes('*')) {

                // Append the red asterisk HTML

                label.innerHTML += ' <b style="color:red">*</b>';

            }

        }

    });

});

//jQuery('#radio_doc_no').click(function ()
//{
//    //alert("sdfgh");
//}

//$('#radio_doc_no, #radio_cust_id, #radio_both, #radio_add_new').on('click', function () {

//    // Use 'this.id' to identify which specific button was clicked
//    var clickedId = this.id;

//    alert(clickedId);
//    // Execute the function
//});




jQuery('#bs_datepicker_container5 input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showButtonPanel: true,
    changeMonth: true,
    container: '#bs_datepicker_container5'
}).datepicker("setDate", new Date());

jQuery('#bs_datepicker_container6 input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showButtonPanel: true,
    changeMonth: true,
    container: '#bs_datepicker_container6'
}).datepicker("setDate", new Date());

jQuery('#bs_datepicker_container7 input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showButtonPanel: true,
    changeMonth: true,
    container: '#bs_datepicker_container7'
}).datepicker("setDate", new Date());

jQuery('#bs_datepicker_container8 input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showButtonPanel: true,
    changeMonth: true,
    container: '#bs_datepicker_container8'
}).datepicker("setDate", new Date());


jQuery('#bs_datepicker_container9 input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showButtonPanel: true,
    changeMonth: true,
    container: '#bs_datepicker_container9',
    orientation: "top auto"
})


var _Add_Agreement = {

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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", CheckAccess, _Add_Agreement.checkAccessRtn, token)
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _Add_Agreement.checkAccessToken, userdata.token)
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


                _Add_Agreement.GetCatogery();
                //  _Add_Agreement.GetBranch();
                _Add_Agreement.GetFloor();



            }


        }

    },



    GetCatogery: function () {



        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADD_AGREEMENT",
            pagVal: "categoryload",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Add_Agreement.FillCategory, userdata.token)
    },

    FillCategory: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlCategory").empty();

                jQuery("#ddlCategory").append(jQuery("<option></option>").val("0").text("--Select Category--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlCategory").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlCategory").empty();
                jQuery("#ddlCategory").append(jQuery("<option></option>").val("0").text("--Select Category--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlCategory").empty();
            jQuery("#ddlCategory").append(jQuery("<option></option>").val("0").text("--Select Category--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    GetBranch: function () {



        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADD_AGREEMENT",
            pagVal: "branchload",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Add_Agreement.FillBranch, userdata.token)
    },

    FillBranch: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlbranch").empty();

                jQuery("#ddlbranch").append(jQuery("<option></option>").val("0").text("--Select Branch--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlbranch").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlbranch").empty();
                jQuery("#ddlbranch").append(jQuery("<option></option>").val("0").text("--Select Branch--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlbranch").empty();
            jQuery("#ddlbranch").append(jQuery("<option></option>").val("0").text("--Select Branch--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    GetBranchOnCatogery: function () {



        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADD_AGREEMENT",
            pagVal: "NearestBranchLoad",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Add_Agreement.FillBranch, userdata.token)
    },

    GetFloor: function () {



        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADD_AGREEMENT",
            pagVal: "floorload",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Add_Agreement.FillFloor, userdata.token)
    },

    FillFloor: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlFloor").empty();

                jQuery("#ddlFloor").append(jQuery("<option></option>").val("0").text("--Select Floor--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFloor").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlFloor").empty();
                jQuery("#ddlFloor").append(jQuery("<option></option>").val("0").text("--Select Floor--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlFloor").empty();
            jQuery("#ddlFloor").append(jQuery("<option></option>").val("0").text("--Select Floor--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },



    GetEmployee: function () {

        // jQuery('.page-loader-wrapper').show();

        var emp_code = jQuery("#TxtempCode").val();

        jQuery("#Txtename").val('');




        var GetRentDetails =
        {
            flag: "ADD_AGREEMENT",
            pagVal: "empnameload",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Add_Agreement.FillEmpName, userdata.token)
    },




    FillEmpName: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                var res = response.data.queryResult.QueryResult[0].Param1;

                jQuery("#Txtename").val(res);

            }
            // jQuery('.page-loader-wrapper').hide();
        }

        //jQuery('.page-loader-wrapper').hide();
    },



}


jQuery('#radio_emp').change(function () {

    jQuery("#br_name").hide();
    jQuery("#div_null1").hide();
    jQuery("#div_null2").hide();
    jQuery("#brokerage").hide();
    jQuery("#brokerage1").show();
    jQuery("#div_customer").hide();
    jQuery("#emp_name_fetch_div").show();


});

//jQuery('#radio_broker').change(function () {

//    jQuery("#br_name").show();
//    jQuery("#div_null1").show();
//    jQuery("#div_null2").show();
//    jQuery("#brokerage").show();
//    jQuery("#brokerage1").hide();
//    jQuery("#div_customer").show();
//    jQuery("#emp_name_fetch_div").hide();


//});

//jQuery('#radio_both').change(function () {

//    jQuery("#br_name").show();
//    jQuery("#div_null1").show();
//    jQuery("#div_null2").show();
//    jQuery("#brokerage").show();
//    jQuery("#brokerage1").show();
//    jQuery("#div_customer").show();
//    jQuery("#emp_name_fetch_div").show();


//});


jQuery('#TxtempCode').change(function () {
    var code = jQuery('#TxtempCode').val();

    // Only alert if they actually typed something but it's less than 6
    if (code.length > 0 && code.length < 6) {
        alert("Employee Code must be exactly 6 digits.");
        jQuery('#TxtempCode').focus(); // Bring cursor back to fix it
    }
    else {
        _Add_Agreement.GetEmployee();
    }

});



jQuery('#TxtFlat').on('keyup', function () {


    // 1. Get the current cursor position (so it doesn't jump to the end)
    var selectionStart = this.selectionStart;
    var selectionEnd = this.selectionEnd;

    // 2. Convert to uppercase
    var upperVal = jQuery(this).val().toUpperCase();
    jQuery(this).val(upperVal);

    // 3. Reset the cursor position
    this.setSelectionRange(selectionStart, selectionEnd);
});

jQuery('#TxtbrokerName').on('keyup', function () {


    // 1. Get the current cursor position (so it doesn't jump to the end)
    var selectionStart = this.selectionStart;
    var selectionEnd = this.selectionEnd;

    // 2. Convert to uppercase
    var upperVal = jQuery(this).val().toUpperCase();
    jQuery(this).val(upperVal);

    // 3. Reset the cursor position
    this.setSelectionRange(selectionStart, selectionEnd);
});


//jQuery('#TxtEffectiveDt').change(function () {


//    var effectiveStr = jQuery('#TxtEffectiveDt').val();
//    var agreementStr = jQuery('#TxtAgrimentdt').val();


//    if (effectiveStr && agreementStr) {

//        // Convert strings to Date Objects for accurate comparison
//        var effectiveDate = parseDate(effectiveStr);
//        var agreementDate = parseDate(agreementStr);

//        if (effectiveDate < agreementDate) {
//            alert("Effective Date must be after Agreement Date!");

//            jQuery('#TxtEffectiveDt').datepicker("setDate", new Date());
//            return;
//        }
//        else
//        {
//            jQuery('#TxtnextRenewDt').val(effectiveStr);
//            jQuery('#TxtAgrimentEndDt').val(effectiveStr);

//        }
//    }

//});

// Helper function to parse "DD/MM/YYYY" strings
function parseDate(str) {
    var parts = str.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

jQuery('#btn_exit').click(function () {

    window.location = "Dashboard";

});


jQuery('#ddlCategory').change(function () {


    var cat_id = jQuery('#ddlCategory').val();

    if (cat_id == 1) {
        jQuery('#branch_id').show();
        jQuery('#near_branch_id').hide();
        jQuery("#ddlbranch").empty();
        jQuery("#flat_div").hide();
        jQuery("#Capacity_div").hide();
        jQuery("#emp_name_fetch_div").hide();
        jQuery("#brokerage1").hide();
        jQuery("#div_customer").hide();
        jQuery("#br_name").hide();
        jQuery("#brokerage").hide();
        jQuery("#strong_room_div").show();
        jQuery("#sqrFeet_div").show();




        _Add_Agreement.GetBranch();

        jQuery('#TxtFlat').val('');
        jQuery('#TxtCapacity').val('');
        jQuery("#verify_yes").prop('checked', false);
        jQuery("#verify_no").prop('checked', false);
        jQuery('#TxtSqrfeet').val('');
        jQuery("#radio_emp").prop('checked', false);
        jQuery("#emp_name_fetch_div").hide();
        jQuery('#Txtbrokerage').val('');
        jQuery('#TxtempCode').val('');
        jQuery('#Txtename').val('');
        jQuery('#ddlFloor').val(0);
        jQuery('#TxttotalMonthlyRent').val('');
        jQuery('#TxtSequrityDeposit').val('');
        jQuery('#TxtRentPeriod').val('');
        jQuery('#TxtEnhancedPeriod').val('');
        jQuery('#bs_datepicker_container5 input').datepicker("setDate", new Date());
        jQuery('#bs_datepicker_container6 input').datepicker("setDate", new Date());
        jQuery('#bs_datepicker_container7 input').datepicker("setDate", new Date());
        jQuery('#bs_datepicker_container8 input').datepicker("setDate", new Date());
        jQuery('#TxtNoRenewal').val('');
        jQuery('#TxtPrdBlock').val('');
        jQuery('#TxtPercentIncrese').val('');

        jQuery('#TxtDtIntitail').val('');
        // $('#chkAgreement').prop('checked', false).removeAttr('checked');
    }
    else {
        jQuery('#branch_id').hide();
        jQuery('#near_branch_id').show();
        jQuery("#ddlbranch").empty();
        jQuery("#flat_div").show();
        jQuery("#Capacity_div").show();
        jQuery("#emp_name_fetch_div").hide();
        jQuery("#brokerage1").hide();
        jQuery("#div_customer").hide();
        jQuery("#br_name").hide();
        jQuery("#brokerage").hide();
        jQuery("#strong_room_div").hide();
        jQuery("#sqrFeet_div").hide();




        _Add_Agreement.GetBranchOnCatogery();

        jQuery('#TxtFlat').val('');
        jQuery('#TxtCapacity').val('');
        jQuery("#verify_yes").prop('checked', false);
        jQuery("#verify_no").prop('checked', false);
        jQuery('#TxtSqrfeet').val('');
        jQuery("#radio_emp").prop('checked', false);
        jQuery("#emp_name_fetch_div").hide();
        jQuery('#Txtbrokerage').val('');
        jQuery('#TxtempCode').val('');
        jQuery('#Txtename').val('');
        jQuery('#ddlFloor').val(0);
        jQuery('#TxttotalMonthlyRent').val('');
        jQuery('#TxtSequrityDeposit').val('');
        jQuery('#TxtRentPeriod').val('');
        jQuery('#TxtEnhancedPeriod').val('');
        jQuery('#bs_datepicker_container5 input').datepicker("setDate", new Date());
        jQuery('#bs_datepicker_container6 input').datepicker("setDate", new Date());
        jQuery('#bs_datepicker_container7 input').datepicker("setDate", new Date());
        jQuery('#bs_datepicker_container8 input').datepicker("setDate", new Date());
        jQuery('#TxtNoRenewal').val('');
        jQuery('#TxtPrdBlock').val('');
        jQuery('#TxtPercentIncrese').val('');

        jQuery('#TxtDtIntitail').val('');
        // $('#chkAgreement').prop('checked', false).removeAttr('checked');
    }

});


jQuery('#TxtAgrimentdt, #TxtEffectiveDt').change(function () {
    var effectiveStr = jQuery('#TxtEffectiveDt').val();
    var agreementStr = jQuery('#TxtAgrimentdt').val();
    var enhancementMonths = parseInt(jQuery('#TxtEnhancedPeriod').val()) || 0;

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
        jQuery('#TxtAgrimentEndDt').datepicker('setDate', futureDate);
        jQuery('#TxtnextRenewDt').datepicker('setDate', futureDate);
    }
});


//jQuery('#ddlbranch').change(function ()
//{

//    $('input[name="StrongRoom"]').prop('checked', false).removeAttr('checked');
//    //$('input[name="StrongRoom"]').prop('checked', false);

//    //$('#verify_yes').prop('checked', false);

//    //$('#verify_no').prop('checked', false);
//});



jQuery('#ddlbranch').change(function () {
    // Uncheck the actual input

    jQuery('#TxtFlat').val('');
    jQuery('#TxtCapacity').val('');
    jQuery("#verify_yes").prop('checked', false);
    jQuery("#verify_no").prop('checked', false);
    jQuery('#TxtSqrfeet').val('');
    jQuery("#radio_emp").prop('checked', false);
    jQuery("#emp_name_fetch_div").hide();
    jQuery('#Txtbrokerage').val('');
    jQuery('#TxtempCode').val('');
    jQuery('#Txtename').val('');
    jQuery('#ddlFloor').val(0);
    jQuery('#TxttotalMonthlyRent').val('');
    jQuery('#TxtSequrityDeposit').val('');
    jQuery('#TxtRentPeriod').val('');
    jQuery('#TxtEnhancedPeriod').val('');
    jQuery('#bs_datepicker_container5 input').datepicker("setDate", new Date());
    jQuery('#bs_datepicker_container6 input').datepicker("setDate", new Date());
    jQuery('#bs_datepicker_container7 input').datepicker("setDate", new Date());
    jQuery('#bs_datepicker_container8 input').datepicker("setDate", new Date());
    jQuery('#TxtNoRenewal').val('');
    jQuery('#TxtPrdBlock').val('');
    jQuery('#TxtPercentIncrese').val('');

    jQuery('#TxtDtIntitail').val('');
    // $('#chkAgreement').prop('checked', false).removeAttr('checked');
});


jQuery('#BtnConfirm').click(function () {


    var category = jQuery('#ddlCategory').val();
    var barnch = jQuery('#ddlbranch').val();
    var flat = jQuery('#TxtFlat').val();
    var capacity = jQuery('#TxtCapacity').val();
    var emp_code = jQuery('#TxtempCode').val();
    var brokerage = jQuery('#Txtbrokerage').val();
    var floor = jQuery('#ddlFloor').val();
    var total_rent = jQuery('#TxttotalMonthlyRent').val();
    var security_deposit = jQuery('#TxtSequrityDeposit').val();
    var rent_period = jQuery('#TxtRentPeriod').val();
    var enhancement_prd = jQuery('#TxtEnhancedPeriod').val();
    var agreement_dt = jQuery('#TxtAgrimentdt').val();
    var effective_dt = jQuery('#TxtEffectiveDt').val();
    var agreement_end_dt = jQuery("#TxtAgrimentEndDt").val();
    var nxt_renew_dt = jQuery("#TxtnextRenewDt").val();
    var renwwal_option = jQuery('#TxtNoRenewal').val();
    var prd_block = jQuery('#TxtPrdBlock').val();
    var percentage_increase = jQuery('#TxtPercentIncrese').val();
    var initailAgreeDate = jQuery('#TxtDtIntitail').val();

    var categoryname = jQuery("#ddlCategory option:selected").text().trim();
    var branchname = jQuery("#ddlbranch option:selected").text().trim();


    if (jQuery("#verify_yes").prop("checked") == true) {
        var strong_room = jQuery("#verify_yes").val();

    }


    else if (jQuery("#verify_no").prop("checked") == true) {
        var strong_room = jQuery("#verify_no").val();
    }
    else {
        var strong_room = 0;
    }

    var sqrFeet = jQuery('#TxtSqrfeet').val();

    if (jQuery("#radio_emp").prop("checked") == true) {
        var site_identifier = jQuery("#radio_emp").val();

    }
    else {
        var site_identifier = 0;
    }
    //console.log("Selected Value:", site_identifier);





    if (category == 0) {
        swal("Please Select Category !!!....", "", "warning");
        return false;
    }
    if (barnch == 0) {
        swal("Please Select Branch !!!....", "", "warning");
        return false;
    }

    if (category == 1) {
        if (strong_room == 0) {
            swal("Please select whether a Strong Room is available. !!!....", "", "warning");
            return false;

        }
        else if (sqrFeet == '') {
            swal("Please Enter Square Feet !!!....", "", "warning");
            return false;

        }

    }

    if (category != 1) {
        if (flat == '') {
            swal("Please Enter Flat Name !!!....", "", "warning");
            return false;

        }
        else if (capacity == '') {
            swal("Please Enter Capacity !!!....", "", "warning");
            return false;

        }

    }

    if (site_identifier == 0) {
        swal("Please  Select Site Identifier !!!....", "", "warning");
        return false;
    }


    if (emp_code == '') {
        swal("Please Enter Employee Code !!!....", "", "warning");
        return false;
    }

    if (brokerage == '') {
        swal("Please Enter Brokerage !!!....", "", "warning");
        return false;
    }

    if (floor == 0) {
        swal("Please Select Floor !!!....", "", "warning");
        return false;
    }

    if (total_rent == '') {
        swal("Please Enter Total Monthly Rent !!!....", "", "warning");
        return false;
    }

    if (security_deposit == '') {
        swal("Please Enter Security Deposite !!!....", "", "warning");
        return false;
    }

    if (rent_period == '') {
        swal("Please Enter Rent Period !!!....", "", "warning");
        return false;
    }

    if (enhancement_prd == '') {
        swal("Please Enter Enhancement Period !!!....", "", "warning");
        return false;
    }

    if (agreement_dt == '') {
        swal("Please Select Agreement Date !!!....", "", "warning");
        return false;
    }

    if (effective_dt == '') {
        swal("Please Select Effective Date !!!....", "", "warning");
        return false;
    }

    if (agreement_end_dt == '') {
        swal("Please Select Agreement End Date !!!....", "", "warning");
        return false;
    }

    if (nxt_renew_dt == '') {
        swal("Please Select Next Renew Date !!!....", "", "warning");
        return false;
    }

    if (renwwal_option == '') {
        swal("Please Enter No Of Options Available For Renewal !!!....", "", "warning");
        return false;
    }

    if (prd_block == '') {
        swal("Please Enter Period Of Each Block !!!....", "", "warning");
        return false;
    }

    if (percentage_increase == '') {
        swal("Please Enter Percentage Of Increase In Each Block !!!....", "", "warning");
        return false;
    }

    if (initailAgreeDate == '') {
        swal("Please Enter Date Of Initial Agreement !!!....", "", "warning");
        return false;
    }

    // ... after your last validation check for initailAgreeDate

    // Use the callback function (the second argument of swal)
    swal({
        title: "Are you sure?",
        text: "Do you want to confirm these details?",
        type: "warning", // Version 1.x uses 'type' instead of 'icon'
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, confirm!",
        cancelButtonText: "No, cancel",
        closeOnConfirm: false
    },
        function (isConfirm) { // This is the callback
            if (isConfirm) {
                // 1. Save to Session Storage
                sessionStorage.setItem("categoryname", categoryname);
                sessionStorage.setItem("branchname", branchname);

                if (category == 1) {
                    sessionStorage.setItem("flat", branchname);
                } else {
                    sessionStorage.setItem("flat", flat);
                }

                sessionStorage.setItem("barnch", barnch);
                sessionStorage.setItem("category", category);
                sessionStorage.setItem("capacity", capacity);
                sessionStorage.setItem("security_deposit", security_deposit);
                sessionStorage.setItem("brokerage", brokerage);
                sessionStorage.setItem("total_rent", total_rent);
                sessionStorage.setItem("sqrFeet", sqrFeet);
                sessionStorage.setItem("floor", floor);
                sessionStorage.setItem("strong_room", strong_room);
                sessionStorage.setItem("rent_period", rent_period);
                sessionStorage.setItem("effective_dt", effective_dt);
                sessionStorage.setItem("enhancement_prd", enhancement_prd);
                sessionStorage.setItem("site_identifier", site_identifier);
                sessionStorage.setItem("emp_code", emp_code);
                sessionStorage.setItem("prd_block", prd_block);
                sessionStorage.setItem("percentage_increase", percentage_increase);
                sessionStorage.setItem("initailAgreeDate", initailAgreeDate);
                sessionStorage.setItem("renwwal_option", renwwal_option);


                // 2. Redirect to the page
                window.location.href = "/New_Agreement_Detail";
            }
        });

}); 