
var _SiteDetails = {

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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", CheckAccess, _SiteDetails.checkAccessRtn, token)
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _SiteDetails.checkAccessToken, userdata.token)
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
                _SiteDetails.GetState();
                _SiteDetails.GetType();
                _SiteDetails.GetBranchType();
            }


        }

    },

    GetState: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "AddNewSite",
            pagVal: "StateLoad",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _SiteDetails.FillState, userdata.token)
    },

    FillState: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlstate").empty();

                jQuery("#ddlstate").append(jQuery("<option></option>").val("0").text("--Select--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlstate").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlstate").empty();
                jQuery("#ddlstate").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlstate").empty();
            jQuery("#ddlstate").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetRegion: function () {

        jQuery('.page-loader-wrapper').show();

        var State_id = jQuery("#ddlstate").val();


        var GetRentDetails = {
            flag: "AddNewSite",
            pagVal: "RegionLoad",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _SiteDetails.FillRegion, userdata.token)
    },

    FillRegion: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            if (response.data.queryResult.QueryResult.length > 0) {


                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlregion").empty();

                jQuery("#ddlregion").append(jQuery("<option></option>").val("0").text("--Select--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlregion").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlregion").empty();
                jQuery("#ddlregion").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
        }
        else {

            jQuery("#ddlregion").empty();
            jQuery("#ddlregion").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetDivision: function () {

        jQuery('.page-loader-wrapper').show();

        var reg_id = jQuery("#ddlregion").val();


        var GetRentDetails = {
            flag: "AddNewSite",
            pagVal: "DivisionLoad",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _SiteDetails.FillDivision, userdata.token)
    },

    FillDivision: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            if (response.data.queryResult.QueryResult.length > 0) {


                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddldivision").empty();

                jQuery("#ddldivision").append(jQuery("<option></option>").val("0").text("--Select--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddldivision").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddldivision").empty();
                jQuery("#ddldivision").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
        }
        else {

            jQuery("#ddldivision").empty();
            jQuery("#ddldivision").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },





    GetArea: function () {

        jQuery('.page-loader-wrapper').show();

        var div_id = jQuery("#ddldivision").val();


        var GetRentDetails = {
            flag: "AddNewSite",
            pagVal: "AreaLoad",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _SiteDetails.FillArea, userdata.token)
    },

    FillArea: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            if (response.data.queryResult.QueryResult.length > 0) {


                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlarea").empty();

                jQuery("#ddlarea").append(jQuery("<option></option>").val("0").text("--Select--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlarea").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlarea").empty();
                jQuery("#ddlarea").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
        }
        else {

            jQuery("#ddlarea").empty();
            jQuery("#ddlarea").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    GetType: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "AddNewSite",
            pagVal: "TypeLoad",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _SiteDetails.FillType, userdata.token)
    },

    FillType: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddltype").empty();

                jQuery("#ddltype").append(jQuery("<option></option>").val("0").text("--Select--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddltype").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddltype").empty();
                jQuery("#ddltype").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddltype").empty();
            jQuery("#ddltype").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },


    GetBranchType: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "AddNewSite",
            pagVal: "BranchTypeLoad",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _SiteDetails.FillBranchType, userdata.token)
    },

    FillBranchType: function (response) {
        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#ddlbranchtype").empty();

                jQuery("#ddlbranchtype").append(jQuery("<option></option>").val("0").text("--Select--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#ddlbranchtype").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#ddlbranchtype").empty();
                jQuery("#ddlbranchtype").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlbranchtype").empty();
            jQuery("#ddlbranchtype").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },




    //ConfirmSite(siteName, state_id, reg_id, div_id, area_id, type_id, branch_type_id)

    ConfirmSite: function (siteName, state_id, reg_id, div_id, area_id, type_id, branch_type_id) {

        jQuery('.page-loader-wrapper').show();

        var confrim = {

            flag: "AddNewSite",
            pagVal: "ConfirmSite",
            parVal: userdata.userId + 'µ' + siteName + 'µ' + state_id + 'µ' + reg_id + 'µ' + area_id + 'µ' + type_id + 'µ' + branch_type_id,
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", confrim, _SiteDetails.ConfirmsiteResponse, userdata.token)

    },


    ConfirmsiteResponse: function (response) {

        jQuery('.page-loader-wrapper').hide();

        // var str = response.data.queryResult[0].param1;
        response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));



        if (response.status == "SUCCESS") {

            var res = response.data.queryResult.QueryResult[0].Param1;
            var res_type = response.data.queryResult.QueryResult[0].Param2;

            if (res_type == 2) {

                swal({
                    title: "warning",
                    text: res,
                    type: "warning"
                },



                    function () {
                        window.location.reload(true);
                    });

            }

            else if (res_type == 1) {


                swal({
                    title: "success",
                    text: res,
                    type: "success"
                },



                    function () {
                        window.location.reload(true);
                    });

            }

        }

        else {
            swal("Error", "Error", "error");
        }

    },

}

jQuery('#ddlstate').change(function () {

    _SiteDetails.GetRegion();

    jQuery("#ddlarea").empty();
    jQuery("#ddlarea").append(jQuery("<option></option>").val("0").text("--Select--"));
    jQuery("#ddldivision").empty();
    jQuery("#ddldivision").append(jQuery("<option></option>").val("0").text("--Select--"));

});

jQuery('#ddlregion').change(function () {

    _SiteDetails.GetDivision();
    jQuery("#ddlarea").empty();
    jQuery("#ddlarea").append(jQuery("<option></option>").val("0").text("--Select--"));

});

jQuery('#ddldivision').change(function () {

    _SiteDetails.GetArea();

});

jQuery(document).ready(function ($) {

    _SiteDetails.tokenValidate();
});

jQuery('#btn_exit').click(function () {

    window.location = "Dashboard";

});




jQuery('#BtnConfirm').click(function () {

    //    jQuery('.page-loader-wrapper').hide();

    var siteName = jQuery("#Txtsite").val();
    var state_id = jQuery("#ddlstate").val();
    var reg_id = jQuery("#ddlregion").val();
    var div_id = jQuery("#ddldivision").val();
    var area_id = jQuery("#ddlarea").val();
    var type_id = jQuery("#ddltype").val();
    var branch_type_id = jQuery("#ddlbranchtype").val();


    if (siteName == '') {
        swal("Please Enter Site Name !!!....", "", "warning");
        return false;

    }
    else if (state_id == 0) {
        swal("Please Select State!!!....", "", "warning");
        return false;

    }

    else if (reg_id == 0) {
        swal("Please Select Region !!!....", "", "warning");
        return false;

    }

    else if (div_id == 0) {
        swal("Please Select Division !!!....", "", "warning");
        return false;

    }
    else if (area_id == 0) {
        swal("Please Select Area !!!....", "", "warning");
        return false;

    }
    else if (type_id == 0) {
        swal("Please Select Type !!!....", "", "warning");
        return false;

    }
    else if (branch_type_id == 0) {
        swal("Please Select Branch Type !!!....", "", "warning");
        return false;

    }


    _SiteDetails.ConfirmSite(siteName, state_id, reg_id, div_id, area_id, type_id, branch_type_id);

});









