
var Strbase64List = [];
var _Add_New_Agreement_Dtl = {

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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", CheckAccess, _Add_New_Agreement_Dtl.checkAccessRtn, token)
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _Add_New_Agreement_Dtl.checkAccessToken, userdata.token)
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

                _Add_New_Agreement_Dtl.LoadTDS();
                _Add_New_Agreement_Dtl.LoadAssignedBranchDD();
                jQuery("#TxtTDSAmount").val('0');
            }


        }

    },



    LoadCustomerById: function () {
        jQuery('.page-loader-wrapper').show();
        // Hide the card while loading new data to prevent flickering
        jQuery('#maincard').hide();

        var customer_id = jQuery("#Txtcustid").val();
        if (!customer_id) {
            jQuery('.page-loader-wrapper').hide();
            return false;
        }


        var GetRentDetails = {
            flag: "ADD_AGREEMENT",
            pagVal: "Customer_details_load_by_id",
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", encryptedData, _Add_New_Agreement_Dtl.CustDetailsFill, userdata.token)



    },

    CustDetailsFill: function (response) {

        if (response.status === "SUCCESS") {


            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                var res1 = response.data.queryResult.QueryResult[0].Param1;
                var res2 = response.data.queryResult.QueryResult[0].Param2;

                // var parts = res.split("~");

                jQuery("#Txtcustid_selected").val(res1);
                jQuery("#TxtownerName").val(res2);

            }


            jQuery('.page-loader-wrapper').hide();
        }

        jQuery('.page-loader-wrapper').hide();
    },


    LoadCustomerTable: function () {
        jQuery('.page-loader-wrapper').show();
        // Hide the card while loading new data to prevent flickering
        jQuery('#maincard').hide();

        var customer_id = jQuery("#customername").val();
        if (!customer_id) {
            jQuery('.page-loader-wrapper').hide();
            return false;
        }


        var GetRentDetails = {
            flag: "ADD_AGREEMENT",
            pagVal: "Customer_details_load",
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", encryptedData, _Add_New_Agreement_Dtl.TableLoadCompleted, userdata.token)



    },




    TableLoadCompleted: function (response) {
        jQuery('.page-loader-wrapper').hide();

        if (response && response.status === "SUCCESS") {
            jQuery('#maincard').show();
            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));

            if (response.data && response.data.queryResult.QueryResult.length > 0) {

                var allData = response.data.queryResult.QueryResult;
                var rowsPerPage = 1; // Changed to 5 for better visibility, adjust as needed
                var currentPage = 1;

                function displayTable(page) {
                    var $container = jQuery('#divcustomerdetailstable');
                    $container.empty();

                    var $table = jQuery('<table class="table" id="tblapproval">');
                    var $thead = jQuery('<thead><tr>' +
                        '<th style="text-align:center;">ACTION</th>' +
                        '<th style="text-align:center;">DOCUMENT&nbsp;NO</th>' +
                        '<th style="text-align:center;">CUST&nbsp;ID</th>' +
                        '<th style="text-align:center;">CUST&nbsp;NAME</th>' +
                        '<th style="text-align:center;">ADDRESS</th>' +
                        '<th style="text-align:center;">FATHER-HUS</th>' +
                        '<th style="text-align:center;">LOCALITY</th>' +
                        '<th style="text-align:center;">POST&nbsp;OFFICE</th>' +
                        '<th style="text-align:center;">DISTRICT</th>' +
                        '<th style="text-align:center;">PHONE&nbsp;NO</th>' +
                        '<th style="text-align:center;">PIN&nbsp;CODE</th>' +
                        '</tr></thead>');

                    var $tbody = jQuery('<tbody>');

                    var start = (page - 1) * rowsPerPage;
                    var end = start + rowsPerPage;
                    var paginatedItems = allData.slice(start, end);

                    jQuery.each(paginatedItems, function (i, val) {
                        var datas = val.Param1.split('^');
                        var $row = jQuery('<tr/>');

                        // --- FIX APPLIED HERE ---
                        // Added type="button" to prevent form submission
                        var $selectBtn = jQuery('<button type="button" class="btn btn-secondary btn-custom">Select</button>')
                            .click(function (e) {
                                e.preventDefault(); // Extra precaution against redirect
                                jQuery('#Txtcustid_selected').val(datas[1]);
                                jQuery('#TxtownerName').val(datas[2]); // Changed index to 2 assuming Name is there
                                /* jQuery('#Txtcustid_powerofattny').val(datas[1]);*/
                                // Optional: Scroll to textboxes so user sees the change
                                jQuery('html, body').animate({
                                    scrollTo: jQuery("#Txtcustid_selected").offset().top - 100
                                }, 500);
                            });

                        $row.append(jQuery('<td align="center">').append($selectBtn));

                        for (var j = 0; j < 10; j++) {
                            $row.append(jQuery('<td align="center">').html(datas[j] || ""));
                        }

                        $tbody.append($row);
                    });

                    $table.append($thead).append($tbody);
                    $container.append($table);

                    renderPaginationControls($container, page);
                }

                function renderPaginationControls($container, activePage) {
                    var totalPages = Math.ceil(allData.length / rowsPerPage);
                    var $pager = jQuery('<div class="mt-3 text-center">');

                    for (var i = 1; i <= totalPages; i++) {
                        // Added type="button" here as well
                        var $btn = jQuery('<button type="button" class="btn btn-secondary btn-custom btn-sm mx-1">' + i + '</button>');
                        if (i === activePage) $btn.addClass('active');

                        $btn.click((function (pageIndex) {
                            return function (e) {
                                e.preventDefault();
                                displayTable(pageIndex);
                            };
                        })(i));

                        $pager.append($btn);
                    }
                    $container.append($pager);
                }

                displayTable(1);

            } else {
                jQuery('#divcustomerdetailstable').empty();
                _General.noData(jQuery('#divcustomerdetailstable'), "No Data Found");
            }
        }
        else if (response && response.status === "AUTHERROR") {
            window.location.href = DOMAIN_URL + "?Id=1";
        }
        else {
            jQuery('#divcustomerdetailstable').empty();
            _General.noData(jQuery('#divcustomerdetailstable'), "API Error or No Response");
        }
    },

    LoadAssignedBranchDD: function () {

        jQuery('.page-loader-wrapper').show();
        // Hide the card while loading new data to prevent flickering
        jQuery('#maincard').hide();


        var GetRentDetails = {
            flag: "ADD_AGREEMENT",
            pagVal: "Assigned_branch_DD_Load",
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", encryptedData, _Add_New_Agreement_Dtl.AssignedBranchDDFill, userdata.token)



    },

    AssignedBranchDDFill: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#TxtDD").empty();

                jQuery("#TxtDD").append(jQuery("<option></option>").val("0").text("--Select--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#TxtDD").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#TxtDD").empty();
                jQuery("#TxtDD").append(jQuery("<option></option>").val("0").text("--Select--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#TxtDD").empty();
            jQuery("#TxtDD").append(jQuery("<option></option>").val("0").text("--Select--"));
        }
        jQuery('.page-loader-wrapper').hide();
    },

    LoadTDS: function () {
        jQuery('.page-loader-wrapper').show();
        // Hide the card while loading new data to prevent flickering
        jQuery('#maincard').hide();


        var GetRentDetails = {
            flag: "ADD_AGREEMENT",
            pagVal: "TDS_Category_Load",
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", encryptedData, _Add_New_Agreement_Dtl.TDSFill, userdata.token)



    },

    TDSFill: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                jQuery('.page-loader-wrapper').hide();


                jQuery("#tdscategory").empty();

                jQuery("#tdscategory").append(jQuery("<option></option>").val("0").text("--Select TDS Category--"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#tdscategory").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#tdscategory").empty();
                jQuery("#tdscategory").append(jQuery("<option></option>").val("0").text("--Select TDS Category--"));
            }
            jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#tdscategory").empty();
            jQuery("#tdscategory").append(jQuery("<option></option>").val("0").text("--Select TDS Category--"));
        }
        jQuery('.page-loader-wrapper').hide();
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
                    jQuery('#imgUpload').val("");
                    jQuery('#legalApprv').val("");
                    jQuery('#bankPass').val("");
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
                        jQuery('#imgUpload').val("");
                        jQuery('#legalApprv').val("");
                        jQuery('#bankPass').val("");
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
                        jQuery('#imgUpload').val("");
                        jQuery('#legalApprv').val("");
                        jQuery('#bankPass').val("");
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

        var brid = jQuery("#Txtbranch").val();

        var image = {

            typeId: 0,
            image: Strbase64List[0],
            collectionName: "ROUGH_DRAFT",
            fileName: "ROUGH_DRAFT",
            recordingId: brid,
            imageType: "img"

        };



        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/insertimage", image, _Add_New_Agreement_Dtl.imageuploadresponse, userdata.token)

    },

    imageupload1: function () {

        jQuery('.page-loader-wrapper').show();

        var brid = jQuery("#Txtbranch").val();

        var image = {

            typeId: 0,
            image: Strbase64List[0],
            collectionName: "LEGAL_APPROVAL",
            fileName: "LEGAL_APPROVAL",
            recordingId: brid,
            imageType: "img"

        };



        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/insertimage", image, _Add_New_Agreement_Dtl.imageuploadresponse, userdata.token)

    },

    imageupload2: function () {

        jQuery('.page-loader-wrapper').show();

        var brid = jQuery("#Txtbranch").val();

        var image = {

            typeId: 0,
            image: Strbase64List[0],
            collectionName: "BANK_PASSBOOK",
            fileName: "BANK_PASSBOOK",
            recordingId: brid,
            imageType: "img"

        };



        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/insertimage", image, _Add_New_Agreement_Dtl.imageuploadresponse, userdata.token)

    },

    imageuploadresponse: function (response) {


        jQuery('.page-loader-wrapper').hide();
        //response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


        if (response.status == "SUCCESS") {


            //var res = response.data.queryResult.QueryResult[0].Param1;



            //swal({
            //    title: "success",
            //    text: "Added Successfully",
            //    type: "success"
            //},



            //    function () {
            //        window.location = "ADD_NEW_AGREEMENT";
            //    });


        }

        else {
            swal("Error", "Error", "error");
        }

    },

    LoadTDSRate: function () {
        jQuery('.page-loader-wrapper').show();
        // Hide the card while loading new data to prevent flickering
        jQuery('#maincard').hide();

        var tdscat_id = jQuery("#tdscategory").val();



        var GetRentDetails = {
            flag: "ADD_AGREEMENT",
            pagVal: "TDS_Rate",
            parVal: tdscat_id,
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", encryptedData, _Add_New_Agreement_Dtl.TDSRateFill, userdata.token)



    },

    TDSRateFill: function (response) {

        if (response.status === "SUCCESS") {


            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                var res = response.data.queryResult.QueryResult[0].Param1;
                //var res2 = response.data.queryResult.QueryResult[0].Param2;

                // var parts = res.split("~");

                jQuery("#TxtTDSAmount").val(res);


            }


            jQuery('.page-loader-wrapper').hide();
        }

        jQuery('.page-loader-wrapper').hide();
    },

    ConfirmAgreement: function (Branch_Id, Category_ID, building_id, Capacity, AdvanceAmnt, Brokerage, MonthlyInstallment, SquareFeet, Floor, StrongRoom, RentPeriod, EffectiveDt, RenewPeriod, SiteIdentifier, EmpCode, OptRenewal, BlockPeriod, IncreasePercentage, InitialDt, cust_id, net_payablerent, security_dep, water_bill, maintenance_chrg, service_tax, tds_category, tds_amnt, PowerOfAttorney, prepayed_rent) {



        //alert(Branch_Id + 'µ' + Category_ID + 'µ' + building_id + 'µ' + Capacity + 'µ' + AdvanceAmnt + 'µ' + Brokerage + 'µ' + MonthlyInstallment + 'µ' + 'D' + 'µ' + SquareFeet + 'µ' + Floor + 'µ' + StrongRoom + 'µ' + RentPeriod + 'µ' + EffectiveDt + 'µ' + RenewPeriod + 'µ' + SiteIdentifier + 'µ' + EmpCode + 'µ' + 0 + 'µ' + 0 + 'µ' + OptRenewal + 'µ' + BlockPeriod + 'µ' + IncreasePercentage + 'µ' + InitialDt + 'µ' + cust_id + 'µ' + net_payablerent + 'µ' + security_dep + 'µ' + water_bill + 'µ' + maintenance_chrg + 'µ' + service_tax + 'µ' + tds_category + 'µ' + 0 + 'µ' + tds_amnt + 'µ' + PowerOfAttorney + 'µ' + userdata.userId + 'µ' + 3 + 'µ' + 0);

        jQuery('.page-loader-wrapper').show();

        var confrim = {

            flag: "ADD_AGREEMENT",
            pagVal: "agreement_confirm",
            ////       1               2                    3                    4                     5                6                 7                      8               9               10             11                 12                 13                  14                    15                 16            17          18            19                 20                  21                        22               23                  24                   25                  26                    27                       28                 29              30             31                32                       33                 34        35(prepaid rent)
            parVal: Branch_Id + 'µ' + Category_ID + 'µ' + building_id + 'µ' + Capacity + 'µ' + AdvanceAmnt + 'µ' + Brokerage + 'µ' + MonthlyInstallment + 'µ' + 'D' + 'µ' + SquareFeet + 'µ' + Floor + 'µ' + StrongRoom + 'µ' + RentPeriod + 'µ' + EffectiveDt + 'µ' + RenewPeriod + 'µ' + SiteIdentifier + 'µ' + EmpCode + 'µ' + 0 + 'µ' + 0 + 'µ' + OptRenewal + 'µ' + BlockPeriod + 'µ' + IncreasePercentage + 'µ' + InitialDt + 'µ' + cust_id + 'µ' + net_payablerent + 'µ' + security_dep + 'µ' + water_bill + 'µ' + maintenance_chrg + 'µ' + service_tax + 'µ' + tds_category + 'µ' + 0 + 'µ' + tds_amnt + 'µ' + PowerOfAttorney + 'µ' + userdata.userId + 'µ' + 3 + 'µ' + prepayed_rent,
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentBranchQueries", confrim, _Add_New_Agreement_Dtl.ConfirmAgreementResponse, userdata.token)
    },

    ConfirmAgreementResponse: function (response) {

        jQuery('.page-loader-wrapper').hide();

        // var str = response.data.queryResult[0].param1;
        response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));



        if (response.status == "SUCCESS") {


            var res = response.data.queryResult.QueryResult[0].Param1;

            _Add_New_Agreement_Dtl.imageupload();
            _Add_New_Agreement_Dtl.imageupload1();
            _Add_New_Agreement_Dtl.imageupload2();



            swal({
                title: "success",
                text: res,
                type: "success"
            },



                function () {

                    window.location = "ADD_NEW_AGREEMENT";
                    /*window.location.reload(true);*/
                });



        }

        else {
            swal("Error", "Error", "error");
        }

    },

}

