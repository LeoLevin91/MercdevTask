document.addEventListener('DOMContentLoaded', function(){
    var login = document.getElementById('submit');
    login.onclick= function(){
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var objEmail = {
            "email": email,
            "password": password
        };
        var strJSON = JSON.stringify(objEmail);
        console.log(strJSON);
    
    
    var req = new XMLHttpRequest();
    var url = 'https://us-central1-mercdev-academy.cloudfunctions.net/login';
    var params = strJSON;
    req.open('POST', url, true);
    req.setRequestHeader('Content-type', 'application/json');
    req.send(params);
    req.onreadystatechange = function(){
        if(req.status == 200 && req.readyState == 4){
            console.log('Yes');
            window.location.href = 'account1.html';
        }
        else if(req.status != 200 && req.readyState != 4){
            document.getElementById('form-one').style.height = '460px';
            document.getElementById('login').style.top = '380px'; 
            document.getElementById('Rectangle-3').style.display = 'block'; 
            document.getElementById('Rectangle-3').style.display = 'block';
            document.getElementById('email').style.color = '#ed4159';
            document.getElementById('email').style.borderColor = '#ed4159';
            document.getElementById('password').style.borderColor = '#ed4159';
            document.getElementById('password').style.color = '#ed4159';
            
        }
    }
    }
    
});
