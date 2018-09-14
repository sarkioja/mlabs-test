// Variables
var form = $("#form");
var submit = $("#form-submit");
var modal = $(".modal");

var user = $("#username");
var validName = false;
var password = $("#password");
var validPassword = false;
var email = $("#email");
var validEmail = false;
var checkbox = $("#checkbox");
var validCheckbox = false;

var errorMsg = {
  0: " (This field cannot be blank)",
  1: " (Username must be at least 3 characters)",
  2: " (Password must be at least 4 characters)",
  3: " (Email must be a valid email adress)"
};

// Calls
$(document).ready(function() {
  submit.on("click", function(event) {
    event.preventDefault();
    validateFormSubmit();
  })

  user.on("change blur", function() {
    testUser()
  })

  password.on("change blur", function() {
    testPwd()
  })

  email.on("change blur", function() {
    testMail()
  })

  checkbox.on('change', function() {
    testCheckbox()
  })

  $("#modal-cancel").on("click", function () {
    location.reload();
  })

  $("#modal-submit").on("click", function () {
    callModal()
  })

});


//Validate Functions

function displayError(l, e) {
  var label = $("label[for=" + l + "]");
  var span = $("<span>").addClass("show-error").attr("id", "show-error-"+l);
  span.text(e)

  label.append(span);
}

function displayData(n,p,e) {
  var arrayVar = [n, p, e];
  var arrayLabels = ["name", "password", "email"];

  for (var i = 0; i < arrayVar.length; i++) {
    var span = $("<span>").addClass("data-content");
    var p = $(".message-" + arrayLabels[i]);

    span.text(arrayVar[i]);
    p.append(span);
  };
}

function callModal() {
  modal.css("display", "none");
  $(".content").css("display", "none");
  modal.css("display", "block");
  $(".content-confirmation").css("display", "block");

    setTimeout(function () {
        window.location.href = "https://www.mlabs.com.br/";
    }, 3000);
}

function testUser() {
  var n = user.val();
  var labelID = user.attr("id");

  if (!validateName(n) || n.length < 3) {
    user.removeClass("success").addClass("error");

    if ($("#show-error-" + labelID).length == 0) {
      displayError(labelID, errorMsg[1])
    }
  } else {
    user.removeClass("error").addClass("success");
    $("#show-error-" + labelID).remove();
    validName = true;
  }
}

function testPwd() {
  var p = password.val();
  var labelID = password.attr("id");

  if (p.length < 4) {
    password.removeClass("success").addClass("error");

    if ($("#show-error-" + labelID).length == 0) {
      displayError(labelID, errorMsg[2])
    }
  } else {
    password.removeClass("error").addClass("success");
    $("#show-error-" + labelID).remove();
    validPassword = true;
  }
}

function testMail() {
  var e = email.val();
  var labelID = email.attr("id");

  if (!validateEmail(e) || e.length == 0) {
    email.removeClass("success").addClass("error");

    if ($("#show-error-" + labelID).length == 0) {
      displayError(labelID, errorMsg[3])
    }
  } else {
    email.removeClass("error").addClass("success");
    $("#show-error-" + labelID).remove();
    validEmail = true;
  }
}

function testCheckbox() {
  var checked = $("#checkbox:checked").length;

  if (checked) {
    validCheckbox = true;
    $(".agree").addClass("hide");
    $("#checkbox").removeClass("red-border");
  } else {
    validCheckbox = false;
    $(".agree").removeClass("hide");
    $("#checkbox").addClass("red-border");
  }
}

function validateEmail(email) {
    var regexEmail = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return regexEmail.test(email);
};
function validateName(name) {
    var regexName = /.[a-zA-Z]+$/;
    return regexName.test(name);
};

function validateFormSubmit() {
  if (validName != true) {
    testUser()
  } if (validPassword != true) {
     testPwd()
  } if (validEmail != true) {
     testMail()
  } if (validCheckbox != true) {
    $(".agree").removeClass("hide");
    testCheckbox()
  }

  if ((validName == true) && (validPassword == true) && (validEmail == true) && validCheckbox == true) {
    user = user.val();
    password = password.val();
    email = email.val();

    modal.css("display", "block");
    displayData(user, password, email);

    //postDataToJson()
  }
}
