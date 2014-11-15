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

  var generatePassword = function(site, passphrase) {
    passwordGenerated = CryptoJS.SHA256(site + passphrase);
    passwordGenerated = passwordGenerated.toString();
    passwordGenerated = passwordGenerated.substr(-12);
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