jQuery(document).ready(function ($) {

    _Add_New_Agreement_Dtl.tokenValidate();


    // 1. Retrieve using the keys defined on Page 1
    var savedCategory = sessionStorage.getItem("categoryname");
    var savedBranch = sessionStorage.getItem("branchname");
    var savedFlat = sessionStorage.getItem("flat");

    console.log("Category:", savedCategory);
    console.log("Branch:", savedBranch);
    console.log("Flat:", savedFlat);

    // 2. Populate the fields if data exists
    if (savedBranch) {
        $('#Txtbranch').val(savedBranch);
    }

    if (savedCategory) {
        $('#Txtcategory').val(savedCategory);
    }

    if (savedFlat) {
        $('#Txtbuilding').val(savedFlat);
    }

});

jQuery('#radio_cust_id').click(function () {
    jQuery('#customer_id').show();
    jQuery('#customer_name').hide();
    jQuery("#gen").hide();
    jQuery("#customername").hide();
    jQuery("#Txtcustid").show();

    jQuery("#customername").val('');
    jQuery('#divcustomerdetailstable').empty();
    jQuery('#maincard').hide();
    jQuery("#Txtcustid_selected").val('');
    jQuery("#TxtownerName").val('');



});

jQuery('#radio_cust_name').click(function () {
    jQuery('#customer_id').hide();
    jQuery('#customer_name').show();
    jQuery("#gen").show();
    jQuery("#customername").show();
    jQuery("#Txtcustid").hide();
    jQuery("#customer_id").val('');
    jQuery("#Txtcustid_selected").val('');
    jQuery("#TxtownerName").val('');

});

