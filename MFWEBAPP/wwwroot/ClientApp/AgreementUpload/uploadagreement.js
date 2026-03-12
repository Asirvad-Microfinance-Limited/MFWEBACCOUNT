


var _Upload_agreement = {

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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", CheckAccess, _Upload_agreement.checkAccessRtn, token)
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _Upload_agreement.checkAccessToken, userdata.token)
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


                _Upload_agreement.GetSite();


            }


        }

    },

    GetSite: function () {


        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "AGREEMENT_UPLOAD",
            pagVal: "site_load",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Upload_agreement.Fillsite, userdata.token)
    },

    Fillsite: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#sitename").empty();

                jQuery("#sitename").append(jQuery("<option></option>").val("0").text("--SELECT SITE--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#sitename").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#sitename").empty();
                jQuery("#sitename").append(jQuery("<option></option>").val("0").text("--SELECT SITE--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#sitename").empty();
            jQuery("#sitename").append(jQuery("<option></option>").val("0").text("--SELECT SITE--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    GetSiteDetails: function () {

        jQuery('.page-loader-wrapper').show();




        var site_id = jQuery("#sitename").val();
        var input = site_id.split('~');
        var old_id = input[1];


        var GetRentDetails =
        {
            flag: "AGREEMENT_UPLOAD",
            pagVal: "details_load",
            parVal: old_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _Upload_agreement.FillSiteDetails, userdata.token)
    },




    FillSiteDetails: function (response) {

        if (response.status === "SUCCESS") {


            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                var res = response.data.queryResult.QueryResult[0].Param1;

                var parts = res.split("~");

                jQuery("#sqfeet").val(parts[0]);
                jQuery("#mntrent").val(parts[1]);
                jQuery("#advamnt").val(parts[2]);
                jQuery("#fltname").val(parts[3]);

            }


            jQuery('.page-loader-wrapper').hide();
        }

        jQuery('.page-loader-wrapper').hide();
    },

    ConfirmAgreement: function (SiteName) {



        var site_id = jQuery("#sitename").val();
        var input = site_id.split('~');
        var br_id = input[1];


        jQuery('.page-loader-wrapper').show();


        var confrim = {

            flag: "AGREEMENT_UPLOAD",
            pagVal: "confirm",
            parVal: userdata.userId + 'µ' + br_id,
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", confrim, _Upload_agreement.ConfirmAgreementResponse, userdata.token)

    },

    ConfirmAgreementResponse: function (response) {


        jQuery('.page-loader-wrapper').hide();

        response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


        if (response.status == "SUCCESS") {




            _Upload_agreement.pdfupload();
            var res2 = response.data.queryResult.QueryResult[0].Param1;

            swal({
                title: "success",
                text: res2,
                type: "success"
            },



                function () {
                    window.location.reload(true);
                });

            //}

        }

        else {
            swal("Error", "Error", "error");
        }

    },





    convertToBase64: function (pdf) {
        Strbase64List = [];   // store multiple base64 strings
        DFILETYPE = "";

        var a = pdf;
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
                    jQuery('#pdfUpload').val("");
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

                    } else if (
                        base64.includes("data:image/pdf;base64")

                    ) {
                        DFILETYPE = "IMG";
                    } else {
                        swal("", "Please only upload PDFs..!", "warning");
                        jQuery('#pdfUpload').val("");
                        jQuery('#payfile').val("");
                        jQuery('#tick').hide();
                        jQuery('#close').show();
                        return false;
                    }

                    // Clean base64 string and push to list
                    var cleanBase64 = base64
                        .replace('data:application/pdf;base64,', '');

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
            swal("", "Add PDF..!", "warning");
            return false;
        }
    },

    pdfupload: function () {

        jQuery('.page-loader-wrapper').show();

        var brid = jQuery("#sitename").val();
        var input = brid.split('~');
        var br_id = input[1];

        var pdf = {

            typeId: "0",
            image: Strbase64List[0],
            collectionName: "RENT_AGREEMENT",
            fileName: "RENT_AGREEMENT",
            recordingId: br_id,
            imageType: "pdf"

        };



        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/insertimage", pdf, _Upload_agreement.pdfuploadresponse, userdata.token)

    },

    pdfuploadresponse: function (response) {


        jQuery('.page-loader-wrapper').hide();
        //response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


        if (response.status == "SUCCESS") {


            //var res = response.data.queryResult.QueryResult[0].Param1;



            swal({
                title: "success",
                text: "Approved Successfully",
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

    _Upload_agreement.tokenValidate();

});

jQuery('#sitename').change(function () {


    jQuery("#sqfeet").val('');
    jQuery("#mntrent").val('');
    jQuery("#advamnt").val('');
    jQuery("#fltname").val('');
    _Upload_agreement.GetSiteDetails();


});

jQuery('#btn_exit').click(function () {

    window.location = "Dashboard";

});

jQuery('#BtnConfirm').click(function () {

    //    jQuery('.page-loader-wrapper').hide();
    //var SquareFeet = jQuery("#sqfeet").val();
    //var MonthRent = jQuery("#mntrent").val();
    //var AdvAmnt = jQuery("#advamnt").val();

    //validation required
    var SiteName = jQuery("#sitename").val();

    var FileAttachment = jQuery("#pdfUpload").val();



    if (SiteName == '0') {
        swal("Please select Site Name !!!....", "", "warning");
        return false;

    }
    else if (FileAttachment == '') {
        swal("Please Attach Agreement!!!....", "", "warning");
        return false;

    }


    _Upload_agreement.ConfirmAgreement(SiteName);

});

jQuery('#pdfUpload').change(function (e) {
    var file = "pdfUpload";

    _Upload_agreement.convertToBase64(file);
});