$(document).ready(function(){
    $('#login').click(function(){
        var email= $('#email').val();
        var password = $('#password').val();
        var objEmail = {
            "email": email,
            "password": password
        };
        var strJSON = JSON.stringify(objEmail);
        console.log(strJSON);
        
                
        $.ajax({
            type: 'POST',
            url: 'https://us-central1-mercdev-academy.cloudfunctions.net/login',
            data: strJSON,
            contentType: 'application/json',
            success: function(){
                console.log("Yes");
                window.location.href = 'account.html';
            },
            error: function(){
                console.log("no");
             $('.form-one').css('height','460px');
            $('#login').css('top', '380px');
            $('.Rectangle-3').css('display', 'block');
            $('.input-1').css('border-color', '#ed4159');
            $('.input-1').css('color', '#ed4159').val();
            }
            
            
});
    });
})