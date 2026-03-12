
jQuery(document).ready(function ($) {

    _Rent_verification.tokenValidate();

});

var _Rent_verification = {

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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", CheckAccess, _Rent_verification.checkAccessRtn, token)
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _Rent_verification.checkAccessToken, userdata.token)
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


                _Rent_verification.GetCustomer();


            }


        }

    },


    GetCustomer: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "NEFT_VERIFICATION",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Rent_verification.FillCustomer, userdata.token)
    },

    FillCustomer: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlCustomer").empty();

                jQuery("#ddlCustomer").append(jQuery("<option></option>").val("0").text("--Select--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlCustomer").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlCustomer").empty();
                jQuery("#ddlCustomer").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlCustomer").empty();
            jQuery("#ddlCustomer").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    LoadCustomerDetails: function () {

        jQuery('.page-loader-wrapper').show();
        jQuery('#confirmbutton').hide();
        // Hide the card while loading new data to prevent flickering
        jQuery('#maincard').hide();
        jQuery('#edit_div').hide();

        var Cust_id = jQuery("#ddlCustomer").val();

        var GetRentDetails = {
            flag: "NEFT_VERIFICATION",
            pagVal: "2",
            parVal: Cust_id,
            typeID: "4",
            userID: userdata.userId,
            branchID: userdata.branchId
        };

        try {
            GetRentDetails = JSON.stringify(GetRentDetails);
        } catch (e) {
            swal("Error", "JSON Formatting Error: " + e.message, "warning");
            jQuery('.page-loader-wrapper').hide();
            return false;
        }


        /*var encryptedData = { "encryptedRqstStr": EncryptAPIReq(GetRentDetails) };*/

        GetRentDetails = { "encryptedRqstStr": EncryptAPIReq(GetRentDetails) };


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Rent_verification.TableLoadCustomerDetails, userdata.token)


    },



    TableLoadCustomerDetails: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response && response.status === "SUCCESS") {
            jQuery('#maincard').show();
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            if (response.data && response.data.queryResult.QueryResult.length > 0) {
                jQuery('#divagreementdetailstable').empty();

                var $table = jQuery('<table class="table" id="tblapproval">');
                $table.append
                    ('<thead><tr> <th style="text-align:center;">CUSTOMER NAME</th><th style="text-align:center;">BENEFICIARY ACCOUNT</th><th style="text-align:center;">ACCOUNT NAME</th><th style="text-align:center;">STATE</th><th style="text-align:center;">DISTRICT</th><th style="text-align:center;">BRANCH</th><th style="text-align:center;">IFSC CODE</th><th style="text-align:center;">MOBILE NUMBER</th><th style="text-align:center;">BANK NAME</th></thead>')
                var $tbody = jQuery('<tbody>');
                var $container = jQuery('#divagreementdetailstable');
                $container.empty();

                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                    var M = response.data.queryResult.QueryResult[i].Param1;

                    var datas = M.split('^');

                    for (var j = 0; j < datas.length; j++) {
                        if (!datas[j] || datas[j] === '') {
                            datas[j] = '0';
                        }
                    }
                    var leaseID = datas[0];
                    var $row = jQuery('<tr/>');
                    $row.append(jQuery('<td align="center">').html(datas[0]));
                    $row.append(jQuery('<td align="center">').html(datas[1]));
                    $row.append(jQuery('<td align="center">').html(datas[2]));
                    $row.append(jQuery('<td align="center">').html(datas[3]));
                    $row.append(jQuery('<td align="center">').html(datas[4]));
                    $row.append(jQuery('<td align="center">').html(datas[5]));
                    $row.append(jQuery('<td align="center">').html(datas[6]));
                    $row.append(jQuery('<td align="center">').html(datas[7]));
                    $row.append(jQuery('<td align="center">').html(datas[8]));



                    $tbody.append($row);
                    jQuery('#TxtState').val(datas[3]);
                    jQuery('#TxtDistrict').val(datas[4]);
                    jQuery('#TxtBank').val(datas[8]);
                    jQuery('#TxtBranch').val(datas[5]);
                    jQuery('#TxtIFSC').val(datas[6]);
                    jQuery('#TxtAccount').val(datas[2]);
                    jQuery('#TxtAccountNumber').val(datas[1]);
                    jQuery('#TxtMobile').val(datas[7]);
                    jQuery('#TxtAccountHolder').val(datas[0]);



                });



                $table.append($tbody);
                $container.append($table);

                jQuery('#confirmbutton').show();
            } else {
                jQuery('#divagreementdetailstable').empty();
                _General.noData(jQuery('#divagreementdetailstable'), "No Data Found");
            }
        }
        else if (response && response.status === "AUTHERROR") {
            window.location.href = DOMAIN_URL + "?Id=1";
        }
        else {
            jQuery('#divagreementdetailstable').empty();
            _General.noData(jQuery('#divagreementdetailstable'), "API Error or No Response");
        }
    },



    ConfirmCustomer: function (cust_id, cust_name, account_number, mobile_number) {




        jQuery('.page-loader-wrapper').show();

        var confrim = {

            flag: "NEFT_VERIFICATION",
            pagVal: "Rent_neft_verification",
            ////    1               2                    3                    4                     5                6                 
            parVal: cust_id + 'µ' + cust_name + 'µ' + account_number + 'µ' + mobile_number + 'µ' + 34 + 'µ' + userdata.userId,
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", confrim, _Rent_verification.ConfirmResponse, userdata.token)
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

    RejectCustomer: function (cust_id) {




        jQuery('.page-loader-wrapper').show();

        var confrim = {

            flag: "NEFT_VERIFICATION",
            pagVal: "Reject_customer",
            parVal: cust_id,
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", confrim, _Rent_verification.RejectResponse, userdata.token)
    },

    RejectResponse: function (response) {

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


//jQuery('#ddlCustomer').change(function () {

//    _Rent_verification.LoadCustomerDetails();

//});



jQuery('#view_customer').click(function () {


    jQuery('#TxtState').val('');
    jQuery('#TxtDistrict').val('');
    jQuery('#TxtBank').val('');
    jQuery('#TxtBranch').val('');
    jQuery('#TxtIFSC').val('');
    jQuery('#TxtAccount').val('');
    jQuery('#TxtAccountNumber').val('');
    jQuery('#TxtMobile').val('');
    jQuery('#TxtAccountHolder').val('');

    _Rent_verification.LoadCustomerDetails();

});

jQuery('#BtnEdit').click(function () {

    //jQuery('#edit_div').show();

    jQuery('#edit_div').slideToggle('slow');
});


jQuery('#btn_exit').click(function () {

    window.location = "Dashboard";

});

jQuery('#BtnApprove').click(function () {


    var cust_id = jQuery('#ddlCustomer').val();
    var cust_name = jQuery('#TxtAccountHolder').val();
    var account_number = jQuery('#TxtAccountNumber').val();
    var mobile_number = jQuery('#TxtMobile').val();


    _Rent_verification.ConfirmCustomer(cust_id, cust_name, account_number, mobile_number);

});


jQuery('#btnReject').click(function () {


    var cust_id = jQuery('#ddlCustomer').val();


    _Rent_verification.RejectCustomer(cust_id);

});
