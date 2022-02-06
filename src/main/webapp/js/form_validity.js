function tokenClick(){
    let login_form = $("#login_form");
    login_form.validate();
    if(!login_form.valid())
        return;
    else login_form[0].submit();
}