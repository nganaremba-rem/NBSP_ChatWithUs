let pass = document.querySelector("#password");
let cpass = document.querySelector("#cpassword");

function validate() {
  if (pass.value != cpass.value) {
    alert("Password doesn't match");
    pass.focus();
    return false;
  }
}
