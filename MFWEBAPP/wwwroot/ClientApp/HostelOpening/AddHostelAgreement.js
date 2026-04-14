


jQuery(document).ready(function ($) {

    _AddAgreement.tokenValidate();

});
var _AddAgreement = {

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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", CheckAccess, _AddAgreement.checkAccessRtn, token)
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/UserSession", CheckToken, _AddAgreement.checkAccessToken, userdata.token)
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


                _AddAgreement.GetCategory();
                _AddAgreement.GetCustomer();

            }


        }

    },


    GetCategory: function () {


        //jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "Hostel_Add_Agree",
            pagVal: "fillCat",
            //parVal: "" ,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _AddAgreement.FillCategory, userdata.token)
    },

    FillCategory: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                //jQuery('.page-loader-wrapper').hide();


                jQuery("#DdlHostelCategory").empty();

                jQuery("#DdlHostelCategory").append(jQuery("<option></option>").val("0").text("--Select Category --"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#DdlHostelCategory").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#DdlHostelCategory").empty();
                jQuery("#DdlHostelCategory").append(jQuery("<option></option>").val("0").text("--Select Category --"));
            }
            // jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#DdlHostelCategory").empty();
            jQuery("#DdlHostelCategory").append(jQuery("<option></option>").val("0").text("--Select Category --"));
        }
        //jQuery('.page-loader-wrapper').hide();
    },


    GetCustomer: function () {


        //jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "Hostel_Add_Agree",
            pagVal: "fillcustomer",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _AddAgreement.FillCustomer, userdata.token)
    },

    FillCustomer: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                //jQuery('.page-loader-wrapper').hide();


                jQuery("#DdlCustomer").empty();

                jQuery("#DdlCustomer").append(jQuery("<option></option>").val("0").text("--Select Customer --"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#DdlCustomer").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#DdlCustomer").empty();
                jQuery("#DdlCustomer").append(jQuery("<option></option>").val("0").text("--Select Customer --"));
            }
            // jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#DdlCustomer").empty();
            jQuery("#DdlCustomer").append(jQuery("<option></option>").val("0").text("--Select Customer --"));
        }
        //jQuery('.page-loader-wrapper').hide();
    },


    GetHostel: function () {


        //jQuery('.page-loader-wrapper').show();
        var category = jQuery("#DdlHostelCategory").val();

        var GetRentDetails =
        {
            flag: "Hostel_Add_Agree",
            pagVal: "fillHostel",
            parVal: category,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _AddAgreement.FillHostel, userdata.token)
    },

    FillHostel: function (response) {

        if (response.status === "SUCCESS") {

            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                //jQuery('.page-loader-wrapper').hide();


                jQuery("#DdlHostel").empty();

                jQuery("#DdlHostel").append(jQuery("<option></option>").val("0").text("--Select Hostel --"));
                jQuery.each(response.data.queryResult.QueryResult, function (i, val) {
                    jQuery("#DdlHostel").append(jQuery("<option></option>").val(val.Param1).text(val.Param2));


                });
            }
            else {
                jQuery("#DdlHostel").empty();
                jQuery("#DdlHostel").append(jQuery("<option></option>").val("0").text("--Select Hostel --"));
            }
            // jQuery('.page-loader-wrapper').hide();
        }
        else {

            jQuery("#DdlHostel").empty();
            jQuery("#DdlHostel").append(jQuery("<option></option>").val("0").text("--Select Hostel --"));
        }
        //jQuery('.page-loader-wrapper').hide();
    },


    GetHostelDetails: function () {

        var hostel_id = jQuery("#DdlHostel").val();

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "Hostel_Add_Agree",
            pagVal: "getRentDtl",
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _AddAgreement.FillHostelDetails, userdata.token)

    },


    FillHostelDetails: function (response) {

        if (response.status === "SUCCESS") {


            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                var res = response.data.queryResult.QueryResult[0].Param1;



                var parts = res.split("^");


                jQuery("#txtMonthlyRent").val(parts[0]);
                jQuery("#txtSecurityDeposit").val(parts[1]);
                jQuery("#txtAgreemetDt").val(parts[2]);
                jQuery("#txtAgreeEndDt").val(parts[3]);
              

            }
            jQuery('.page-loader-wrapper').hide();
        }

        jQuery('.page-loader-wrapper').hide();
    },


    GetCustomerDetails: function () {

        var cust_id = jQuery("#DdlCustomer").val();

        jQuery('.page-loader-wrapper').show();


        var GetRentDetails =
        {
            flag: "Hostel_Add_Agree",
            pagVal: "getcust",
            parVal: cust_id,
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


        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", GetRentDetails, _AddAgreement.FillCustomerDetails, userdata.token)

    },


    FillCustomerDetails: function (response) {

        if (response.status === "SUCCESS") {


            response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));


            if (response.data.queryResult.QueryResult.length > 0) {

                var res = response.data.queryResult.QueryResult[0].Param1;



                var parts = res.split("^");


                jQuery("#txtCustId").val(parts[0]);
                jQuery("#txtCustName").val(parts[1]);
               


            }
            jQuery('.page-loader-wrapper').hide();
        }

        jQuery('.page-loader-wrapper').hide();
    },


    Submit_Agreement: function (category, hostel, CustomerDetails) {

      


        // 1. Correct the property access using 'item.'
        var CustDataString = CustomerDetails.map(function (item) {
            // You must use item.PropertyName
            return item.Customer_id + "$" + item.Customer_name + "$" + item.Rent + "$" + item.Advance;
        }).join("@");

        // 2. Alert the result to verify

     

        var input = hostel + 'µ' + userdata.userId + 'µ' + CustDataString ;
       

        var confrim = {

            flag: "Hostel_Add_Agree",
            pagVal: "Add_New_Hostel_Agreement",
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/RentHostelQueries", confrim, _AddAgreement.SubmitResponse, userdata.token)

    },


    SubmitResponse: function (response) {

        jQuery('.page-loader-wrapper').hide();

        // var str = response.data.queryResult[0].param1;
        response.data.queryResult = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));



        if (response.status == "SUCCESS") {

            var res = response.data.queryResult.QueryResult[0].Param1;

            var res2 = response.data.queryResult.QueryResult[0].Param2;

           // SubmitResponse(res, res2);
            if (res2 == 1) {
                swal({
                    title: "Success",
                    text: res || "Agreement Added Successfully",
                    type: "success",
                    showConfirmButton: true
                }, function () {
                    // This is the callback for SweetAlert v1
                    window.location.reload(true);
                });
            }
            else if (res2 == 0) {
                swal({
                    title: "Already Added",
                    text: "This record already exists.",
                    type: "warning",
                    showConfirmButton: true
                }, function () {
                    window.location.reload(true);
                });
            }

        }

        else {
            swal("Error", "Error", "error");
        }

    },


}



