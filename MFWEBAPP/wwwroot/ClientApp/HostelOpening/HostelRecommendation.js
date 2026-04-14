


jQuery(document).ready(function ($) {



    _RecommendHostel.tokenValidate();

});
var _RecommendHostel = {

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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", CheckAccess, _RecommendHostel.checkAccessRtn, token)
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _RecommendHostel.checkAccessToken, userdata.token)
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

               
                _RecommendHostel.GetHostels();
              
            }


        }

    },


    GetHostels: function () {
        

        //jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "AddNewHostalRec",
            pagVal: "LoadHstName",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _RecommendHostel.FillHostel, userdata.token)
    },

    FillHostel: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                //jQuery('.page-loader-wrapper').hide();


                jQuery("#DdlHostelName").empty();

                jQuery("#DdlHostelName").append(jQuery("<option></option>").val("0").text("--Select Hostel--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#DdlHostelName").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#DdlHostelName").empty();
                jQuery("#DdlHostelName").append(jQuery("<option></option>").val("0").text("--Select Branch --"));
            }
            // jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#DdlHostelName").empty();
            jQuery("#DdlHostelName").append(jQuery("<option></option>").val("0").text("--Select Branch --"));
        }
        //jQuery('.page-loader-wrapper').hide();
    },



    GetHostelDetails: function () {

        var hostel_id = jQuery("#DdlHostelName").val();
      
            jQuery('.page-loader-wrapper').show();


            var GetRentDetails =
            {
                flag: "AddNewHostalRec",
                pagVal: "getAlldtls",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _RecommendHostel.FillHostelDetails, userdata.token)
        
    },


    FillHostelDetails: function (response) {

        if (response.status === "SUCCESS") {


            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                var res = response.data.queryResult.QueryResult[0].Param1;


               
                var parts = res.split("^");

                
                jQuery("#txtHostelAddress").val(parts[0]);
                jQuery("#txtMobNo").val(parts[1]);
                jQuery("#txtRent").val(parts[2]);
                jQuery("#TxtAdvRent").val(parts[3]);
                jQuery("#TxtAgrimentdt").val(parts[4]);
                jQuery("#TxtSqrfeet").val(parts[5]);
                jQuery("#txtState").val(parts[6]);
                jQuery("#txtDistrict").val(parts[7]);
                jQuery("#txtArea").val(parts[8]);
                jQuery("#txtZonal").val(parts[9]);
                jQuery("#txtRegion").val(parts[10]);
                jQuery("#txtDivision").val(parts[11]);
                jQuery("#txtHostelType").val(parts[12]);
                jQuery("#txtOccupants").val(parts[13]);
                jQuery("#txtHalls").val(parts[14]);
                jQuery("#txtBedrooms").val(parts[15]);
                jQuery("#txtKitchens").val(parts[16]);
                jQuery("#txtbathrooms").val(parts[17]);
                jQuery("#TxtlocalBodyName").val(parts[18]); 
                jQuery("#txtFloor").val(parts[19]);
                jQuery("#txtbuilding").val(parts[20]);
                jQuery("#txtLocalBody").val(parts[21]);
                jQuery("#TxtPinCode").val(parts[22]);
                jQuery("#txtPost").val(parts[23]);
                jQuery("#TxtAgrimentEndDt").val(parts[24]);

            }
            jQuery('.page-loader-wrapper').hide();
        }

        jQuery('.page-loader-wrapper').hide();
    },


    LoadAssetDetails: function () {


        var hostel_id = jQuery("#DdlHostelName").val();

        jQuery('#maincard').hide();
      
        var GetRentDetails =
        {
            flag: "AddNewHostalRec",
            pagVal: "getAssetdtl",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _RecommendHostel.TableLoadAssetDetails, userdata.token)


    },



    TableLoadAssetDetails: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response && response.status === "SUCCESS") {
            jQuery('#maincard').show();
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            if (response.data && response.data.queryResult.QueryResult.length > 0) {
                jQuery('#divagreementdetailstable').empty();

                var $table = jQuery('<table class="table" id="tblapproval">');
                $table.append
                    ('<thead><tr> <th style="text-align:center;">ITEM NAME</th><th style="text-align:center;">COUNT</th></thead>')
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
                 



                    $tbody.append($row);
                  


                });



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


    ConfirmHostel: function () {


        var hostel_id = jQuery("#DdlHostelName").val();

        jQuery('.page-loader-wrapper').show();

        var confrim =
        {
            flag: "AddNewHostalRec",
            pagVal: "Add_New_Hostel_Rec",
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", confrim, _RecommendHostel.ConfirmResponse, userdata.token)
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

    RejectHostel: function () {


        var hostel_id = jQuery("#DdlHostelName").val();

        jQuery('.page-loader-wrapper').show();

        var confrim =
        {
            flag: "AddNewHostalRec",
            pagVal: "Add_New_Hostel_RejAtRec",
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", confrim, _RecommendHostel.RejectResponse, userdata.token)
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




jQuery('#DdlHostelName').change(function () {

   
    _RecommendHostel.GetHostelDetails();
    _RecommendHostel.LoadAssetDetails();

});

jQuery('#BtnApprove').click(function () {


    _RecommendHostel.ConfirmHostel();

});

jQuery('#btnReject').click(function () {


    _RecommendHostel.RejectHostel();

});


jQuery('#btn_exit').click(function () {

    window.location = "Dashboard";

});


