

console.log("ready for location");
var oldLat = "";
var oldLong = "";
var unit = "M";
var latitude = "";
var longitude = "";




function grabFirstPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            var accuracy = position.coords.accuracy;

            var capa = document.getElementById("capa");
            console.log(accuracy);
        },
            function error(msg) { alert('Please enable your GPS position feature.'); },
            { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true });

        //   distance(oldLat, oldLong, latitude, longitude, unit);
        var distM = geolib.getPreciseDistance(
            { latitude: oldLat, longitude: oldLong },
            { latitude: latitude, longitude: longitude }
        );
        distance = distM * 3.5;
        console.log(distance + " feet");
        $("#coordsDiv").append("Location data set, start moving!");
        oldLat = latitude;
        oldLong = longitude;
    } else {
        alert("Geolocation API is not supported in your browser.");
    }
    dataRef.ref().push({
        username: username,
        longitude: longitude,
        latitude: latitude,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
};

function watchPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            var accuracy = position.coords.accuracy;

            var capa = document.getElementById("capa");

            console.log(accuracy);

        },
            function error(msg) { alert('Please enable your GPS position feature.'); },
            { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true });

        var distM = geolib.getPreciseDistance(
            { latitude: oldLat, longitude: oldLong },
            { latitude: latitude, longitude: longitude }
        );
        distance = distM * 3.5;
        console.log(distance + " feet");

        console.log("<div>Latitude: " + latitude + " | Longitude: " + longitude + " | Distance: " + distance + "</div>");
        oldLat = latitude;
        oldLong = longitude;


        dataRef.ref().set({
            username: username,
            longitude: longitude,
            latitude: latitude,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

    } else {
        alert("Geolocation API is not supported in your browser.");
    }

}





(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function () {
        if (showPass == 0) {
            $(this).next('input').attr('type', 'text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type', 'password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }

    });


})(jQuery);