jQuery('#BtnConfirm').click(function () {
    var category = jQuery("#DdlHostelCategory").val();
    var hostel = jQuery("#DdlHostel").val();

    // 1. Validations
    if (category == 0) {
        swal("Please Select Category !!!....", "", "warning");
        return false;
    }
    if (hostel == 0) {
        swal("Please Select Hostel !!!....", "", "warning");
        return false;
    }

    // 2. Check if table has data (excluding the total row)
    var dataRows = jQuery("#tblCustomerDetails tbody tr").not("#rowTotal");
    if (dataRows.length === 0) {
        swal("Please Add Customer Details!!!", "", "warning");
        return false;
    }

    var CustomerDetails = [];

    // 3. Iterate through data rows only
    dataRows.each(function () {
        var row = jQuery(this);

        CustomerDetails.push({
            // Use specific classes to ensure you get the right data
            Customer_id: row.find("td:eq(0)").text().trim(),
            Customer_name: row.find("td:eq(1)").text().trim(),
            Rent: row.find(".td-rent").text().trim(), // Better than eq(2)
            Advance: row.find(".td-deposit").text().trim() // Better than eq(3)
        });
    });

    // 4. Submit
    console.log("Submitting Data: ", CustomerDetails); // Debugging line
    _AddAgreement.Submit_Agreement(category, hostel, CustomerDetails);
});


jQuery('#DdlHostelCategory').change(function () {


    _AddAgreement.GetHostel();
  

});

jQuery('#DdlHostel').change(function () {


    _AddAgreement.GetHostelDetails();


});

jQuery('#DdlCustomer').change(function () {


    _AddAgreement.GetCustomerDetails();


});


jQuery('#BtnAdd').click(function () {


    AddCustomer();


});

jQuery('#btn_exit').click(function () {

    window.location = "Dashboard";

});



function SubmitResponse(res, res2) {
    if (res2 == 1) {
        swal({
            title: "Success",
            text: res || "Agreement Added Successfully",
            type: "success",
            showConfirmButton: true
        }, function () {
            // This is the callback for SweetAlert v1
            window.location.reload(true);
        });
    }
    else if (res2 == 0) {
        swal({
            title: "Already Added",
            text: "This record already exists.",
            type: "warning",
            showConfirmButton: true
        }, function () {
            window.location.reload(true);
        });
    }
}

