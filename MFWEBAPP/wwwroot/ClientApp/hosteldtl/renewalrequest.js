

var _Renewal_Request = {

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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", CheckAccess, _Renewal_Request.checkAccessRtn, token)
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _Renewal_Request.checkAccessToken, userdata.token)
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

                _Renewal_Request.GetHostel();

            }


        }

    },


    GetHostel: function () {


        //jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "Hostel_Renew_Agr_Request",
            pagVal: "getHostel",
            parVal: userdata.userId,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _Renewal_Request.FillHostel, userdata.token)
    },

    FillHostel: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                //jQuery('.page-loader-wrapper').hide();


                jQuery("#hostelname").empty();

                jQuery("#hostelname").append(jQuery("<option></option>").val("0").text("--Select Hostel--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#hostelname").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#hostelname").empty();
                jQuery("#hostelname").append(jQuery("<option></option>").val("0").text("--Select Hostel --"));
            }
            // jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#hostelname").empty();
            jQuery("#hostelname").append(jQuery("<option></option>").val("0").text("--Select Hostel --"));
        }
        //jQuery('.page-loader-wrapper').hide();
    },

    GetCategory: function () {


        //jQuery('.page-loader-wrapper').show();
        var hostel_id = jQuery("#hostelname").val();

        var GetRentDetails =
        {
            flag: "Hostel_Renew_Agr_Request",
            pagVal: "getCategory",
            parVal: hostel_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _Renewal_Request.FillCategory, userdata.token)
    },

    FillCategory: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                //jQuery('.page-loader-wrapper').hide();


                jQuery("#categoryname").empty();

                //jQuery("#categoryname").append(jQuery("<option></option>").val("0").text("--Select Category--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#categoryname").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#categoryname").empty();
                jQuery("#categoryname").append(jQuery("<option></option>").val("0").text("--Select Category --"));
            }
            // jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#categoryname").empty();
            jQuery("#categoryname").append(jQuery("<option></option>").val("0").text("--Select Category --"));
        }
        //jQuery('.page-loader-wrapper').hide();
    },

    GetDateDtl: function () {

        jQuery('.page-loader-wrapper').show();




        var hostel_id = jQuery("#hostelname").val();


        var GetRentDetails =
        {
            flag: "Hostel_Renew_Agr_Request",
            pagVal: "GetDate",
            parVal: hostel_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _Renewal_Request.FillDateDtl, userdata.token)
    },




    FillDateDtl: function (response) {

        if (response.status === "SUCCESS") {


            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                var res = response.data.queryResult.QueryResult[0].Param1;
                var res1 = response.data.queryResult.QueryResult[0].Param2;

                jQuery("#agreementfrom").val(res);
                jQuery("#agreementto").val(res1);

            }


            jQuery('.page-loader-wrapper').hide();
        }

        jQuery('.page-loader-wrapper').hide();
    },

    ConfirmRenewalReq: function (HostelName, Incrementpercnt, AgreementToDate) {


        var input = HostelName + 'µ' + userdata.userId + 'µ' + Incrementpercnt + 'µ' + AgreementToDate;


        var confrim = {

            flag: "Hostel_Renew_Agr_Request",
            pagVal: "Renewal_req_confirm",
            parVal: input,
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", confrim, _Renewal_Request.SubmitResponse, userdata.token)

    },


    SubmitResponse: function (response) {

        jQuery('.page-loader-wrapper').hide();

        // var str = response.data.queryResult[0].param1;
        response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));



        if (response.status == "SUCCESS") {

            var res = response.data.queryResult.QueryResult[0].Param1;

            var res2 = response.data.queryResult.QueryResult[0].Param2;

            // SubmitResponse(res, res2);
            if (res2 == 1) {
                swal({
                    title: "Success",
                    text: res || "Renewal Requested Successfully",
                    type: "success",
                    showConfirmButton: true
                }, function () {
                    // This is the callback for SweetAlert v1
                    window.location.reload(true);
                });
            }
            else if (res2 == 0) {
                swal({
                    title: "Already Added",
                    text: "This record already exists.",
                    type: "warning",
                    showConfirmButton: true
                }, function () {
                    window.location.reload(true);
                });
            }

        }

        else {
            swal("Error", "Error", "error");
        }

    },

    //ConfirmRenewalReq: function (HostelName, Incrementpercnt, AgreementToDate) {

    //                  1                    2                       3                          4            
    //    var input = HostelName + 'µ' + userdata.userId + 'µ' + Incrementpercnt + 'µ' + AgreementToDate;


    //    var confrim = {

    //        flag: "Hostel_opening",
    //        pagVal: "Hostel_Renew_Agr_Request",
    //        parVal: "Renewal_req_confirm" + '~' + input,
    //        typeID: "4",
    //        userID: userdata.userId,
    //        branchID: userdata.branchId

    //    };

    //    try {
    //        confrim = JSON.stringify(confrim);
    //    } catch (e) {
    //        swal("", e.message, "warning");
    //        return false;
    //    }
    //    confrim = { "encryptedRqstStr": EncryptAPIReq(confrim) };

    //    _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", confrim, _Renewal_Request.RenewalReqResponse, userdata.token)

    //},


    //RenewalReqResponse: function (response) {

    //    jQuery('.page-loader-wrapper').hide();

    //    // var str = response.data.queryResult[0].param1;
    //    response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));



    //    if (response.status == "SUCCESS") {

    //        var res = response.data.queryResult.QueryResult[0].Param1;


    //        swal({
    //            title: "success",
    //            text: res,
    //            type: "success"
    //        },



    //            function () {
    //                window.location.reload(true);
    //            });



    //    }

    //    else {
    //        swal("Error", "Error", "error");
    //    }

    //},

}





jQuery(document).ready(function ($) {

    _Renewal_Request.tokenValidate();

});
jQuery('#hostelname').change(function () {

    _Renewal_Request.GetCategory();
    _Renewal_Request.GetDateDtl();


});


//jQuery('#categoryname').change(function () {

//    _Renewal_Request.GetDateDtl();


//});

jQuery('#bs_datepicker_container6 input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showbuttonPanel: true,
    changeMonth: true,
    container: '#bs_datepicker_container6'
});



jQuery('#BtnConfirm').click(function () {

    var HostelName = jQuery("#hostelname").val();
    var Incrementpercnt = jQuery('#incrpercnt').val();
    var AgreementToDate = jQuery("#agreementtodt").val();



    if (HostelName == '0') {
        swal("Please select Hostel Name !!!....", "", "warning");
        return false;

    }
    else if (Incrementpercnt == '') {
        swal("Please Enter Increment Percentage!!!....", "", "warning");
        return false;

    }
    else if (AgreementToDate == '') {
        swal("Please Select Agreement To Date!!!....", "", "warning");
        return false;

    }


    _Renewal_Request.ConfirmRenewalReq(HostelName, Incrementpercnt, AgreementToDate);

});