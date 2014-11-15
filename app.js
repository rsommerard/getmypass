$(function() {
  var passwordGenerated = "";
  
  var bindPasswordRowEvents = function() {
    $("#passwordRow").bind("touchstart", function() {
      $("#password").text(passwordGenerated);
    });
    $("#passwordRow").bind("touchend", function() {
      $("#password").text("############");
    });
  };
  
  $("#site").keyup(function (e) {
    var keyCode = e.keyCode || e.which;

          if (keyCode == 13) {
            $("#passphrase").focus();
          }
  });
  
  $("#passphrase").keyup(function (e) {
    var keyCode = e.keyCode || e.which;

          if (keyCode == 13) {
            $("#passphrase").blur();
          }
  });

  var unbindPasswordRowEvents = function() {
    $("#passwordRow").unbind("touchstart");
    $("#passwordRow").unbind("touchend");
  };

  var bindGetMyPassRowEvent = function() {
    $("#getMyPassRow").bind("touchend", function() {
      reset();
    });
  };

  var unbindGetMyPassRowEvent = function() {
    $("#getMyPassRow").unbind("touchend");
  };

  var reset = function() {
    $("#container").css("overflow", "");
    passwordGenerated = "";
    $("#site").val("");
    $("#passphrase").val("");
    $("#password").val("");
    $("#passwordRow").hide();
    $("#formRow").show();
    unbindPasswordRowEvents();
    unbindGetMyPassRowEvent();
  };
  
  $(document).bind("visibilitychange", function () {
    if (document.hidden) {
      reset();
    }
  });

  var generatePassword = function(site, passphrase) {
    var str = site + passphrase;
    var hash = CryptoJS.SHA256(str);
    var index = str.length;
    passwordGenerated = hash.toString(CryptoJS.enc.Base64);
    passwordGenerated = passwordGenerated.substr(-((index + 8)%passwordGenerated.length), 8)
  };

  reset();

  $("#generate").bind("touchend", function() {
    $("#container").css("overflow", "hidden");
    $("#formRow").hide();
    $("#password").text("############");
    $("#passwordRow").show();
    generatePassword($("#site").val(), $("#passphrase").val());
    bindPasswordRowEvents();
    bindGetMyPassRowEvent();
  });

});
