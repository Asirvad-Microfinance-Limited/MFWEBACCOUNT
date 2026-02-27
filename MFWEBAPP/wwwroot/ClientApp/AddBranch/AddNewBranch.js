


var _Add_branch = {

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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", CheckAccess, _Add_branch.checkAccessRtn, token)
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _Add_branch.checkAccessToken, userdata.token)
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


                _Add_branch.GetSite();
                _Add_branch.GetState();
                _Add_branch.GetZonal();
                _Add_branch.GetLocalBody();
                _Add_branch.GetBranchTime();
                _Add_branch.GetFirm();

            }


        }

    },

    GetSite: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADD_BRANCH",
            pagVal: "siteload",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Add_branch.Fillsite, userdata.token)
    },

    Fillsite: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlsite").empty();

                jQuery("#ddlsite").append(jQuery("<option></option>").val("0").text("--Select Site--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlsite").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlsite").empty();
                jQuery("#ddlsite").append(jQuery("<option></option>").val("0").text("--Select Site--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlsite").empty();
            jQuery("#ddlsite").append(jQuery("<option></option>").val("0").text("--Select Site--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    GetBranchType: function () {

        jQuery('.page-loader-wrapper').show();

        var site_id = jQuery("#ddlsite").val();


        var GetRentDetails =
        {
            flag: "ADD_BRANCH",
            pagVal: "GetBranchType",
            parVal: site_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Add_branch.FillBranchType, userdata.token)
    },

    FillBranchType: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                var res = response.data.queryResult.QueryResult[0].Param1;

                var parts = res.split('~');

                // 2. Extract the values
                var firstValue = parts[0];  // The one you want hidden
                var secondValue = parts[1]; // The one you want to show

                // 3. Set the visible value of the textbox
                jQuery("#TxtBrancType").val(secondValue);

                // 4. Store the hidden value in a data attribute
                jQuery("#TxtBrancType").attr("data-hidden-val", firstValue);

            }
            jQuery('.page-loader-wrapper').hide();
        }

        jQuery('.page-loader-wrapper').hide();
    },



    GetLocalBody: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADD_BRANCH",
            pagVal: "localbodyload",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Add_branch.FillLocalBody, userdata.token)
    },

    FillLocalBody: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlLocalBody").empty();

                jQuery("#ddlLocalBody").append(jQuery("<option></option>").val("0").text("--Select --"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlLocalBody").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlLocalBody").empty();
                jQuery("#ddlLocalBody").append(jQuery("<option></option>").val("0").text("--Select --"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlLocalBody").empty();
            jQuery("#ddlLocalBody").append(jQuery("<option></option>").val("0").text("--Select --"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetBranchTime: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADD_BRANCH",
            pagVal: "shiftload",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Add_branch.FillBranchTime, userdata.token)
    },

    FillBranchTime: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlbranchTime").empty();

                jQuery("#ddlbranchTime").append(jQuery("<option></option>").val("0").text("--Select --"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlbranchTime").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlbranchTime").empty();
                jQuery("#ddlbranchTime").append(jQuery("<option></option>").val("0").text("--Select --"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlbranchTime").empty();
            jQuery("#ddlbranchTime").append(jQuery("<option></option>").val("0").text("--Select --"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    GetFirm: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADD_BRANCH",
            pagVal: "firmload",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Add_branch.FillFirm, userdata.token)
    },

    FillFirm: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlFirm").empty();

                jQuery("#ddlFirm").append(jQuery("<option></option>").val("0").text("--Select --"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlFirm").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlFirm").empty();
                jQuery("#ddlFirm").append(jQuery("<option></option>").val("0").text("--Select --"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlFirm").empty();
            jQuery("#ddlFirm").append(jQuery("<option></option>").val("0").text("--Select --"));
        }
        jQuery('.page-loader-wrapper').hide();
    },



    GetState: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADD_BRANCH",
            pagVal: "stateload",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Add_branch.FillState, userdata.token)
    },

    FillState: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlState").empty();

                jQuery("#ddlState").append(jQuery("<option></option>").val("0").text("--Select State--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlState").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlState").empty();
                jQuery("#ddlState").append(jQuery("<option></option>").val("0").text("--Select State--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlState").empty();
            jQuery("#ddlState").append(jQuery("<option></option>").val("0").text("--Select State--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetDistrict: function () {

        jQuery('.page-loader-wrapper').show();

        var State_id = jQuery("#ddlState").val();


        var GetRentDetails = {
            flag: "ADD_BRANCH",
            pagVal: "districtload",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Add_branch.FillDistrict, userdata.token)
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
                jQuery("#ddlDistrict").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
        }
        else {

            jQuery("#ddlDistrict").empty();
            jQuery("#ddlDistrict").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    GetPost: function () {

        jQuery('.page-loader-wrapper').show();

        var District_id = jQuery("#ddlDistrict").val();


        var GetRentDetails = {
            flag: "ADD_BRANCH",
            pagVal: "postload",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Add_branch.FillPost, userdata.token)
    },

    FillPost: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            if (response.data.queryResult.QueryResult.length > 0) {


                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlPost").empty();

                jQuery("#ddlPost").append(jQuery("<option></option>").val("0").text("--Select--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlPost").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));



                });


            }
            else {
                jQuery("#ddlPost").empty();
                jQuery("#ddlPost").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
        }
        else {

            jQuery("#ddlPost").empty();
            jQuery("#ddlPost").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetZonal: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "ADD_BRANCH",
            pagVal: "zonalload",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Add_branch.FillZonal, userdata.token)
    },

    FillZonal: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlZonal").empty();

                jQuery("#ddlZonal").append(jQuery("<option></option>").val("0").text("--Select--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlZonal").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlZonal").empty();
                jQuery("#ddlZonal").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlZonal").empty();
            jQuery("#ddlZonal").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },




    GetRegion: function () {

        jQuery('.page-loader-wrapper').show();

        var Zonal_id = jQuery("#ddlZonal").val();


        var GetRentDetails = {
            flag: "ADD_BRANCH",
            pagVal: "regionload",
            parVal: Zonal_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Add_branch.FillRegion, userdata.token)
    },

    FillRegion: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            if (response.data.queryResult.QueryResult.length > 0) {


                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlRegion").empty();

                jQuery("#ddlRegion").append(jQuery("<option></option>").val("0").text("--Select Region--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlRegion").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlRegion").empty();
                jQuery("#ddlRegion").append(jQuery("<option></option>").val("0").text("--Select Region--"));
            }
        }
        else {

            jQuery("#ddlRegion").empty();
            jQuery("#ddlRegion").append(jQuery("<option></option>").val("0").text("--Select Region--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetDivision: function () {

        jQuery('.page-loader-wrapper').show();

        var Div_id = jQuery("#ddlRegion").val();


        var GetRentDetails = {
            flag: "ADD_BRANCH",
            pagVal: "divisionload",
            parVal: Div_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Add_branch.FillDivision, userdata.token)
    },

    FillDivision: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            if (response.data.queryResult.QueryResult.length > 0) {


                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlDivision").empty();

                jQuery("#ddlDivision").append(jQuery("<option></option>").val("0").text("--Select Division--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlDivision").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlDivision").empty();
                jQuery("#ddlDivision").append(jQuery("<option></option>").val("0").text("--Select Division--"));
            }
        }
        else {

            jQuery("#ddlDivision").empty();
            jQuery("#ddlDivision").append(jQuery("<option></option>").val("0").text("--Select Division--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetArea: function () {

        jQuery('.page-loader-wrapper').show();

        var Area_id = jQuery("#ddlDivision").val();


        var GetRentDetails = {
            flag: "ADD_BRANCH",
            pagVal: "areaload",
            parVal: Area_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Add_branch.FillArea, userdata.token)
    },

    FillArea: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            if (response.data.queryResult.QueryResult.length > 0) {


                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlArea").empty();

                jQuery("#ddlArea").append(jQuery("<option></option>").val("0").text("--Select Area--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlArea").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlArea").empty();
                jQuery("#ddlArea").append(jQuery("<option></option>").val("0").text("--Select Area--"));
            }
        }
        else {

            jQuery("#ddlArea").empty();
            jQuery("#ddlArea").append(jQuery("<option></option>").val("0").text("--Select Area--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    Getemployee: function () {

        //jQuery('.page-loader-wrapper').show();

        jQuery("#TxtBhName").val('');
        var emp_code = jQuery("#TxtBhEmpCode").val();


        var GetRentDetails =
        {
            flag: "ADD_BRANCH",
            pagVal: "employeeload",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Add_branch.BindEmployee, userdata.token)
    },

    BindEmployee: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                var res = response.data.queryResult.QueryResult[0].Param1;

                jQuery("#TxtBhName").val(res);

            }
            // jQuery('.page-loader-wrapper').hide();
        }

        // jQuery('.page-loader-wrapper').hide();
    },


    AddBranch: function (branch_name, site_id, branch_Address, landPhone, mobile, pin, district, state, Zone_id, reg_id, div_id, Area_id, sqrtFeet, RentPerSqrtFeet, AdvanceRent, EmpCode, localBody, BranchType, localBodyName, Firm, Holiday, shift) {



        //alert(branch_name + 'µ' + site_id + 'µ' + branch_Address + 'µ' + landPhone + 'µ' + mobile + 'µ' + pin + 'µ' + district + 'µ' + state + 'µ' + Zone_id + 'µ' + reg_id + 'µ' + div_id + 'µ' + Area_id + 'µ' + sqrtFeet + 'µ' + RentPerSqrtFeet + 'µ' + AdvanceRent + 'µ' + EmpCode + 'µ' + localBody + 'µ' + userdata.userId + 'µ' + BranchType + 'µ' + localBodyName + 'µ' + Firm + 'µ' + Holiday + 'µ' + shift);
        jQuery('.page-loader-wrapper').show();


        var confrim = {

            flag: "ADD_BRANCH",
            pagVal: "addbranchconfirm",
            ///////      1                 2                    3                 4                5             6             7              8               9              10             11             12               13                 14                     15                16              17                  18                      19                  20                 21           22              23
            parVal: branch_name + 'µ' + site_id + 'µ' + branch_Address + 'µ' + landPhone + 'µ' + mobile + 'µ' + pin + 'µ' + district + 'µ' + state + 'µ' + Zone_id + 'µ' + reg_id + 'µ' + div_id + 'µ' + Area_id + 'µ' + sqrtFeet + 'µ' + RentPerSqrtFeet + 'µ' + AdvanceRent + 'µ' + EmpCode + 'µ' + localBody + 'µ' + userdata.userId + 'µ' + BranchType + 'µ' + localBodyName + 'µ' + Firm + 'µ' + Holiday + 'µ' + shift,
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", confrim, _Add_branch.ConfirmsiteResponse, userdata.token)

    },

    ConfirmsiteResponse: function (response) {


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

    _Add_branch.tokenValidate();

});

jQuery('#ddlState').change(function () {

    _Add_branch.GetDistrict();

    jQuery("#ddlPost").empty();
    jQuery("#ddlPost").append(jQuery("<option></option>").val("0").text("--Select Division--"));
    jQuery('#TxtPinCode').val('');
});

jQuery('#ddlDistrict').change(function () {

    _Add_branch.GetPost();

    jQuery('#TxtPinCode').val('');

});

jQuery('#ddlPost').change(function () {

    var input_post = jQuery("#ddlPost").val();
    var pin_id = input_post.split("@");
    jQuery('#TxtPinCode').val(pin_id[0]);

});

jQuery('#ddlZonal').change(function () {

    _Add_branch.GetRegion();


    jQuery("#ddlDivision").empty();
    jQuery("#ddlDivision").append(jQuery("<option></option>").val("0").text("--Select Division--"));
    jQuery("#ddlArea").empty();
    jQuery("#ddlArea").append(jQuery("<option></option>").val("0").text("--Select Area--"));


});

jQuery('#ddlRegion').change(function () {

    _Add_branch.GetDivision();
    jQuery("#ddlArea").empty();
    jQuery("#ddlArea").append(jQuery("<option></option>").val("0").text("--Select Area--"));

});

jQuery('#ddlDivision').change(function () {

    _Add_branch.GetArea();

});

jQuery('#ddlsite').change(function () {

    _Add_branch.GetBranchType();

});

jQuery('#TxtBhEmpCode').change(function () {

    _Add_branch.Getemployee();

});


jQuery('#TxtSqrFeet').change(function () {
    var val = jQuery('#TxtSqrFeet').val();

    // Ensure the value is a valid number and not just a single dot
    if (val !== "" && val !== "." && !isNaN(val)) {
        var roundedVal = parseFloat(val).toFixed(2);
        jQuery('#TxtSqrFeet').val(roundedVal);
    } else if (val === ".") {
        // If they just typed a dot and left, clear it
        jQuery('#TxtSqrFeet').val("");
    }
});

jQuery('#TxtRentSqrtFeet').change(function () {
    var val = jQuery('#TxtRentSqrtFeet').val();

    // Ensure the value is a valid number and not just a single dot
    if (val !== "" && val !== "." && !isNaN(val)) {
        var roundedVal = parseFloat(val).toFixed(2);
        jQuery('#TxtRentSqrtFeet').val(roundedVal);
    } else if (val === ".") {
        // If they just typed a dot and left, clear it
        jQuery('#TxtRentSqrtFeet').val("");
    }
});


jQuery('#TxtAdvanceRent').change(function () {
    var val = jQuery('#TxtAdvanceRent').val();

    // Ensure the value is a valid number and not just a single dot
    if (val !== "" && val !== "." && !isNaN(val)) {
        var roundedVal = parseFloat(val).toFixed(2);
        jQuery('#TxtAdvanceRent').val(roundedVal);
    } else if (val === ".") {
        // If they just typed a dot and left, clear it
        jQuery('#TxtAdvanceRent').val("");
    }
});


jQuery('#TxtLandPhone').change(function () {

    var input = jQuery('#TxtLandPhone').val();

    if (input.length > 0 && input.length < 10) {

        alert("Invalid Entry: input must be exactly 10 digits.");
        jQuery('#TxtLandPhone').focus();

    }
});

jQuery('#TxtMobile').change(function () {

    var input = jQuery('#TxtMobile').val();

    if (input.length > 0 && input.length < 10) {

        alert("Invalid Entry: input must be exactly 10 digits.");
        jQuery('#TxtMobile').focus();

    }
});




jQuery('#bs_datepicker_container5 input').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy",
    showButtonPanel: true,
    changeMonth: true,
    container: '#bs_datepicker_container5'
}).datepicker("setDate", new Date());


jQuery('#btn_exit').click(function () {

    window.location = "Dashboard";

});



jQuery('#BtnSubmit').click(function () {

    jQuery('.page-loader-wrapper').hide();

    var site_id = jQuery("#ddlsite").val();
    var branch_name = jQuery("#TxtBranchName").val();
    var branch_Address = jQuery("#TxtBranchAddress").val();
    var landPhone = jQuery("#TxtLandPhone").val();
    var mobile = jQuery("#TxtMobile").val();
    var state = jQuery("#ddlState").val();
    var district = jQuery("#ddlDistrict").val();
    var post = jQuery("#ddlPost").val();
    var pin = jQuery("#TxtPinCode").val();
    var Zone_id = jQuery("#ddlZonal").val();
    var reg_id = jQuery("#ddlRegion").val();
    var div_id = jQuery("#ddlDivision").val();
    var Area_id = jQuery("#ddlArea").val();
    var localBody = jQuery("#ddlLocalBody").val();
    var localBodyName = jQuery("#TxtlocalBodyName").val();
    var sqrtFeet = jQuery("#TxtSqrFeet").val();
    var RentPerSqrtFeet = jQuery("#TxtRentSqrtFeet").val();
    var AdvanceRent = jQuery("#TxtAdvanceRent").val();
    var Aggriment_dt = jQuery("#TxtAgrimentdt").val();
    var EmpCode = jQuery("#TxtBhEmpCode").val();
    var Empname = jQuery("#TxtBhName").val();
    var Holiday = jQuery("#ddlbrancHoliday").val();
    var shift = jQuery("#ddlbranchTime").val();
    var BranchType = jQuery("#TxtBrancType").attr("data-hidden-val");//jQuery("#TxtBrancType").val();
    var Firm = jQuery("#ddlFirm").val();
    // var id = '';

    if (site_id == 0) {
        swal("Please Select Site !!!....", "", "warning");
        return false;

    }
    else if (branch_name == '') {
        swal("Please Enter Branch Name!!!....", "", "warning");
        return false;

    }
    else if (branch_Address == '') {
        swal("Please Enter Branch Address!!!....", "", "warning");
        return false;

    }
    else if (landPhone == '') {
        swal("Please Enter Land Phone Number!!!....", "", "warning");
        return false;

    }

    else if (landPhone.length > 0 && landPhone.length < 10) {

        alert(" Number  must be exactly 10 digits.");
        jQuery('#TxtMobile').focus();

    }

    else if (mobile == '') {
        swal("Please Enter Mobile Number!!!....", "", "warning");
        return false;

    }


    else if (mobile.length > 0 && mobile.length < 10) {

        alert(" Mobile Number must be exactly 10 digits.");
        jQuery('#TxtMobile').focus();

    }


    else if (state == 0) {
        swal("Please Select State!!!....", "", "warning");
        return false;

    }

    else if (district == 0) {
        swal("Please Select District!!!....", "", "warning");
        return false;

    }
    else if (post == 0) {
        swal("Please Select Post!!!....", "", "warning");
        return false;

    }
    else if (Zone_id == 0) {
        swal("Please Select Zone!!!....", "", "warning");
        return false;

    }

    else if (reg_id == 0) {
        swal("Please Select Region!!!....", "", "warning");
        return false;

    }
    else if (div_id == 0) {
        swal("Please Select Division!!!....", "", "warning");
        return false;

    }

    else if (Area_id == 0) {
        swal("Please Select Area!!!....", "", "warning");
        return false;

    }

    else if (localBody == 0) {
        swal("Please Select Local Body!!....", "", "warning");
        return false;

    }

    else if (localBodyName == '') {
        swal("Please Enter Local Body Name!!....", "", "warning");
        return false;

    }

    else if (sqrtFeet == '') {
        swal("Please Enter Total Square Feet!!....", "", "warning");
        return false;

    }
    else if (RentPerSqrtFeet == '') {
        swal("Please Enter Rent Per Square Feet!!....", "", "warning");
        return false;

    }
    else if (AdvanceRent == '') {
        swal("Please Enter Advance Rent!!....", "", "warning");
        return false;

    }
    else if (Aggriment_dt == '') {
        swal("Please Select Agreement Date!!....", "", "warning");
        return false;

    }
    else if (EmpCode == '') {
        swal("Please Enter BH Employee Code!!....", "", "warning");
        return false;

    }
    else if (Holiday == 0) {
        swal("Please Select Branch Holiday!!....", "", "warning");
        return false;

    }
    else if (shift == 0) {
        swal("Please Select Branch Time!!....", "", "warning");
        return false;

    }

    else if (Firm == 0) {
        swal("Please Select Firm!!....", "", "warning");
        return false;

    }



    _Add_branch.AddBranch(branch_name, site_id, branch_Address, landPhone, mobile, pin, district, state, Zone_id, reg_id, div_id, Area_id, sqrtFeet, RentPerSqrtFeet, AdvanceRent, EmpCode, localBody, BranchType, localBodyName, Firm, Holiday, shift);

});


