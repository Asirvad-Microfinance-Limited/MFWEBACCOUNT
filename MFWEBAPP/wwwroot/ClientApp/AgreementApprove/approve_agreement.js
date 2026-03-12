

var _Approve_agreement = {

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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", CheckAccess, _Approve_agreement.checkAccessRtn, token)
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _Approve_agreement.checkAccessToken, userdata.token)
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


                _Approve_agreement.GetAgreement();


            }


        }

    },

    GetAgreement: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "AGREEMENT_APPROVAL",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Approve_agreement.FillAgreement, userdata.token)
    },

    FillAgreement: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#agreementname").empty();

                jQuery("#agreementname").append(jQuery("<option></option>").val("0").text("--SELECT AGREEMENT--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#agreementname").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#agreementname").empty();
                jQuery("#agreementname").append(jQuery("<option></option>").val("0").text("--SELECT AGREEMENT--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#agreementname").empty();
            jQuery("#agreementname").append(jQuery("<option></option>").val("0").text("--SELECT AGREEMENT--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetAgreementDetails: function () {

        jQuery('.page-loader-wrapper').show();


        var agreement_id = jQuery("#agreementname").val();
        var input = agreement_id.split('%');
        var branch_id = input[0];
        var category_id = input[1];
        var flat_id = input[2];


        var GetRentDetails =
        {
            flag: "AGREEMENT_APPROVAL",
            pagVal: "details_load",
            parVal: flat_id + 'µ' + category_id + 'µ' + branch_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Approve_agreement.FillAgreementDetails, userdata.token)
    },


    FillAgreementDetails: function (response) {

        if (response.status === "SUCCESS") {


            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                var res1 = response.data.queryResult.QueryResult[0].Param1;
                var res2 = response.data.queryResult.QueryResult[0].Param2;

                // var parts = res.split("~");

                jQuery("#rentperiod").val(res1);
                jQuery("#enhncprd").val(res2);

            }


            jQuery('.page-loader-wrapper').hide();
        }

        jQuery('.page-loader-wrapper').hide();
    },

    LoadApprvTable: function () {
        jQuery('.page-loader-wrapper').show();
        // Hide the card while loading new data to prevent flickering
        jQuery('#maincard').hide();

        var agreement_id = jQuery("#agreementname").val();
        if (!agreement_id) {
            jQuery('.page-loader-wrapper').hide();
            return false;
        }

        var input = agreement_id.split('%');
        var branch_id = input[0];
        var category_id = input[1];
        var flat_id = input[2];

        var GetRentDetails = {
            flag: "AGREEMENT_APPROVAL",
            pagVal: "table_load",
            parVal: flat_id + 'µ' + category_id + 'µ' + branch_id,
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

        var encryptedData = { "encryptedRqstStr": EncryptAPIReq(GetRentDetails) };

        _http.post(
            MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries",
            encryptedData,
            _Approve_agreement.TableLoadCompleted,
            userdata.token
        );
    },



    TableLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response && response.status === "SUCCESS") {
            jQuery('#maincard').show();
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            if (response.data && response.data.queryResult.QueryResult.length > 0) {
                jQuery('#divagreementdetailstable').empty();

                var $table = jQuery('<table class="table" id="tblapproval">');
                $table.append
                    ('<thead><tr> <th style="text-align:center;">OWNER</th><th style="text-align:center;">ADVANCE</th><th style="text-align:center;">RENT</th><th style="text-align:center;">WATER</th><th style="text-align:center;">MAINTENANCE</th><th style="text-align:center;">SERV TAX</th><th style="text-align:center;">TDS</th><th style="text-align:center;">POWER OF ATTORNEY</th></thead>')
                var $tbody = jQuery('<tbody>');
                var $container = jQuery('#divagreementdetailstable');
                $container.empty();

                var advance = 0;
                var totrent = 0;
                var totwater = 0;
                var totmaintenance = 0;
                var totservtax = 0;
                var tottds = 0;
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                    var M = response.data.queryResult.QueryResult[i].Param1;

                    var datas = M.split('$');

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



                    $tbody.append($row);
                    advance = parseFloat(advance) + parseFloat(datas[1]);
                    totrent = parseFloat(totrent) + parseFloat(datas[2]);
                    totwater = parseFloat(totwater) + parseFloat(datas[3]);
                    totmaintenance = parseFloat(totmaintenance) + parseFloat(datas[4]);
                    totservtax = parseFloat(totservtax) + parseFloat(datas[5]);
                    tottds = parseFloat(tottds) + parseFloat(datas[6]);


                });

                var $row = jQuery('<tr />');
                $row.append(jQuery('<th style="text-align:center;">').html("TOTAL"));
                $row.append(jQuery('<th style="text-align:center;">').html(parseFloat(advance)));
                $row.append(jQuery('<th style="text-align:center;">').html(parseFloat(totrent)));
                $row.append(jQuery('<th style="text-align:center;">').html(parseFloat(totwater)));
                $row.append(jQuery('<th style="text-align:center;">').html(parseFloat(totmaintenance)));
                $row.append(jQuery('<th style="text-align:center;">').html(parseFloat(totservtax)));
                $row.append(jQuery('<th style="text-align:center;">').html(parseFloat(tottds)));
                $row.append(jQuery('<th style="text-align:center;">').html(''));



                $tbody.append($row);

                $table.append($tbody);
                $container.append($table);

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

    ConfirmAgreementApprove: function (AgreementName) {


        jQuery('.page-loader-wrapper').show();

        var AgreementName1 = AgreementName.split('%');
        var branch_id = AgreementName1[0];
        var category_id = AgreementName1[1];
        var flat_id = AgreementName1[2];

        var confrim = {

            flag: "AGREEMENT_APPROVAL",
            pagVal: "agreementapprove_confirm",
            parVal: flat_id + 'µ' + category_id + 'µ' + branch_id,
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", confrim, _Approve_agreement.ConfirmAgreementApproveResponse, userdata.token)

    },

    ConfirmAgreementApproveResponse: function (response) {


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

    _Approve_agreement.tokenValidate();

});


jQuery('#btn_exit').click(function () {

    window.location = "Dashboard";

});

jQuery('#agreementname').change(function () {


    jQuery("#rentperiod").val('');
    jQuery("#enhncprd").val('');
    _Approve_agreement.LoadApprvTable();
    _Approve_agreement.GetAgreementDetails();


});

jQuery('#BtnConfirm').click(function () {

    var AgreementName = jQuery("#agreementname").val();

    if (AgreementName == '0') {
        swal("Please select Agreement Name !!!....", "", "warning");
        return false;

    }

    _Approve_agreement.ConfirmAgreementApprove(AgreementName);

});