function AddCustomer() {
    // 1. Get Values from inputs
    const category = jQuery("#DdlHostelCategory").val().trim();
    const hostel = jQuery("#DdlHostel").val().trim();
    const custId = jQuery("#txtCustId").val().trim();
    const custName = jQuery("#txtCustName").val().trim();
    const rentInput = parseFloat(jQuery("#txtMontRent_input").val()) || 0;
    const depositInput = parseFloat(jQuery("#txtSecurityDeposit_input").val())|| 0 ;

    // 2. Get Limits from top section
    const maxRentLimit = parseFloat(jQuery("#txtMonthlyRent").val()) || 0;
    const maxDepositLimit = parseFloat(jQuery("#txtSecurityDeposit").val()) || 0;

    // 3. Basic Validation
    if (category == "0") {

        swal("Please select Category !!!....", "", "warning");
       
        return;
    }

    if (hostel == "0") {
        swal("Please select Hostel !!!....", "", "warning");
        return;
    }

    if (jQuery("#DdlCustomer").val() == "0" || custId === "") {
        swal("Please select a valid customer !!!....", "", "warning");
        return;
    }

    // --- UPDATED LOGIC: Both cannot be zero, but one can be ---
    if (rentInput <= 0 && depositInput <= 0) {
        swal("Please enter a valid amount for  Monthly Rent , Security Deposit !!!....", "", "warning");
        return;
    }
    // 4. Calculate current totals in the table to check against limits
    let currentTotalRent = 0;
    let currentTotalDeposit = 0;

    jQuery("#tblCustomerDetails tbody tr").each(function () {
        currentTotalRent += parseFloat(jQuery(this).find(".td-rent").text()) || 0;
        currentTotalDeposit += parseFloat(jQuery(this).find(".td-deposit").text()) || 0;
    });

    // 5. Limit Validation
    if ((currentTotalRent + rentInput) > maxRentLimit) {
        swal("Error: Total Monthly Rent exceeds the limit of " + maxRentLimit, "", "warning");

        jQuery("#txtMontRent_input").val("");
        return;
    }

    if ((currentTotalDeposit + depositInput) > maxDepositLimit) {
        swal("Error: Total Security Deposit exceeds the limit of " + maxDepositLimit, "", "warning");

        jQuery("#txtSecurityDeposit_input").val("");
        return;
    }

    // 6. Append Row to Table
    const newRow = `
            <tr>
                <td style="text-align:center;">${custId}</td>
                <td>${custName}</td>
                <td class="td-rent text-right">${rentInput.toFixed(2)}</td>
                <td class="td-deposit text-right">${depositInput.toFixed(2)}</td>
                <td class="text-center">
                    <button type="button" class="btn btn-danger btn-sm btnDelete">Delete</button>
                </td>
            </tr>`;

    jQuery("#tblCustomerDetails tbody").append(newRow);

    // 7. Update Totals Row
    updateTableTotals();
    toggleTableVisibility();
    // 8. Clear Entry Inputs
    jQuery("#txtCustId, #txtCustName, #txtMontRent_input, #txtSecurityDeposit_input").val("");
    jQuery("#DdlCustomer").val("0");
}

/**
 * Event handler for deleting a row
 */
jQuery(document).on("click", ".btnDelete", function () {
    if (confirm("Are you sure you want to remove this customer?")) {
        jQuery(this).closest("tr").remove();

        // Re-calculate totals after a row is removed
        updateTableTotals();
        toggleTableVisibility();
    }
});



function updateTableTotals() {
    let totalRent = 0;
    let totalDeposit = 0;

    // 1. Calculate totals from all rows EXCEPT the total row itself
    jQuery("#tblCustomerDetails tbody tr").not("#rowTotal").each(function () {
        totalRent += parseFloat(jQuery(this).find(".td-rent").text()) || 0;
        totalDeposit += parseFloat(jQuery(this).find(".td-deposit").text()) || 0;
    });

    // 2. Define the HTML for the total row
    // We give it a specific ID so we can find it later
    const footerHtml = `
        <tr id="rowTotal" style="font-weight:bold; background-color: #f1f1f1 !important;">
            <td colspan="2" class="text-right">TOTAL:</td>
            <td class="text-right">${totalRent.toFixed(2)}</td>
            <td class="text-right">${totalDeposit.toFixed(2)}</td>
            <td></td>
        </tr>`;

   

    // 3. Logic to ensure it stays at the end
    if (jQuery("#rowTotal").length > 0) {
        // Remove the old one and re-append to the bottom
        jQuery("#rowTotal").remove();
    }

    // Always append to the end of the tbody
    jQuery("#tblCustomerDetails tbody").append(footerHtml);
}

function toggleTableVisibility() {
    // Count rows in tbody that are NOT the total row
    const rowCount = jQuery("#tblCustomerDetails tbody tr").not("#rowTotal").length;

    if (rowCount > 0) {
        jQuery("#TableContainer").show();
    } else {
        jQuery("#TableContainer").hide();
    }
}