jQuery("#BtnSearchCustomer").click(function () {


    if (jQuery("#radio_cust_id").prop("checked") == true) {
        var cust_search = jQuery("#radio_cust_id").val();

    }


    else if (jQuery("#radio_cust_name").prop("checked") == true) {
        var cust_search = jQuery("#radio_cust_name").val();
    }


    if (cust_search == 1) {

        _Add_New_Agreement_Dtl.LoadCustomerById();
    }
    else if (cust_search == 2) {
        _Add_New_Agreement_Dtl.LoadCustomerTable();
    }

});

//function totalRent() {

//    var month_rent_first_page = sessionStorage.getItem("total_rent");


//    var rent_charge = parseFloat(jQuery("#TxttotalMonthRent").val()) || 0;
//    var maintance = parseFloat(jQuery("#TxtMaintenenceCharge").val()) || 0;
//    var water = parseFloat(jQuery("#TxtWaterBill").val()) || 0;
//    var service_charge = parseFloat(jQuery("#TxtServiceTax").val()) || 0;

//    var total = rent_charge + maintance + water ;

//    // 2. Correct way to check if checkbox is ticked
//    if (jQuery("#chkServiceTax").is(':checked')) {
//        total += service_charge;
//    }

//    // 3. Format and update the fields
//    var finalTotal = total.toFixed(2);
//    //alert(finalTotal);


