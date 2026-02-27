var _Cashdenomination = {
    CashConfirm: function () {
        var sysAmt = jQuery('#systotal').val();
        var TotalAmt = jQuery('#txttotal').val();
        var LateCash = jQuery('#txtlatecash').val();
        var Remark = jQuery('#txtremark').val();
        jQuery('.page-loader-wrapper').show();
        var burglary = 0;
        if (document.getElementById('Br_Yes').checked == true) {
            burglary = 1;
        }
        var ups = 0;
        if (document.getElementById('Ups_Yes').checked == true) {
            ups = 1;
        }
        var gps = 0;
        if (document.getElementById('Gps_Yes').checked == true) {
            gps = 1;
        }
        var panicSwicth = 0;
        if (document.getElementById('Ps_Yes').checked == true) {
            panicSwicth = 1;
        }
        var wirSwitch = 0;
        if (document.getElementById('Wps_Yes').checked == true) {
            wirSwitch = 1;
        }
        var ipcam = 0;
        if (document.getElementById('Ip_Yes').checked == true) {
            ipcam = 1;
        }
        var safeStrong = 0;
        if (document.getElementById('Sr_Yes').checked == true) {
            safeStrong = 1;
        }
        //login
        var value = jQuery('#txt_pwd').val().toString()
        var key = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
        var iv = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
        var encryptedlogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

        if (TotalAmt == '0') {
            jQuery('.page-loader-wrapper').hide();
            swal("", "Total Cash Zero Not Possible", "warning");
            return false;
        }
        if (LateCash > 0 && Remark == '') {
            jQuery('.page-loader-wrapper').hide();
            swal("", "please enter late cash reason in remarks", "warning");
            return false;
        }
        if (sysAmt != TotalAmt) {
            jQuery('.page-loader-wrapper').hide();
            swal("", "Please check the total amount or entered late cash", "warning");
            return false;
        }
        else {
            var CashConfirmTablefillData = {

                "branchid": userdata.branchId,
                "firm": 3,
                "userId": userdata.userId,
                "c500": parseInt(jQuery('#lbl500').text() != ' ' ? jQuery('#lbl500').text() : 0),
                "c200": parseInt(jQuery('#lbl200').text() != ' ' ? jQuery('#lbl200').text() : 0),
                "c100": parseInt(jQuery('#lbl100').text() != ' ' ? jQuery('#lbl100').text() : 0),
                "c50": parseInt(jQuery('#lbl50').text() != ' ' ? jQuery('#lbl50').text() : 0),
                "c20": parseInt(jQuery('#lbl20').text() != ' ' ? jQuery('#lbl20').text() : 0),
                "c10": parseInt(jQuery('#lbl10').text() != ' ' ? jQuery('#lbl10').text() : 0),
                "c5": parseInt(jQuery('#lbl5').text() != ' ' ? jQuery('#lbl5').text() : 0),
                "c2": parseInt(jQuery('#lbl2').text() != ' ' ? jQuery('#lbl2').text() : 0),
                "c1": parseInt(jQuery('#lbl1').text() != ' ' ? jQuery('#lbl1').text() : 0),
                "lateCash": parseInt(jQuery('#txtlatecash').val() == '' ? 0 : jQuery('#txtlatecash').val()),
                "sysTotal": parseInt(jQuery('#systotal').val()),
                "cashTotal": parseInt(jQuery('#txttotal').val()),
                "coinAmt": parseInt(jQuery('#txtcoin').val() == '' ? 0 : jQuery('#txtcoin').val()),
                "remark": jQuery('#txtremark').val(),
                "autherId": jQuery('#txt_id').val(),
                "password": encryptedlogin.toString(),
                "safeStrong": safeStrong,
                "burglary": burglary,
                "ups": ups,
                "gps": gps,
                "panicSwicth": panicSwicth,
                "wirSwitch": wirSwitch,
                "ipcam": ipcam
            };
            try {
                CashConfirmTablefillData = JSON.stringify(CashConfirmTablefillData);
            } catch (e) {
                swal("", e.message, "warning");
                return false;
            }
            CashConfirmTablefillData = { "encryptedRqstStr": EncryptAPIReq(CashConfirmTablefillData) };
        }
        _http.post(MFPUBLICLMSAPI_URL + "api/accountdetails/BranchCashPosition", CashConfirmTablefillData, _Cashdenomination.CashConfirmcompleted, userdata.token);
    },
    clear: function () {
        window.location.href = "./cashdenomination";
    },
    CashConfirmcompleted: function (response) {
        if (response.status == "SUCCESS") {
            try {
                response.data = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            } catch (e) {
                response.data = null;
            }
            swal(" ", response.data.message, "success");
           _Cashdenomination.clear();
        } else {
            swal(" ", response.responseMsg, "error");
        }
        jQuery('.page-loader-wrapper').hide();
    },
    SystemAmtFill: async function () {
        jQuery('.page-loader-wrapper').show();
        var SystemDepositAmount = {
            "typeId": 1,
            "branchId": userdata.branchId
        };
        try {
            SystemDepositAmount = JSON.stringify(SystemDepositAmount);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }
        SystemDepositAmount = { "encryptedRqstStr": EncryptAPIReq(SystemDepositAmount) };
        _http.post(MFPUBLICLMSAPI_URL + "api/accountdetails/BranchCashPosition", SystemDepositAmount, _Cashdenomination.SystemDepAmt, userdata.token);
    },
    SystemDepAmt: function (response) {
        if (response.status === "SUCCESS") {
            try {
                response.data = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            } catch (e) {
                response.data = null;
            }
            if (response.data.sysAmount != null) {
                jQuery("#systotal").val(response.data.sysAmount);
            }
            else {
                jQuery("#systotal").empty();
            }
        }
        jQuery('.page-loader-wrapper').hide();
    },

    UserPunchin: function () {

        jQuery('.page-loader-wrapper').show();
        var PunchinCheck = {
            "typeId": 5,
            "branchId": userdata.branchId,
            "autherId": jQuery('#txt_id').val()

        };
        try {
            PunchinCheck = JSON.stringify(PunchinCheck);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }

        PunchinCheck = { "encryptedRqstStr": EncryptAPIReq(PunchinCheck) };

        _http.post(MFPUBLICLMSAPI_URL + "api/accountdetails/BranchCashPosition", PunchinCheck, _Cashdenomination.UserPunchinResponse, userdata.token);
    },

    UserPunchinResponse: function (response) {

        if (response.status === "SUCCESS") {
            try {
                response.data = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            } catch (e) {
                response.data = null;
            }


            if (response.data.message === "Successfully Confirmed") {

                swal(" ", "Your Are on live punching", "warning");
                jQuery('.page-loader-wrapper').hide();


               


            } else {
                swal(" ", response.data.message, "error");
                jQuery('.page-loader-wrapper').hide();

                  }


            }


    },

    GetMobile: function () {

        jQuery('.page-loader-wrapper').show();
        var GetMobileNumber = {
            "typeId": 4,
            "autherId": jQuery('#txt_id').val()

        };
        try {
            GetMobileNumber = JSON.stringify(GetMobileNumber);
        } catch (e) {
            swal("", e.message, "warning");
            return false;
        }

        GetMobileNumber = { "encryptedRqstStr": EncryptAPIReq(GetMobileNumber) };

        _http.post(MFPUBLICLMSAPI_URL + "api/accountdetails/BranchCashPosition", GetMobileNumber, _Cashdenomination.MobileResponse, userdata.token);
   
    },

    MobileResponse: function (response) {

        if (response.status === "SUCCESS") {
            try {
                response.data = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            } catch (e) {
                response.data = null;
            }
        }
        mobilenum = response.data.mobileNumber;


    },




}
jQuery(document).ready(function ($) {
    jQuery('.page-loader-wrapper').hide();
    _Cashdenomination.SystemAmtFill();
    inputs = $("table :input");
    $(inputs).keyup(function (e) {
        if (e.keyCode == 13) {
            inputs[inputs.index(this) + 1].focus();
        }
    });
    $('#txt500').keyup(function () {
        var Data500;
        Data500 = $('#txt500').val() * 500;
        $('#lbl500').text(Data500);
    });
    $('#txt200').keyup(function () {
        var Data200;
        Data200 = $('#txt200').val() * 200;
        $('#lbl200').text(Data200);
    });
    $('#txt100').keyup(function () {
        var Data100;
        Data100 = $('#txt100').val() * 100;
        $('#lbl100').text(Data100);
    });
    $('#txt50').keyup(function () {
        var Data50;
        Data50 = $('#txt50').val() * 50;
        $('#lbl50').text(Data50);
    });
    $('#txt20').keyup(function () {
        var Data20;
        Data20 = $('#txt20').val() * 20;
        $('#lbl20').text(Data20);
    });
    $('#txt10').keyup(function () {
        var Data10;
        Data10 = $('#txt10').val() * 10;
        $('#lbl10').text(Data10);
    });
    $('#txt5').keyup(function () {
        var Data5;
        Data5 = $('#txt5').val() * 5;
        $('#lbl5').text(Data5);
    });
    $('#txt2').keyup(function () {
        var Data2;
        Data2 = $('#txt2').val() * 2;
        $('#lbl2').text(Data2);
    });
    $('#txt1').keyup(function () {
        var Data1;
        Data1 = $('#txt1').val() * 1;
        $('#lbl1').text(Data1);
    });
    $("input[type='text']").keyup(function () {
        var total;
        total = /*parseInt($('#lbl2000').text() != ' ' ? $('#lbl2000').text() : 0) + */parseInt($('#lbl500').text() != ' ' ? $('#lbl500').text() : 0) + parseInt($('#lbl200').text() != ' ' ? $('#lbl200').text() : 0) + parseInt($('#lbl100').text() != ' ' ? $('#lbl100').text() : 0) + parseInt($('#lbl50').text() != ' ' ? $('#lbl50').text() : 0) + parseInt($('#lbl20').text() != ' ' ? $('#lbl20').text() : 0) + parseInt($('#lbl10').text() != ' ' ? $('#lbl10').text() : 0) + parseInt($('#lbl5').text() != ' ' ? $('#lbl5').text() : 0) + parseInt($('#lbl2').text() != ' ' ? $('#lbl2').text() : 0) + parseInt($('#lbl1').text() != ' ' ? $('#lbl1').text() : 0) + parseInt($('#txtcoin').val() == '' ? 0 : $('#txtcoin').val()) + parseInt($('#txtlatecash').val() == '' ? 0 : $('#txtlatecash').val());
        $('#txttotal').val(total);
    });

    // Cash Denomination Verifier Punch in Chacking and OTP


    jQuery('#txt_pwd').click(function () {
        if (jQuery("#txt_id").val().trim() === "") {
            swal("", "please enter UserId of Verifier", "warning");
            return false;
        }

        else {
            _Cashdenomination.UserPunchin();
        }
    });



});