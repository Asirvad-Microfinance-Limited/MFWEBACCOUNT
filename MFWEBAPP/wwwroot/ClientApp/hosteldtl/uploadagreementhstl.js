

var _Upload_Agreement = {

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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", CheckAccess, _Upload_Agreement.checkAccessRtn, token)
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _Upload_Agreement.checkAccessToken, userdata.token)
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

                _Upload_Agreement.GetHostel();

            }


        }

    },


    GetHostel: function () {


        //jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "HOSTELUPLOADAGREEMENT",
            pagVal: "FILLHOSTEL",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _Upload_Agreement.FillHostel, userdata.token)
    },

    FillHostel: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                //jQuery('.page-loader-wrapper').hide();


                jQuery("#hostelname").empty();

                jQuery("#hostelname").append(jQuery("<option></option>").val("0").text("--Select Hostel--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#hostelname").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#hostelname").empty();
                jQuery("#hostelname").append(jQuery("<option></option>").val("0").text("--Select Hostel --"));
            }
            // jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#hostelname").empty();
            jQuery("#hostelname").append(jQuery("<option></option>").val("0").text("--Select Hostel --"));
        }
        //jQuery('.page-loader-wrapper').hide();
    },

    GetHostelDetails: function () {

        jQuery('.page-loader-wrapper').show();




        var hostel_id = jQuery("#hostelname").val();



        var GetRentDetails =
        {
            flag: "HOSTELUPLOADAGREEMENT",
            pagVal: "GETDATA",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _Upload_Agreement.FillHostelDetails, userdata.token)
    },




    FillHostelDetails: function (response) {

        if (response.status === "SUCCESS") {


            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                var res = response.data.queryResult.QueryResult[0].Param1;

                var parts = res.split("^");

                jQuery("#sqfeet").val(parts[0]);
                jQuery("#mntrent").val(parts[1]);
                jQuery("#advamnt").val(parts[2]);
                jQuery("#fltname").val(parts[3]);

            }


            jQuery('.page-loader-wrapper').hide();
        }

        jQuery('.page-loader-wrapper').hide();
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

        var hstl_id = jQuery("#hostelname").val();


        var pdf = {

            typeId: "0",
            image: Strbase64List[0],
            collectionName: "RENT_AGREEMENT",
            fileName: "RENT_AGREEMENT",
            recordingId: hstl_id,
            imageType: "pdf"

        };



        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/insertimage", pdf, _Upload_Agreement.pdfuploadresponse, userdata.token)

    },

    pdfuploadresponse: function (response) {


        jQuery('.page-loader-wrapper').hide();
        //response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


        if (response.status == "SUCCESS") {


            //var res = response.data.queryResult.QueryResult[0].Param1;



            swal({
                title: "success",
                text: "Uploaded Successfully",
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

    ConfirmAgreement: function (HostelName) {



        var hostl_id = jQuery("#hostelname").val();


        jQuery('.page-loader-wrapper').show();


        var confrim = {

            flag: "HOSTELUPLOADAGREEMENT",
            pagVal: "AGREEMENTUPLD_CONFIRM",
            parVal: userdata.userId + 'µ' + hostl_id,
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", confrim, _Upload_Agreement.ConfirmAgreementResponse, userdata.token)

    },

    ConfirmAgreementResponse: function (response) {


        jQuery('.page-loader-wrapper').hide();

        response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


        if (response.status == "SUCCESS") {




            _Upload_Agreement.pdfupload();
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

}



jQuery(document).ready(function ($) {

    _Upload_Agreement.tokenValidate();

});
jQuery('#hostelname').change(function () {

    _Upload_Agreement.GetHostelDetails();


});

jQuery('#pdfUpload').change(function (e) {
    var file = "pdfUpload";

    _Upload_Agreement.convertToBase64(file);
});

jQuery('#BtnConfirm').click(function () {

    var HostelName = jQuery("#hostelname").val();

    var FileAttachment = jQuery("#pdfUpload").val();



    if (HostelName == '0') {
        swal("Please select Hostel Name !!!....", "", "warning");
        return false;

    }
    else if (FileAttachment == '') {
        swal("Please Attach Agreement!!!....", "", "warning");
        return false;

    }


    _Upload_Agreement.ConfirmAgreement(HostelName);

});