jQuery(document).ready(function ($) {



    _RenewalRecommend.tokenValidate();

});
var _RenewalRecommend = {

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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", CheckAccess, _RenewalRecommend.checkAccessRtn, token)
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _RenewalRecommend.checkAccessToken, userdata.token)
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
            else

            {
                _RenewalRecommend.GetHostel();
            }


        }

    },


    GetHostel: function () {


        //jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "Hostel_Renew_Agr_Recom",
            pagVal: "loadHostelrec",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _RenewalRecommend.FillHostel, userdata.token)
    },

    FillHostel: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                //jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlHostel").empty();

                jQuery("#ddlHostel").append(jQuery("<option></option>").val("0").text("--Select Hostel--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlHostel").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlHostel").empty();
                jQuery("#ddlHostel").append(jQuery("<option></option>").val("0").text("--Select Hostel --"));
            }
            // jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlHostel").empty();
            jQuery("#ddlHostel").append(jQuery("<option></option>").val("0").text("--Select Hostel --"));
        }
        //jQuery('.page-loader-wrapper').hide();
    },



    LoadHostelDetails: function () {

        jQuery('.page-loader-wrapper').show();
       
        // Hide the card while loading new data to prevent flickering
        jQuery('#maincard').hide();
        

        var hostel_id = jQuery("#ddlHostel").val();

        var GetRentDetails = {
            flag: "Hostel_Renew_Agr_Recom",
            pagVal: "load_hst_dtl_rec",
            parVal: hostel_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _RenewalRecommend.TableLoadHostelDetails, userdata.token)


    },



    TableLoadHostelDetails: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response && response.status === "SUCCESS") {
            jQuery('#maincard').show();
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            if (response.data && response.data.queryResult.QueryResult.length > 0) {
                jQuery('#divagreementdetailstable').empty();

                var $table = jQuery('<table class="table" id="tblapproval">');
                $table.append
                    ('<thead><tr> <th style="text-align:center;">HOSTEL ID</th><th style="text-align:center;">HOSTEL NAME</th><th style="text-align:center;">AGREEMENT TO</th><th style="text-align:center;">NEW AMOUNT</th><th style="text-align:center;">OLD AMOUNT</th><th style="text-align:center;">INCREMENT PER</th></thead>')
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
                    


                    $tbody.append($row);
                   


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


    RecommendRenewal: function () {




        var hostel_id = jQuery("#ddlHostel").val();

        var confrim = {
            flag: "Hostel_Renew_Agr_Recom",
            pagVal: "RenewRecommend",
            parVal: hostel_id + 'µ' + userdata.userId,
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", confrim, _RenewalRecommend.ConfirmResponse, userdata.token)
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


    RejectRenewal: function () {




        var hostel_id = jQuery("#ddlHostel").val();

        var confrim = {
            flag: "Hostel_Renew_Agr_Recom",
            pagVal: "RenewRec_reject",
            parVal: hostel_id + 'µ' + userdata.userId,
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", confrim, _RenewalRecommend.RejectResponse, userdata.token)
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

jQuery('#view_areement').click(function () {

    _RenewalRecommend.LoadHostelDetails();
});

jQuery('#BtnApprove').click(function () {

    _RenewalRecommend.RecommendRenewal();
});

jQuery('#btnReject').click(function () {

    _RenewalRecommend.RejectRenewal();
});


jQuery('#btn_exit').click(function () {

    window.location = "Dashboard";

});
