var Strbase64List = "";   // array to hold multiple base64 strings

var DFILETYPE = "";       // optional: track file type (IMG/PDF)


var _fzm_confirmation = {

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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", CheckAccess, _fzm_confirmation.checkAccessRtn, token)
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _fzm_confirmation.checkAccessToken, userdata.token)
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


                _fzm_confirmation.GetSite();

            }


        }

    },

    GetSite: function () {


        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "AVP_VP_SITE_APPROVAL",
            pagVal: "getArea",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _fzm_confirmation.Fillsite, userdata.token)
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


    GetSiteDetails: function () {

        jQuery('.page-loader-wrapper').show();

        var site_id = jQuery("#ddlsite").val();

        //  if (site_id == 0) {

        jQuery("#TxtSquarefeet").val('');
        jQuery("#TxtMonthlyrent").val('');
        jQuery("#TxtAdvAmt").val('');
        jQuery("#TxtDistance").val('');
        jQuery("#TxtAvgRentState").val('');
        jQuery("#TxtAvgRentdistrict").val('');

        //  }



        var GetRentDetails =
        {
            flag: "AVP_VP_SITE_APPROVAL",
            pagVal: "avpGetata",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _fzm_confirmation.FillBranchType, userdata.token)


    },




    FillBranchType: function (response) {

        if (response.status === "SUCCESS") {


            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                var res = response.data.queryResult.QueryResult[0].Param1;

                var parts = res.split("^");

                jQuery("#TxtSquarefeet").val(parts[0]);
                jQuery("#TxtMonthlyrent").val(parts[1]);
                jQuery("#TxtAdvAmt").val(parts[2]);
                jQuery("#TxtDistance").val(parts[3]);
                var sqrfeet = parts[0];
                var monthlyrent = parts[1];
                var AdvAmt = parts[2];


                _fzm_confirmation.GetSiteAvgRent(sqrfeet, monthlyrent, AdvAmt);

            }
            jQuery('.page-loader-wrapper').hide();
        }

        jQuery('.page-loader-wrapper').hide();
    },



    GetSiteAvgRent: function (sqrfeet, monthlyrent, AdvAmt, distance) {

        jQuery('.page-loader-wrapper').show();

        var site_id = jQuery("#ddlsite").val();





        var GetRentDetails =
        {
            flag: "AVP_VP_SITE_APPROVAL",
            pagVal: "GetAvgRent",
            parVal: userdata.userId + 'µ' + site_id + 'µ' + sqrfeet + 'µ' + monthlyrent + 'µ' + AdvAmt,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _fzm_confirmation.FillAvgRent, userdata.token)
    },

    FillAvgRent: function (response) {

        if (response.status === "SUCCESS") {


            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                var res = response.data.queryResult.QueryResult[0].Param1;

                var parts = res.split("^");

                jQuery("#type_id").empty();
                jQuery("#type_id").val(parts[0]);
                jQuery("#TxtAvgRentState").val(parts[1]);
                jQuery("#TxtAvgRentdistrict").val(parts[2]);


            }
            jQuery('.page-loader-wrapper').hide();
        }

        jQuery('.page-loader-wrapper').hide();
    },

    ConfirmSite: function (type_id, branch_id, siteName, AvgRentState, AvgRentDistrict, ApproveOrReject) {

       // alert(type_id + "^" + branch_id + "^" + siteName + "^" + AvgRentState + "^" + AvgRentDistrict + "^" + ApproveOrReject);

        jQuery('.page-loader-wrapper').show();


        if (ApproveOrReject == 1) {
            var parvalue = "avp_vp_confirm";
        }
        else if (ApproveOrReject == 0) {
            var parvalue = "avp_vp_reject";
        }


        var GetRentDetails =
        {
            flag: "AVP_VP_SITE_APPROVAL",
            pagVal: parvalue,
            parVal: AvgRentDistrict + 'µ' + siteName + 'µ' + userdata.userId + 'µ' + branch_id + 'µ' + type_id + 'µ' + AvgRentState,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", GetRentDetails, _fzm_confirmation.ConfirmsiteResponse, userdata.token)
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


            var res = response.data.queryResult.QueryResult[0].Param2;

            if (res == 1) {


                _fzm_confirmation.imageupload();

            }
            else
            {
                var res2 = response.data.queryResult.QueryResult[0].Param1;

                swal({
                            title: "success",
                             text: res2,
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



    viewImages: function (brid) {

        jQuery('.page-loader-wrapper').show();

        var imagedetails =
        {
            recordingId: brid,
            collectionName: "RENT_AGREEMENT"
            // "fileType": "img"

        };

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/images", imagedetails, _fzm_confirmation.viewimageresponse, userdata.token)
    },

    viewimageresponse: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {

            var max = response.data.imageData.length;
            var $image = jQuery('<img class="north" id = "rtimg" src="data:image/png;base64,' + response.data.imageData[max - 1].imageString + ' " height="450" width="50%" >');

            //var $image = jQuery('<img class="north" id = "rtimg" src="data:image/png;base64,' + response.data.imageString + ' " height="450" width="50%" >');
            jQuery('#ImageModel').modal('show');
            jQuery('#ImageDiv').html($image);

            var zoomImage = jQuery('#rtimg');
            zoomImage.imageZoom();

        }
        else {
            //jQuery('.page-loader-wrapper').hide();
            _General.noData(jQuery('#divInvimages'), "No Data Found");

        }
    },

    rotateImage1: function () {
        var img = jQuery('#rtimg1');
        if (img.hasClass('north')) {
            img.attr('class', 'west');
        } else if (img.hasClass('west')) {
            img.attr('class', 'south');
        } else if (img.hasClass('south')) {
            img.attr('class', 'east');
        } else if (img.hasClass('east')) {
            img.attr('class', 'north');
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
            collectionName: "RENT_MS95",
            fileName: "RENT_MS95",
            recordingId: brid,
            imageType: "img"

        };



        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/insertimage", image, _fzm_confirmation.imageuploadresponse, userdata.token)

    },

    imageuploadresponse: function (response) {


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



    _fzm_confirmation.tokenValidate();

});


jQuery('#ddlsite').change(function () {

    _fzm_confirmation.GetSiteDetails();


});

jQuery('#btn_exit').click(function () {

    window.location = "Dashboard";

});

jQuery('#rotate').click(function (e) {
    _fzm_confirmation.rotateImage1();
});

jQuery('#imgUpload').change(function (e) {
    var file = "imgUpload";

    _fzm_confirmation.convertToBase64(file);
});


jQuery('#BtnViewPhoto').click(function (e) {
    var brid = jQuery('#ddlsite').val();
    if (brid != 0) {
        _fzm_confirmation.viewImages(brid);
    }
    else {
        swal("Error", "Please Select a PR..!", "error");
        return false;
    }
});

jQuery('#BtnApprove').click(function () {

    jQuery('.page-loader-wrapper').hide();

    var branch_id = jQuery("#ddlsite").val();
    var selectedText = jQuery("#ddlsite option:selected").text();
    var parts = selectedText.split("~");
    var siteName = parts[0];

    var AvgRentState = jQuery("#TxtAvgRentState").val();
    var AvgRentDistrict = jQuery("#TxtAvgRentdistrict").val();
    jQuery("#type_id").empty();
    var type_id = jQuery("#type_id").val();
    var ApproveOrReject = 1;
    

    if (jQuery("#verify_yes").prop("checked") == true) {
        var photo_verification = jQuery("#verify_yes").val();
    }
    else if (jQuery("#verify_no").prop("checked") == true) {
        var photo_verification = jQuery("#verify_no").val();
    }
    else {
        var photo_verification = 0;
    }

    if (branch_id == 0) {
        swal("Please Select Site !!!", "", "warning");
        return false;
    }

    if (Strbase64List == '') {
        swal("Please Attach MS 95 !!!", "", "warning");
        return false;
    }


    if (photo_verification == 0 || photo_verification == 'No') {
        swal("Please Verify Photo !!!", "", "warning");
        return;
    }
   

    //alert(type_id);



    _fzm_confirmation.ConfirmSite(type_id, branch_id, siteName, AvgRentState, AvgRentDistrict, ApproveOrReject);

});

jQuery('#btnReject').click(function () {

    jQuery('.page-loader-wrapper').hide();

    var branch_id = jQuery("#ddlsite").val();
    var selectedText = jQuery("#ddlsite option:selected").text();
    var parts = selectedText.split("~");
    var siteName = parts[0];

    var AvgRentState = jQuery("#TxtAvgRentState").val();
    var AvgRentDistrict = jQuery("#TxtAvgRentdistrict").val();
    jQuery("#type_id").empty();
    var type_id = jQuery("#type_id").val();
    var ApproveOrReject = 0;




    if (branch_id == 0) {
        swal("Please Select Site !!!", "", "warning");
        return false;
    }



    //alert(type_id);



    _fzm_confirmation.ConfirmSite(type_id, branch_id, siteName, AvgRentState, AvgRentDistrict, ApproveOrReject);

});
