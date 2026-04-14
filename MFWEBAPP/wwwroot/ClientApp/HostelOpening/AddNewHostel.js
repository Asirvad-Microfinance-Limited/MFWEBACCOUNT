


jQuery(document).ready(function ($) {



    _Add_hostel.tokenValidate();

});
var _Add_hostel = {

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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", CheckAccess, _Add_hostel.checkAccessRtn, token)
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _Add_hostel.checkAccessToken, userdata.token)
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

                _Add_hostel.GetNearestBranch();
                _Add_hostel.GetState();
                _Add_hostel.GetZone();
                _Add_hostel.GetLocalBody();
                _Add_hostel.GetHostelType();
                _Add_hostel.GetBuilding();
                _Add_hostel.GetItem();
            }


        }

    },


    GetNearestBranch: function () {


        //jQuery('.page-loader-wrapper').show();


        //var GetRentDetails =
        //{
        //    flag: "Hostel_opening",
        //    pagVal: "AddNewHostal",
        //    parVal: "LoadHstBranch" + '~' + userdata.userId,
        //    typeID: "4",
        //    userID: userdata.userId,
        //    branchID: userdata.branchId

        //};


        //try {
        //    GetRentDetails = JSON.stringify(GetRentDetails);
        //} catch (e) {
        //    swal("", e.message, "warning");
        //    return false;
        //}
        //GetRentDetails = { "encryptedRqstStr": EncryptAPIReq(GetRentDetails) };


        //_http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _Add_hostel.FillNearestBranch, userdata.token)



        var GetRentDetails =
        {
            flag: "AddNewHostal",
            pagVal: "LoadHstBranch",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _Add_hostel.FillNearestBranch, userdata.token)
    },

    FillNearestBranch: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                //jQuery('.page-loader-wrapper').hide();


                jQuery("#branch_id").empty();

                jQuery("#branch_id").append(jQuery("<option></option>").val("0").text("--Select Branch--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#branch_id").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#branch_id").empty();
                jQuery("#branch_id").append(jQuery("<option></option>").val("0").text("--Select Branch --"));
            }
            // jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#branch_id").empty();
            jQuery("#branch_id").append(jQuery("<option></option>").val("0").text("--Select Branch --"));
        }
        //jQuery('.page-loader-wrapper').hide();
    },

    GetState: function () {


        //jQuery('.page-loader-wrapper').show();


        //var GetRentDetails =
        //{
        //    flag: "Hostel_opening",
        //    pagVal: "AddNewHostal",
        //    parVal: "LoadState",
        //    typeID: "4",
        //    userID: userdata.userId,
        //    branchID: userdata.branchId

        //};


        //try {
        //    GetRentDetails = JSON.stringify(GetRentDetails);
        //} catch (e) {
        //    swal("", e.message, "warning");
        //    return false;
        //}
        //GetRentDetails = { "encryptedRqstStr": EncryptAPIReq(GetRentDetails) };


        //_http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _Add_hostel.Fillstate, userdata.token)

        var GetRentDetails =
        {
            flag: "AddNewHostal",
            pagVal: "LoadState",
           // parVal: "",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _Add_hostel.Fillstate, userdata.token)
    },

    Fillstate: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                //jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlState").empty();

                jQuery("#ddlState").append(jQuery("<option></option>").val("0").text("--Select State--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlState").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlState").empty();
                jQuery("#ddlState").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
           // jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlState").empty();
            jQuery("#ddlState").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        //jQuery('.page-loader-wrapper').hide();
    },

    GetZone: function () {


        //jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "AddNewHostal",
            pagVal: "LoadZonal",
            //parVal: "",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _Add_hostel.FillZone, userdata.token)
    },

    FillZone: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                //jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlZonal").empty();

                jQuery("#ddlZonal").append(jQuery("<option></option>").val("0").text("--Select Zone--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlZonal").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlZonal").empty();
                jQuery("#ddlZonal").append(jQuery("<option></option>").val("0").text("--Select Zone--"));
            }
           // jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlZonal").empty();
            jQuery("#ddlZonal").append(jQuery("<option></option>").val("0").text("--Select Zone--"));
        }
        //jQuery('.page-loader-wrapper').hide();
    },

    GetLocalBody: function () {


        //jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "AddNewHostal",
            pagVal: "Loadlclbody",
            //parVal: "",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _Add_hostel.FillLocalBody, userdata.token)
    },

    FillLocalBody: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                //jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlLocalBody").empty();

                jQuery("#ddlLocalBody").append(jQuery("<option></option>").val("0").text("--Select Local Body--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlLocalBody").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlLocalBody").empty();
                jQuery("#ddlLocalBody").append(jQuery("<option></option>").val("0").text("--Select Local Body--"));
            }
            // jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlLocalBody").empty();
            jQuery("#ddlLocalBody").append(jQuery("<option></option>").val("0").text("--Select Local Body--"));
        }
        //jQuery('.page-loader-wrapper').hide();
    },

    GetHostelType: function () {


        //jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "AddNewHostal",
            pagVal: "Loadhstltype",
            //parVal: "",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _Add_hostel.FillHostelType, userdata.token)
    },

    FillHostelType: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                //jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlHostelType").empty();

                jQuery("#ddlHostelType").append(jQuery("<option></option>").val("0").text("--Select Hostel Type--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlHostelType").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlHostelType").empty();
                jQuery("#ddlHostelType").append(jQuery("<option></option>").val("0").text("--Select Hostel Type--"));
            }
            // jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlHostelType").empty();
            jQuery("#ddlHostelType").append(jQuery("<option></option>").val("0").text("--Select Hostel Type--"));
        }
        //jQuery('.page-loader-wrapper').hide();
    },

    GetBuilding: function () {


        //jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "AddNewHostal",
            pagVal: "Loadbldtype",
            //parVal: "",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _Add_hostel.FillBuilding, userdata.token)
    },

    FillBuilding: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                //jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlBuilding").empty();

                jQuery("#ddlBuilding").append(jQuery("<option></option>").val("0").text("--Select --"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlBuilding").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlBuilding").empty();
                jQuery("#ddlBuilding").append(jQuery("<option></option>").val("0").text("--Select --"));
            }
            // jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlBuilding").empty();
            jQuery("#ddlBuilding").append(jQuery("<option></option>").val("0").text("--Select --"));
        }
        //jQuery('.page-loader-wrapper').hide();

    },

    GetItem: function () {


        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "AddNewHostal",
            pagVal: "Loaditem",
            //parVal: "",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _Add_hostel.FillItem, userdata.token)
    },

    FillItem: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlItem").empty();

                jQuery("#ddlItem").append(jQuery("<option></option>").val("0").text("--Select Item--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlItem").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlItem").empty();
                jQuery("#ddlItem").append(jQuery("<option></option>").val("0").text("--Select Item--"));
            }
             jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlItem").empty();
            jQuery("#ddlItem").append(jQuery("<option></option>").val("0").text("--Select Item --"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    GetDistrict: function () {


        jQuery('.page-loader-wrapper').show();

        var state_id = jQuery("#ddlState").val();

        var GetRentDetails =
        {
            flag: "AddNewHostal",
            pagVal: "Loaddis",
            parVal: state_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _Add_hostel.FillDistrict, userdata.token)
    },

    FillDistrict: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlDistrict").empty();

                jQuery("#ddlDistrict").append(jQuery("<option></option>").val("0").text("--Select District--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlDistrict").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlDistrict").empty();
                jQuery("#ddlDistrict").append(jQuery("<option></option>").val("0").text("--Select District--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlDistrict").empty();
            jQuery("#ddlDistrict").append(jQuery("<option></option>").val("0").text("--Select District --"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    GetPost: function () {


        jQuery('.page-loader-wrapper').show();

        var district_id = jQuery("#ddlDistrict").val();

      

        var GetRentDetails =
        {
            flag: "AddNewHostal",
            pagVal: "Loadpost",
            parVal: district_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _Add_hostel.FillPost, userdata.token)
    },

    FillPost: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlPost").empty();

                jQuery("#ddlPost").append(jQuery("<option></option>").val("0").text("--Select Post --"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlPost").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlPost").empty();
                jQuery("#ddlPost").append(jQuery("<option></option>").val("0").text("--Select Post --"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlPost").empty();
            jQuery("#ddlPost").append(jQuery("<option></option>").val("0").text("--Select Post --"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    GetRegion: function () {


        jQuery('.page-loader-wrapper').show();

        var Zone_id = jQuery("#ddlZonal").val();



        var GetRentDetails =
        {
            flag: "AddNewHostal",
            pagVal: "Loadreg",
            parVal: Zone_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _Add_hostel.FillRegion, userdata.token)
    },

    FillRegion: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlRegion").empty();

                jQuery("#ddlRegion").append(jQuery("<option></option>").val("0").text("--Select Region --"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlRegion").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlRegion").empty();
                jQuery("#ddlRegion").append(jQuery("<option></option>").val("0").text("--Select Region --"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlRegion").empty();
            jQuery("#ddlRegion").append(jQuery("<option></option>").val("0").text("--Select Region --"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    GetDivision: function () {


        jQuery('.page-loader-wrapper').show();

        var reg_id = jQuery("#ddlRegion").val();



        var GetRentDetails =
        {
            flag: "AddNewHostal",
            pagVal: "Loaddiv",
            parVal: reg_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _Add_hostel.FillDiv, userdata.token)
    },

    FillDiv: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlDivision").empty();

                jQuery("#ddlDivision").append(jQuery("<option></option>").val("0").text("--Select Division --"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlDivision").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlDivision").empty();
                jQuery("#ddlDivision").append(jQuery("<option></option>").val("0").text("--Select Division --"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlDivision").empty();
            jQuery("#ddlDivision").append(jQuery("<option></option>").val("0").text("--Select Division --"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetArea: function () {


        jQuery('.page-loader-wrapper').show();

        var div_id = jQuery("#ddlDivision").val();



        var GetRentDetails =
        {
            flag: "AddNewHostal",
            pagVal: "Loadarea",
            parVal: div_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _Add_hostel.FillArea, userdata.token)
    },

    FillArea: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlArea").empty();

                jQuery("#ddlArea").append(jQuery("<option></option>").val("0").text("--Select Area --"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlArea").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlArea").empty();
                jQuery("#ddlArea").append(jQuery("<option></option>").val("0").text("--Select Area --"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlArea").empty();
            jQuery("#ddlArea").append(jQuery("<option></option>").val("0").text("--Select Area --"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    Submit_hostel: function (hostel_name, branch, mobile, hostelAddress, state, district, pin_serialnumber, Zone, region, division, area, localBody, localBodyName, occupants, halls, bedrooms, kitchen, bathrooms, Electricity, Water, parking, sqrfeet, AdvRent, AgrDate, AgrEndDate, Floor, RentAmt, HostelType, BuildingType, assetDetails) { 

       // jQuery('.page-loader-wrapper').show();
        var assetDataString = assetDetails.map(function (item) {
            return  item.ItemName + "$" + item.Count;
        }).join("@");

        // 2. Alert the result to verify
      

      //               1                    2                       3                   4             5               6               7              8             9              10              11            12              13              14              15               16                 17                  18               19             20                21               22              23             24                   25                  26               27            28                 29                   30               31
        var input = hostel_name + 'µ' + hostelAddress + 'µ' + assetDataString + 'µ' + mobile + 'µ' + state + 'µ' + district + 'µ' + pin_serialnumber + 'µ' + Zone + 'µ' + region + 'µ' + division + 'µ' + area + 'µ' + AgrDate + 'µ' + sqrfeet + 'µ' + RentAmt + 'µ' + AdvRent + 'µ' + localBody + 'µ' + localBodyName + 'µ' + occupants + 'µ' + halls + 'µ' + bedrooms + 'µ' + kitchen + 'µ' + bathrooms + 'µ' + Floor + 'µ' + BuildingType + 'µ' + HostelType + 'µ' + Electricity + 'µ' + Water + 'µ' + parking + 'µ' + userdata.userId + 'µ' + branch + 'µ' + AgrEndDate;

      
        var confrim = {

            flag: "AddNewHostal",
            pagVal: "Add_New_Hostel_Req",
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", confrim, _Add_hostel.SubmitResponse, userdata.token)

    },


    SubmitResponse: function (response) {

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


jQuery('#ddlState').change(function () {

    _Add_hostel.GetDistrict();
    jQuery("#ddlPost").empty();
    jQuery("#ddlPost").append(jQuery("<option></option>").val("0").text("--Select Post --"));
    jQuery('#TxtPinCode').val('');


});


jQuery('#ddlDistrict').change(function () {

    _Add_hostel.GetPost();
    jQuery('#TxtPinCode').val('');

});


jQuery('#ddlPost').change(function () {

    var post_value =jQuery('#ddlPost').val();

    var val = post_value.split('@');
    jQuery('#TxtPinCode').val(val[0]);


});


jQuery('#ddlZonal').change(function () {

    _Add_hostel.GetRegion();

    jQuery("#ddlDivision").empty();
    jQuery("#ddlDivision").append(jQuery("<option></option>").val("0").text("--Select Division --"));
    jQuery("#ddlArea").empty();
    jQuery("#ddlArea").append(jQuery("<option></option>").val("0").text("--Select Area --"));


});



jQuery('#ddlRegion').change(function () {

    _Add_hostel.GetDivision();
    jQuery("#ddlArea").empty();
    jQuery("#ddlArea").append(jQuery("<option></option>").val("0").text("--Select Area --"));

});


jQuery('#ddlDivision').change(function () {

    _Add_hostel.GetArea();


});

jQuery('#BtnConfirm').click(function () {

    //    jQuery('.page-loader-wrapper').hide();

    var hostel_name = jQuery("#Hostel_name").val();
    var branch = jQuery("#branch_id").val();
    var mobile = jQuery("#mobile").val();
    var hostelAddress = jQuery("#HostelAddress").val();
    var state = jQuery("#ddlState").val();
    var district = jQuery("#ddlDistrict").val();
    var post = jQuery("#ddlPost").val();
    var pin = post.split('@');
    var pin_serialnumber = pin[1];
    var pincode = jQuery("#TxtPinCode").val();
    var Zone = jQuery("#ddlZonal").val();
    var region = jQuery("#ddlRegion").val();
    var division = jQuery("#ddlDivision").val();
    var area = jQuery("#ddlArea").val();
    var localBody = jQuery("#ddlLocalBody").val();
    var localBodyName = jQuery("#TxtlocalBodyName").val();
    var occupants = jQuery("#txtOccupants").val();
    var halls = jQuery("#txtHalls").val();
    var bedrooms = jQuery("#txtBedrooms").val();
    var kitchen = jQuery("#txtKitchens").val();
    var bathrooms = jQuery("#txtbathrooms").val();



    if (jQuery("#Electricity_yes").prop("checked") == true) {
        var Electricity = jQuery("#Electricity_yes").val();
    }
    else if (jQuery("#Electricity_no").prop("checked") == true) {
        var Electricity = jQuery("#Electricity_no").val();
    }
    else {
        var Electricity = -1;
    }

    if (jQuery("#Water_yes").prop("checked") == true) {
        var Water = jQuery("#Water_yes").val();
    }
    else if (jQuery("#Water_no").prop("checked") == true) {
        var Water = jQuery("#Water_no").val();
    }
    else {
        var Water = -1;
    }


    if (jQuery("#Parking_yes").prop("checked") == true) {
        var parking = jQuery("#Parking_yes").val();
    }
    else if (jQuery("#Parking_no").prop("checked") == true) {
        var parking = jQuery("#Parking_no").val();
    }
    else {
        var parking = -1;
    }


    var sqrfeet = jQuery("#TxtSqrfeet").val();
    var AdvRent = jQuery("#TxtAdvRent").val();
    var AgrDate = jQuery("#TxtAgrimentdt").val();
    var AgrEndDate = jQuery("#TxtAgrimentEndDt").val();
    var Floor = jQuery("#txtFloor").val();
    var RentAmt = jQuery("#txtRent").val();
    var HostelType = jQuery("#ddlHostelType").val();
    var BuildingType = jQuery("#ddlBuilding").val();
   



    if (hostel_name == '')
    {
        swal("Please Enter Hostel Name !!!....", "", "warning");
        return false;
    }
    else if (branch == 0)
    {
        swal("Please Select Branch !!!....", "", "warning");
        return false;
    }
    else if (mobile == '')
    {
        swal("Please Enter Mobile Number !!!....", "", "warning");
        return false;
    }
    else if (hostelAddress == '')
    {
        swal("Please Enter Hostel Address !!!....", "", "warning");
        return false;

    }
    else if (state == 0) {
        swal("Please Select State !!!....", "", "warning");
        return false;
    }
    else if (district == 0) {
        swal("Please Select District !!!....", "", "warning");
        return false;
    }
    else if (post == 0) {
        swal("Please Select Post !!!....", "", "warning");
        return false;
    }

    else if (Zone == 0) {
        swal("Please Select Zone !!!....", "", "warning");
        return false;
    }

    else if (region == 0) {
        swal("Please Select Region !!!....", "", "warning");
        return false;
    }
    else if (division == 0) {
        swal("Please Select Division !!!....", "", "warning");
        return false;
    }
    else if (area == 0) {
        swal("Please Select Area !!!....", "", "warning");
        return false;
    }
    else if (localBody == 0) {
        swal("Please Select Local Body !!!....", "", "warning");
        return false;
    }

    else if (localBodyName == '')
    {
        swal("Please Enter Local Body Name!!!....", "", "warning");
        return false;
    }

    else if (occupants == '') {
        swal("Please Enter Number Of Occupants!!!....", "", "warning");
        return false;
    }
    else if (halls == '') {
        swal("Please Enter No of Halls!!!....", "", "warning");
        return false;
    }
    else if (bedrooms == '') {
        swal("Please Enter No of Bedrooms!!!....", "", "warning");
        return false;
    }
    else if (kitchen == '') {
        swal("Please Enter No of Kitchens!!!....", "", "warning");
        return false;
    }
    else if (bathrooms == '') {
        swal("Please Enter No of Bathrooms!!!....", "", "warning");
        return false;
    }

    else if (Electricity == -1) {
        swal("Please select whether Electricity is available(Yes or No)...", "", "warning");
        return false;
    }
    else if (Water == -1) {
        swal("Please select whether water is available(Yes or No)...", "", "warning");
        return false;
    }

    else if (parking == -1) {
        swal("Please select whether Parking is available(Yes or No)...", "", "warning");
        return false;
    }
    else if (sqrfeet == '') {
        swal("Please enter the Square feet...", "", "warning");
        return false;
    }
    else if (AgrDate == '') {
        swal("Please enter the agreement date...", "", "warning");
        return false;
    }
    else if (AgrEndDate == '') {
        swal("Please enter the agreement end date...", "", "warning");
        return false;
    }
    else if (Floor == '') {
        swal("Please enter proposed floor...", "", "warning");
        return false;
    }
    else if (RentAmt == '') {
        swal("Please enter rent amount...", "", "warning");
        return false;
    }
    else if (HostelType == 0) {
        swal("Please select hostel type...", "", "warning");
        return false;
    }
    else if (BuildingType == 0) {
        swal("Please select type of building...", "", "warning");
        return false;
    }

    var assetCount = jQuery("#itemTableBody tr").length;
    if (assetCount === 0) {
        swal("Please add at least one Item in Asset Details!!!", "", "warning");
        return false;
    }



    var assetDetails = [];

    jQuery("#itemTableBody tr").each(function () {

        var row = jQuery(this);

        assetDetails.push({
            ItemId: row.attr('data-item-id'), // The ID from Step 1
            ItemName: row.find("td:eq(0)").text(), // The Text
            Count: row.find("td:eq(1)").text()     // The Count
        });
    });


    
    _Add_hostel.Submit_hostel(hostel_name, branch, mobile, hostelAddress, state, district, pin_serialnumber, Zone, region, division, area, localBody, localBodyName, occupants, halls, bedrooms, kitchen, bathrooms, Electricity, Water, parking, sqrfeet, AdvRent, AgrDate, AgrEndDate, Floor, RentAmt, HostelType, BuildingType, assetDetails);

});




// Helper function to check if table has rows and toggle div visibility
function updateTableVisibility() {
    const tableBody = document.getElementById('itemTableBody');
    const accountDiv = document.getElementById('account_div');

    // If tableBody has 0 children, hide the div; otherwise, show it
    if (tableBody.children.length === 0) {
        accountDiv.style.display = 'none';
    } else {
        accountDiv.style.display = 'block'; // or 'flex' depending on your layout
    }
}

// Run this once on page load to ensure it's hidden if empty
updateTableVisibility();

document.getElementById('BtnAdd').addEventListener('click', function () {
    const ddlItem = document.getElementById('ddlItem');
    const txtCount = document.getElementById('txtCount');
    const tableBody = document.getElementById('itemTableBody');

    const itemText = ddlItem.options[ddlItem.selectedIndex].text;
    const itemValue = ddlItem.value;
    const countValue = txtCount.value.trim();

    if (itemValue === "0" || countValue === "") {
        alert("Please select an item and enter a count.");
        return;
    }

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${itemText}</td>
        <td>${countValue}</td>
        <td>
            <button type="button" class="btn btn-danger btn-sm btn-delete">Delete</button>
        </td>
    `;

    row.querySelector('.btn-delete').addEventListener('click', function () {
        row.remove();
        // Check visibility again after deleting a row
        updateTableVisibility();
    });

    tableBody.appendChild(row);

    // Check visibility after adding a row
    updateTableVisibility();

    ddlItem.value = "0";
    txtCount.value = "";
});


jQuery('#bs_datepicker_container1 input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showButtonPanel: true,
    changeMonth: true,
    container: '#bs_datepicker_container1'
})/*.datepicker("setDate", new Date())*/;

jQuery('#bs_datepicker_container2 input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showButtonPanel: true,
    changeMonth: true,
    container: '#bs_datepicker_container2'
})/*.datepicker("setDate", new Date())*/;



// Helper function to parse dd/mm/yyyy strings into Date objects
function parseDate(str) {
    var parts = str.split("/");
    // new Date(year, monthIndex, day)
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

// Attach the logic to the "To Date" input
jQuery('#TxtAgrimentEndDt').datepicker().on('changeDate', function () {

    var fromDateStr = jQuery('#TxtAgrimentdt').val();
    var toDateStr = jQuery('#TxtAgrimentEndDt').val();

    // 1. Check if "From Date" is empty first
    if (!fromDateStr) {
        swal("Select From Date First", "Please select the Agreement From Date before choosing an End Date.", "warning");
        jQuery('#TxtAgrimentEndDt').val('');
        return;
    }

    // 2. Perform comparison if both dates exist
    if (fromDateStr && toDateStr) {
        var startDate = parseDate(fromDateStr);
        var endDate = parseDate(toDateStr);

        if (startDate > endDate) {
            swal({
                title: "Invalid Range!",
                text: "Agreement End Date cannot be earlier than the From Date.",
                icon: "warning",
                type: "warning" // Depending on your version of SweetAlert
            });

            // Clear the invalid end date
            jQuery('#TxtAgrimentEndDt').val('');
        }
    }
});

// Optional: Also check when "From Date" changes in case they pick a later start date
jQuery('#TxtAgrimentdt').datepicker().on('changeDate', function () {
    var fromDateStr = jQuery(this).val();
    var toDateStr = jQuery('#TxtAgrimentEndDt').val();

    if (fromDateStr && toDateStr) {
        var startDate = parseDate(fromDateStr);
        var endDate = parseDate(toDateStr);

        if (startDate > endDate) {
            swal("Invalid Change", "The From Date is now later than your End Date. Please re-check.", "warning");
            jQuery('#TxtAgrimentdt').val('');
        }
    }
});