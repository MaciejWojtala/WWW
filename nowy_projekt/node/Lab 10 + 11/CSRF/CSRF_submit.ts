(function() {
    console.log("script");
    const csrfForm = document.getElementById("csrf_form") as HTMLFormElement;
    console.log(csrfForm);
    csrfForm.submit();
})();