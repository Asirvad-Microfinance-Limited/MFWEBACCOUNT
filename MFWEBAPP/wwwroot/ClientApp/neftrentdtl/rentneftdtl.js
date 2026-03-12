

var _Neft_add = {

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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", CheckAccess, _Neft_add.checkAccessRtn, token)
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _Neft_add.checkAccessToken, userdata.token)
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



                _Neft_add.GetCustomer();
                _Neft_add.GetState();
                _Neft_add.GetAccount();


            }


        }

    },

    GetCustomer: function () {


        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADD_NEFT_DETAILS",
            pagVal: "cust_load",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Neft_add.FillCustomer, userdata.token)
    },

    FillCustomer: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#custname").empty();

                jQuery("#custname").append(jQuery("<option></option>").val("0").text("--SELECT CUSTOMER--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#custname").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#custname").empty();
                jQuery("#custname").append(jQuery("<option></option>").val("0").text("--SELECT CUSTOMER--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#custname").empty();
            jQuery("#custname").append(jQuery("<option></option>").val("0").text("--SELECT CUSTOMER--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetState: function () {


        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADD_NEFT_DETAILS",
            pagVal: "state_load",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Neft_add.FillState, userdata.token)
    },

    FillState: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#cstate").empty();

                jQuery("#cstate").append(jQuery("<option></option>").val("0").text("--SELECT STATE--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#cstate").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#cstate").empty();
                jQuery("#cstate").append(jQuery("<option></option>").val("0").text("--SELECT STATE--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#cstate").empty();
            jQuery("#cstate").append(jQuery("<option></option>").val("0").text("--SELECT STATE--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    GetDistrict: function () {

        jQuery('.page-loader-wrapper').show();

        var State_id = jQuery("#cstate").val();


        var GetRentDetails =
        {
            flag: "ADD_NEFT_DETAILS",
            pagVal: "district_load",
            parVal: State_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Neft_add.FillDistrict, userdata.token)
    },

    FillDistrict: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#cdistrict").empty();

                jQuery("#cdistrict").append(jQuery("<option></option>").val("0").text("--SELECT DISTRICT--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#cdistrict").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#cdistrict").empty();
                jQuery("#cdistrict").append(jQuery("<option></option>").val("0").text("--SELECT DISTRICT--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#cdistrict").empty();
            jQuery("#cdistrict").append(jQuery("<option></option>").val("0").text("--SELECT DISTRICT--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetBank: function () {

        jQuery('.page-loader-wrapper').show();

        var District_id = jQuery("#cdistrict").val();


        var GetRentDetails =
        {
            flag: "ADD_NEFT_DETAILS",
            pagVal: "bank_load",
            parVal: District_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Neft_add.FillBank, userdata.token)
    },

    FillBank: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {



                jQuery('.page-loader-wrapper').hide();


                jQuery("#cbank").empty();

                jQuery("#cbank").append(jQuery("<option></option>").val("0").text("--SELECT BANK--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    var res = val.Param1;
                    var bank_id = res.split('^');
                    jQuery("#cbank").append(jQuery("<option></option>").val(bank_id[1]).text(val.Param2));


                });
            }
            else {
                jQuery("#cbank").empty();
                jQuery("#cbank").append(jQuery("<option></option>").val("0").text("--SELECT BANK--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#cbank").empty();
            jQuery("#cbank").append(jQuery("<option></option>").val("0").text("--SELECT BANK--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetBranch: function () {

        jQuery('.page-loader-wrapper').show();

        var district_id = jQuery("#cdistrict").val();
        var state_id = jQuery("#cstate").val();
        var bank_id = jQuery("#cbank").val();


        var GetRentDetails =
        {
            flag: "ADD_NEFT_DETAILS",
            pagVal: "branch_load",
            parVal: district_id + 'µ' + bank_id + 'µ' + state_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Neft_add.FillBranch, userdata.token)
    },

    FillBranch: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {



                jQuery('.page-loader-wrapper').hide();


                jQuery("#cbranch").empty();

                jQuery("#cbranch").append(jQuery("<option></option>").val("0").text("--SELECT BRANCH--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    //var res = val.Param1;
                    //var bank_id = res.split('^');
                    jQuery("#cbranch").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#cbranch").empty();
                jQuery("#cbranch").append(jQuery("<option></option>").val("0").text("--SELECT BRANCH--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#cbranch").empty();
            jQuery("#cbranch").append(jQuery("<option></option>").val("0").text("--SELECT BRANCH--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },



    GetAccount: function () {


        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADD_NEFT_DETAILS",
            pagVal: "account_load",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Neft_add.FillAccount, userdata.token)
    },

    FillAccount: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#caccount").empty();

                jQuery("#caccount").append(jQuery("<option></option>").val("0").text("--SELECT ACCOUNT--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#caccount").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#caccount").empty();
                jQuery("#caccount").append(jQuery("<option></option>").val("0").text("--SELECT ACCOUNT--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#caccount").empty();
            jQuery("#caccount").append(jQuery("<option></option>").val("0").text("--SELECT ACCOUNT--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    LoadCustomerTable: function () {
        jQuery('.page-loader-wrapper').show();
        // Hide the card while loading new data to prevent flickering
        jQuery('#maincard').hide();

        var customer_id = jQuery("#custname").val();
        if (!customer_id) {
            jQuery('.page-loader-wrapper').hide();
            return false;
        }

        //var input = customer_id.split('%');
        //var branch_id = input[0];
        //var category_id = input[1];
        //var flat_id = input[2];

        var GetRentDetails = {
            flag: "ADD_NEFT_DETAILS",
            pagVal: "table_load",
            parVal: customer_id,
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
            _Neft_add.TableLoadCompleted,
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
                    ('<thead><tr> <th style="text-align:center;">CUST_ID</th><th style="text-align:center;">NAME</th><th style="text-align:center;">FAT_HUS</th><th style="text-align:center;">HOUSE_NAME</th><th style="text-align:center;">LOCALITY</th></thead>')
                var $tbody = jQuery('<tbody>');
                var $container = jQuery('#divagreementdetailstable');
                $container.empty();

                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {

                    var M = response.data.queryResult.QueryResult[i].Param1;

                    var datas = M.split('$');


                    var leaseID = datas[0];
                    var $row = jQuery('<tr/>');
                    $row.append(jQuery('<td align="center">').html(datas[0]));
                    $row.append(jQuery('<td align="center">').html(datas[1]));
                    $row.append(jQuery('<td align="center">').html(datas[2]));
                    $row.append(jQuery('<td align="center">').html(datas[3]));
                    $row.append(jQuery('<td align="center">').html(datas[4]));



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

    ConfirmAddNeft: function (CustomerID, CustomerName, Ifsc, BranchName, Accnumber, Account_id, Mobilenumber, Bank_id) {



        jQuery('.page-loader-wrapper').show();


        var confrim = {

            flag: "ADD_NEFT_DETAILS",
            pagVal: "add_neft_confirm",
            parVal: 3 + 'µ' + userdata.branchId + 'µ' + CustomerID + 'µ' + CustomerName + 'µ' + Ifsc + 'µ' + BranchName + 'µ' + Accnumber + 'µ' + Account_id + 'µ' + Mobilenumber + 'µ' + userdata.userId + 'µ' + Bank_id,
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", confrim, _Neft_add.ConfirmAddNeftResponse, userdata.token)

    },

    ConfirmAddNeftResponse: function (response) {


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

    _Neft_add.tokenValidate();

});

jQuery('#btn_exit').click(function () {

    window.location = "Dashboard";

});

jQuery('#cstate').change(function () {

    _Neft_add.GetDistrict();
    jQuery("#cbank").empty();
    jQuery("#cbank").append(jQuery("<option></option>").val("0").text("--SELECT BANK--"));
    jQuery("#cbranch").empty();
    jQuery("#cbranch").append(jQuery("<option></option>").val("0").text("--SELECT BRANCH--"));
    jQuery("#ifsccode").val('');

});

jQuery('#cdistrict').change(function () {

    _Neft_add.GetBank();
    jQuery("#cbranch").empty();
    jQuery("#cbranch").append(jQuery("<option></option>").val("0").text("--SELECT BRANCH--"));
    jQuery("#ifsccode").val('');

});

jQuery('#cbank').change(function () {

    _Neft_add.GetBranch();
    jQuery("#ifsccode").val('');
    jQuery("#acnumber").val('');

});

jQuery('#cbranch').change(function () {

    var ifsc = jQuery("#cbranch").val();
    jQuery("#ifsccode").val(ifsc);

});

jQuery('#BtnViewCustomer').click(function () {

    _Neft_add.LoadCustomerTable();

});

jQuery('#BtnConfirm').click(function () {

    var CustomerID = jQuery("#custname").val();
    var State_id = jQuery("#cstate").val();
    var District_id = jQuery("#cdistrict").val();
    var Bank_id = jQuery("#cbank").val();
    var BankBranch_id = jQuery("#cbranch").val();
    var Account_id = jQuery("#caccount").val();
    var Accnumber = jQuery("#acnumber").val().trim();
    var Mobilenumber = jQuery("#cmobile").val().trim();
    var Custnamebank = jQuery("#customernamebank").val().trim();
    var Ifsc = jQuery("#ifsccode").val().trim();
    var custname = jQuery("#custname option:selected").text();
    var custmr = custname.split('---');
    var CustomerName = custmr[1];
    var BranchName = jQuery("#cbranch option:selected").text();



    if (CustomerID == '0') {
        swal("Please select Customer !!!....", "", "warning");
        return false;

    }
    else if (State_id == '0') {
        swal("Please Select State!!!....", "", "warning");
        return false;

    }
    else if (District_id == '0') {
        swal("Please Select District!!!....", "", "warning");
        return false;
    }
    else if (Bank_id == '0') {
        swal("Please Select Bank!!!....", "", "warning");
        return false;
    }
    else if (BankBranch_id == '0') {
        swal("Please Select Branch!!!....", "", "warning");
        return false;
    }
    else if (Account_id == '0') {
        swal("Please Select Account!!!....", "", "warning");
        return false;
    }
    else if (Accnumber == '') {
        swal("Please Enter Account Number!!!....", "", "warning");
        return false;
    }
    else if (Mobilenumber == '') {
        swal("Please Enter Mobile Number!!!....", "", "warning");
        return false;
    }

    else if (Mobilenumber.length > 0 && Mobilenumber.length < 10) {

        alert("Mobile number must be exactly 10 digits.");
        return false;

    }
    else if (Custnamebank == '') {
        swal("Please Enter Customer Name in Bank!!!....", "", "warning");
        return false;
    }


    _Neft_add.ConfirmAddNeft(CustomerID, CustomerName, Ifsc, BranchName, Accnumber, Account_id, Mobilenumber, Bank_id);

});

jQuery('#BtnViewCustomer').click(function () {

    var CustomerID = jQuery("#custname").val();
    if (CustomerID == '0') {
        jQuery('.page-loader-wrapper').hide();
        swal("Please select Customer !!!....", "", "warning");
        return false;

    }
});


