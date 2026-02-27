var token = "";
//var Strbase64List = [];   // array to hold multiple base64 strings

var Strbase64List = "";   // array to hold multiple base64 strings

var DFILETYPE = "";       // optional: track file type (IMG/PDF)




var _Ah_confirmation = {

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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", CheckAccess, _Ah_confirmation.checkAccessRtn, token)
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _Ah_confirmation.checkAccessToken, userdata.token)
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


                _Ah_confirmation.GetSite();

            }


        }

    },

    GetSite: function () {

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "AH_NEW_SITE_REC",
            pagVal: "getArea",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Ah_confirmation.Fillsite, userdata.token)
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
                jQuery("#ddlsite").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#ddlsite").empty();
            jQuery("#ddlsite").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },




    GetBranchType: function () {

        jQuery('.page-loader-wrapper').show();

        var site_id = jQuery("#ddlsite").val();

        jQuery("#TxtSquarefeet").val('');
        jQuery("#TxtMonthlyrent").val('');
        jQuery("#TxtAdvAmt").val('');
        jQuery("#TxtDistance").val('');


        if (site_id == 0) {
            jQuery("#TxtbranchType").val('');

        }

        var GetRentDetails =
        {
            flag: "AH_NEW_SITE_REC",
            pagVal: "AH_GETBRTYE",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Ah_confirmation.FillBranchType, userdata.token)
    },




    FillBranchType: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                var res = response.data.queryResult.QueryResult[0].Param1;

                jQuery("#TxtbranchType").val(res);

            }
            jQuery('.page-loader-wrapper').hide();
        }

        jQuery('.page-loader-wrapper').hide();
    },




    ConfirmSite: function (branch_id, siteName, Squrfeet, Monthy_rent, AdvAmt, Distance) {

        jQuery('.page-loader-wrapper').show();

        var confrim = {

            flag: "AH_NEW_SITE_REC",
            pagVal: "AH_CONFIRM",
            parVal: branch_id + 'µ' + siteName + 'µ' + Squrfeet + 'µ' + Monthy_rent + 'µ' + AdvAmt + 'µ' + Distance + 'µ' + userdata.userId,
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", confrim, _Ah_confirmation.ConfirmsiteResponse, userdata.token)

    },

    //ConfirmsiteResponse: function (response) {


    //    jQuery('.page-loader-wrapper').hide();
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


    ConfirmsiteResponse: function (response) {


        jQuery('.page-loader-wrapper').hide();
        response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


        if (response.status == "SUCCESS") {


            _Ah_confirmation.imageupload();

        }

        else {
            swal("Error", "Error", "error");
        }

    },


    convertToBase64: function (img) {
        Strbase64List = [];   // store multiple base64 strings
        DFILETYPE = "";

        var a = img;
        var selectedFiles = document.getElementById(a).files;

        if (selectedFiles.length > 0) {
            // Loop through all selected files
            for (var i = 0; i < selectedFiles.length; i++) {
                var fileToLoad = selectedFiles[i];

                // Size check (optional)
                var sizeInKB = fileToLoad.size / 1024;
                var sizeLimit = 200;
                if (sizeInKB >= sizeLimit) {
                    swal("", "Max file size allowed is 200KB", "warning");
                    jQuery('#payfile').val("");
                    jQuery('#tick').hide();
                    jQuery('#close').show();
                    return false;
                }

                var fileReader = new FileReader();
                fileReader.onloadend = function (fileLoadedEvent) {
                    var base64 = fileLoadedEvent.target.result;

                    // Validate type
                    if (base64.includes("data:application/pdf;base64")) {
                        DFILETYPE = "PDF";
                        swal("", "Please only upload Images..!", "warning");
                        jQuery('#payfile').val("");
                        jQuery('#tick').hide();
                        jQuery('#close').show();
                        return false;
                    } else if (
                        base64.includes("data:image/jpeg;base64") ||
                        base64.includes("data:image/jpg;base64") ||
                        base64.includes("data:image/png;base64")
                    ) {
                        DFILETYPE = "IMG";
                    } else {
                        swal("", "Please only upload Images..!", "warning");
                        jQuery('#payfile').val("");
                        jQuery('#tick').hide();
                        jQuery('#close').show();
                        return false;
                    }

                    // Clean base64 string and push to list
                    var cleanBase64 = base64
                        .replace('data:image/jpeg;base64,', '')
                        .replace('data:image/jpg;base64,', '')
                        .replace('data:image/png;base64,', '');
                    Strbase64List.push(cleanBase64);

                    // Show tick if at least one valid file
                    if (Strbase64List.length > 0) {
                        jQuery('#tick').show();
                        jQuery('#close').hide();
                    }
                };

                fileReader.readAsDataURL(fileToLoad);
            }
        } else {
            swal("", "Add Image..!", "warning");
            return false;
        }
    },




    imageupload: function () {

        jQuery('.page-loader-wrapper').show();

        var brid = jQuery("#ddlsite").val();

        var image = {

            typeId: 0,
            image: Strbase64List[0],
            collectionName: "RENT_AGREEMENT",
            fileName: "RENT_AGREEMENT",
            recordingId: brid,
            imageType: "img"

        };

   

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/insertimage", image, _Ah_confirmation.imageuploadresponse, userdata.token)

    },

    imageuploadresponse: function (response) {


        jQuery('.page-loader-wrapper').hide();
        //response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


        if (response.status == "SUCCESS") {


            //var res = response.data.queryResult.QueryResult[0].Param1;



            swal({
                title: "success",
                text: "Recommended Successfully",
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

    _Ah_confirmation.tokenValidate();
    // _Ah_confirmation.GetSite();
});

jQuery('#ddlsite').change(function () {

    _Ah_confirmation.GetBranchType();

});

jQuery('#imgUpload').change(function (e) {
    var file = "imgUpload";
   
    _Ah_confirmation.convertToBase64(file);
});

jQuery('#btn_exit').click(function () {

    window.location = "Dashboard";

});


jQuery('#BtnConfirm').click(function () {

    jQuery('.page-loader-wrapper').hide();

    var branch_id = jQuery("#ddlsite").val();
    var selectedText = jQuery("#ddlsite option:selected").text();
    var parts = selectedText.split("~");
    var siteName = parts[0];
    //alert(branch_id);
    // alert(siteName);
    // var site_name== jQuery("#ddlsite").text();

    var Squrfeet = jQuery("#TxtSquarefeet").val();
    var Monthy_rent = jQuery("#TxtMonthlyrent").val();
    var AdvAmt = jQuery("#TxtAdvAmt").val();
    var Distance = jQuery("#TxtDistance").val();



    if (branch_id == 0) {
        swal("Please Select Site !!!....", "", "warning");
        return false;

    }
    else if (Squrfeet == '') {

        swal("Please Enter Square Feet!!!....", "", "warning");
        return false;

    }

    else if (Monthy_rent == '') {
        swal("Please Enter Monthly Rent !!!....", "", "warning");
        return false;

    }

    else if (AdvAmt == '') {
        swal("Please Enter Advance Amount !!!....", "", "warning");
        return false;

    }
    else if (Distance == '') {
        swal("Please Enter Distance From Main Road( KM)!!!....", "", "warning");
        return false;
    }


    else if (Strbase64List == '') {
        swal("Please Upload Photo !!!", "", "warning");
        return false;
    }

    _Ah_confirmation.ConfirmSite(branch_id, siteName, Squrfeet, Monthy_rent, AdvAmt, Distance);

});