//    if (total > month_rent_first_page) {
//        swal("Rent Amount Exceeds The Limit!!!\nTotal Rent Sanctioned: " + month_rent_first_page, "", "warning");
//        return false;
//    }
//    else
//    {
//        jQuery("#TxtTotalMonthlyRent").val(finalTotal);
//        jQuery('#TxtNetPayableRent').val(finalTotal);
//    }



//}

function totalRent(element) { // Added 'element' parameter

    var month_rent_first_page = parseFloat(sessionStorage.getItem("total_rent")) || 0;

    var rent_charge = parseFloat(jQuery("#TxttotalMonthRent").val()) || 0;
    var maintance = parseFloat(jQuery("#TxtMaintenenceCharge").val()) || 0;
    var water = parseFloat(jQuery("#TxtWaterBill").val()) || 0;
    var tds = parseFloat(jQuery("#TxtTDSAmount").val()) || 0;

    var total = rent_charge + maintance + water;

    if (jQuery("#chkServiceTax").is(':checked')) {

        var maintance = (parseFloat(jQuery("#TxtMaintenenceCharge").val()) || 0) * 0.10;

        jQuery("#TxtServiceTax").val(maintance);

        var service_charge = parseFloat(jQuery("#TxtServiceTax").val()) || 0;

        total += service_charge;
    }

    var finalTotal = total.toFixed(2);

    if (total > month_rent_first_page) {
        // Show the alert
        swal("Rent Amount Exceeds The Limit!!!\nTotal Rent Sanctioned: " + month_rent_first_page, "", "warning");

        // Clear the specific textbox that triggered the change
        //if (element) {
        //    jQuery(element).val('');
        //}
        jQuery("#TxttotalMonthRent").val('');
        jQuery("#TxtMaintenenceCharge").val('');
        jQuery("#TxtWaterBill").val('');


        // Recalculate totals as 0 (or previous valid state) to keep UI consistent
        jQuery("#TxtTotalMonthlyRent").val('');
        jQuery('#TxtNetPayableRent').val('');

        return false;
    }
    else {
        jQuery("#TxtTotalMonthlyRent").val(finalTotal);

        var net = finalTotal - tds;

        jQuery('#TxtNetPayableRent').val(net);
    }


}



