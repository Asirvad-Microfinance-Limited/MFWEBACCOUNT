var mobile_number;
var User;
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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/BranchCashPosition", CashConfirmTablefillData, _Cashdenomination.CashConfirmcompleted, userdata.token);
    },
    clear: function () {
        document.getElementById("txt_id").value = "";
        document.getElementById("txt_pwd").value = "";
        window.location.href = "./denominationcash";
    },
    CashConfirmcompleted: function (response) {
        if (response.status == "SUCCESS") {
            try {
                response.data = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            } catch (e) {
                response.data = null;
            }

            swal({
                title: "Success",
                text: response.responseMsg,
                type: "success"
            }, function () {

                _Cashdenomination.clear();

            });



        } else {

            swal({
                title: "Warning",
                text: response.responseMsg,
                type: "error"
            }, function () {

                _Cashdenomination.clear();

            });


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
        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/BranchCashPosition", SystemDepositAmount, _Cashdenomination.SystemDepAmt, userdata.token);
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/BranchCashPosition", PunchinCheck, _Cashdenomination.UserPunchinResponse, userdata.token);
    },

    UserPunchinResponse: function (response) {

        if (response.status === "SUCCESS") {
            try {
                response.data = JSON.parse(DecryptAPIReq(response.data.encryptedResStr));
            } catch (e) {
                response.data = null;
            }


            if (response.data.message === "Successfully Confirmed") {

                /* swal(" ", "Your Are on live punching", "warning");*/

                _Cashdenomination.GetMobile();
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

        _http.post(MFPUBLICRENTAPI_URL + "api/accounts/BranchCashPosition", GetMobileNumber, _Cashdenomination.MobileResponse, userdata.token);

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
        mobile_number = mobilenum;
        userid = jQuery('#txt_id').val();
        User = userid

        _Cashdenomination.OtpSendRequest(mobilenum, userid);
    },

    OtpSendRequest: async function (mobilenum, userid) {

        jQuery('.page-loader-wrapper').show();
        var key = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
        var iv = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
        var mob = mobilenum;
        var uid = userid;
        var encryptedmob = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(mob), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        var OtpSend = {
            "customerId": 2,
            "typeId": 1,
            "mobileNo": encryptedmob.toString(),
            "userId": uid
        };


        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/general/otp", OtpSend, _Cashdenomination.OtpSendsucess)
    },

    OtpSendsucess: function (response) {

        if (response.status === "SUCCESS") {

            /*jQuery('#Login').show();*/
            jQuery('#phonenum').text('');
            var mob = mobilenum.replace(/\d(?=\d{4})/g, 'X');
            jQuery("#phonenum").text("+91 XXXXXX" + mobilenum.substr(6));
            jQuery("#Otp").modal('show');
            jQuery('#VerifyOtp').show();
            jQuery('#ResentOtp').hide();
            CountDown();
        }
        else {
            swal(response.message, "", "error");
        }
        jQuery('.page-loader-wrapper').hide();
    },

    OtpVerifyRequest: function () {
        jQuery('.page-loader-wrapper').show();
        var key = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
        var iv = CryptoJS.enc.Utf8.parse('7x!A%D*G-KaPdSgV');
        var mob = mobilenum;
        var encryptedmob = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(mob), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        var OtpVerify = {
            "otp": jQuery('#otpid').val(),
            "typeId": 1,
            "mobileNo": encryptedmob.toString()
        };



        _http.post(MFPUBLICCUSTOMERAPI_URL + "api/general/verifyotp", OtpVerify, _Cashdenomination.OtpVerify)
    },


    OtpVerify: function (response) {
        jQuery('.page-loader-wrapper').hide();
        if (response.status === "SUCCESS") {



            if (response.responseMsg = "SUCCESS") {

                swal({
                    title: "Success",
                    text: "OTP Verification Success",
                    type: "success"
                }, function () {


                    jQuery('#Otp').hide();
                    jQuery('#ResentOtp').hide();
                    jQuery('.page-loader-wrapper').hide();
                    jQuery('#frmcashdenomination').show();
                    _Cashdenomination.CashConfirm();


                });

            }
            else {

                swal({
                    title: "Warning..!",
                    text: "OTP Verification Failed",
                    type: "error"
                }, function () {

                    LogOutClearLocalStorage();
                    localStorage.setItem('currentUser', LocalStr, encryptkey);
                    jQuery('#Otp').show();
                    jQuery('#ResentOtp').show();
                    jQuery('.page-loader-wrapper').hide();

                });

            }
        }
        else {

            swal("", "FAILED ", "error");
            return false;
            window.location.href = "./denominationcash";
            //jQuery("#login_submit").val("Login to continue");
            //jQuery("#login_submit").attr("disabled", false);
            //jQuery("#otpid").val('');
            //swal("", "OTP Verification Failed", "error");
        }
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

        //else {
        //    _Cashdenomination.UserPunchin();
        //}
    });

    // Submit

    jQuery('#btnConfirm').click(function () {

        _Cashdenomination.UserPunchin();

        // _Cashdenomination.OtpSendRequest(mobile_number, User);
        // _Cashdenomination.CashConfirm();
    });

    // OTP Verification and Resend OTP

    jQuery('#VerifyOtp').click(function () {

        _Cashdenomination.OtpVerifyRequest();
    });
    jQuery('#ResentOtp').click(function () {
        ClearOtp();
    });
    function ClearOtp() {
        jQuery(".containers").html('');
        jQuery("#otpid").val('');

        _Cashdenomination.OtpSendRequest(mobile_number, User);
    }

    jQuery('#close').click(function () {

        window.location.reload(true);

    });


});

function CountDown() {
    var width = 280,
        height = 280,
        timePassed = 0,
        timeLimit = 30;

    var fields = [{
        value: timeLimit,
        size: timeLimit,
        update: function () {
            return timePassed = timePassed + 1;
        }
    }];


    var nilArc = d3.svg.arc().
        innerRadius(width / 3 - 133).
        outerRadius(width / 3 - 133).
        startAngle(0).
        endAngle(2 * Math.PI);

    var arc = d3.svg.arc().
        innerRadius(width / 3 - 45).
        outerRadius(width / 3 - 35).
        startAngle(0).
        endAngle(function (d) {
            return d.value / d.size * 2 * Math.PI;
        });

    var svg = d3.select(".containers").append("svg").
        attr("width", width).
        attr("height", height);

    var field = svg.selectAll(".field").
        data(fields).
        enter().append("g").
        attr("transform", "translate(" + width / 2 + "," + height / 2 + ")").
        attr("class", "field");

    var back = field.append("path").
        attr("class", "path path--background").
        attr("d", arc);

    var path = field.append("path").
        attr("class", "path path--foreground");

    var label = field.append("text").
        attr("class", "label").
        attr("dy", ".35em");

    (function update() {

        field.
            each(function (d) {
                d.previous = d.value, d.value = d.update(timePassed);
            });

        path.transition().
            ease("elastic").
            duration(500).
            attrTween("d", arcTween);

        if (timeLimit - timePassed <= 10)
            pulseText(); else

            label.
                text(function (d) {
                    return d.size - d.value;
                });

        if (timePassed <= timeLimit)
            setTimeout(update, 1000 - timePassed % 1000);
        else
            destroyTimer();


    })();

    function pulseText() {
        back.classed("pulse", true);
        label.classed("pulse", true);

        if (timeLimit - timePassed >= 0) {
            label.style("font-size", "120px").
                attr("transform", "translate(0," + +4 + ")").
                text(function (d) {
                    return d.size - d.value;
                });
        }

        label.transition().
            ease("elastic").
            duration(900).
            style("font-size", "60px").
            attr("transform", "translate(0," + -1 + ")");
    }

    function destroyTimer() {
        jQuery('#VerifyOtp').hide();
        jQuery('#ResentOtp').show();
    }

    function arcTween(b) {
        var i = d3.interpolate({
            value: b.previous
        },
            b);
        return function (t) {
            return arc(i(t));
        };
    }
}