jQuery('#TxtSequrityDeposit').change(function (e)
{


    var seciritu_depositFirstPage=parseFloat(sessionStorage.getItem("security_deposit"));
  
    var security_dep_currentPage = parseFloat(jQuery("#TxtSequrityDeposit").val());

    if (security_dep_currentPage > seciritu_depositFirstPage)
    {
        swal("Advance Amount Exceeds The Limit\nTotal Advance Sanctioned: " + seciritu_depositFirstPage, "", "warning");
        jQuery("#TxtSequrityDeposit").val('');

    }


});


jQuery('#imgUpload').change(function (e) {
    var file = "imgUpload";

    _Add_New_Agreement_Dtl.convertToBase64(file);
});

jQuery('#legalApprv').change(function (e) {
    var file = "legalApprv";

    _Add_New_Agreement_Dtl.convertToBase64(file);
});

jQuery('#bankPass').change(function (e) {
    var file = "bankPass";

    _Add_New_Agreement_Dtl.convertToBase64(file);
});

jQuery('#btn_exit').click(function () {

    window.location = "Dashboard";

});

jQuery('#BtnConfirm1').click(function () {

    var branch_id = jQuery("#Txtbranch").val();
    var category_id = jQuery("#Txtcategory").val();
    var building_id = jQuery("#Txtbuilding").val();
    if (jQuery("#radio_cust_id").prop("checked") == true) {
        var customer_opt = jQuery("#radio_cust_id").val();

    }
    else if (jQuery("#radio_cust_name").prop("checked") == true) {
        var customer_opt = jQuery("#radio_cust_name").val();
    }
    else {
        var customer_opt = 0;
    }
    var cust_id = jQuery("#Txtcustid_selected").val();
    var cust_name = jQuery("#customername").val();
    var selected_cust_id = jQuery("#Txtcustid_selected").val();
    var owner_name = jQuery("#TxtownerName").val();
    var month_rent = jQuery("#TxttotalMonthRent").val();
    var security_dep = jQuery("#TxtSequrityDeposit").val();
    var maintenance_chrg = jQuery("#TxtMaintenenceCharge").val();
    var water_bill = jQuery("#TxtWaterBill").val();
    var service_tax = jQuery("#TxtServiceTax").val();
    var tot_monthrent = jQuery("#TxtTotalMonthlyRent").val();
    var tds_category = jQuery("#tdscategory").val();
    var tds_amnt = jQuery("#TxtTDSAmount").val();
    var net_payablerent = jQuery("#TxtNetPayableRent").val();
    var advance_dd = jQuery("#TxtDD").val();
    var PowerOfAttorney = jQuery("#Txtcustid_powerofattny").val();


    var Branch_Id = sessionStorage.getItem("barnch");
    var Category_ID = sessionStorage.getItem("category");
    var Capacity = sessionStorage.getItem("capacity");
    var AdvanceAmnt = sessionStorage.getItem("security_deposit");
    var Brokerage = sessionStorage.getItem("brokerage");
    var MonthlyInstallment = sessionStorage.getItem("total_rent");
    var SquareFeet = sessionStorage.getItem("sqrFeet");
    var Floor = sessionStorage.getItem("floor");
    var StrongRoom = sessionStorage.getItem("strong_room");
    var RentPeriod = sessionStorage.getItem("rent_period");
    var EffectiveDt = sessionStorage.getItem("effective_dt");
    var RenewPeriod = sessionStorage.getItem("enhancement_prd");
    var SiteIdentifier = sessionStorage.getItem("site_identifier");
    var EmpCode = sessionStorage.getItem("emp_code");
    var OptRenewal = sessionStorage.getItem("renwwal_option");
    var BlockPeriod = sessionStorage.getItem("prd_block");
    var IncreasePercentage = sessionStorage.getItem("percentage_increase");
    var InitialDt = sessionStorage.getItem("initailAgreeDate");

    if (month_rent == '') {
        swal("Please Enter Monthly Rent !!!....", "", "warning");
        return false;
    }

    if (security_dep == '') {
        swal("Please Enter Security Deposite !!!....", "", "warning");
        return false;
    }

    if (tds_category == '0') {
        swal("Please Select TDS Category !!!....", "", "warning");
        return false;
    }

    var isChecked = jQuery("#chkRentPaidAdvance").prop("checked");

    if (isChecked) {
        var prepayed_rent = 'T';
    }
    else
    {
        var prepayed_rent = 'F';
    }


    _Add_New_Agreement_Dtl.ConfirmAgreement(Branch_Id, Category_ID, building_id, Capacity, AdvanceAmnt, Brokerage, MonthlyInstallment, SquareFeet, Floor, StrongRoom, RentPeriod, EffectiveDt, RenewPeriod, SiteIdentifier, EmpCode, OptRenewal, BlockPeriod, IncreasePercentage, InitialDt, cust_id, net_payablerent, security_dep, water_bill, maintenance_chrg, service_tax, tds_category, tds_amnt, PowerOfAttorney, prepayed_rent);
});


jQuery("#chkServiceTax").on("change", function () {
    if (jQuery("#chkServiceTax").checked)
    {

        var maintance = (parseFloat(jQuery("#TxtMaintenenceCharge").val()) || 0) * 0.10;

        jQuery("#TxtServiceTax").val(maintance);

    }
    else
    {
        jQuery("#TxtServiceTax").val('0'); // Hide it
    }

    // Always call total calculation after toggling
    totalRent(this);
});