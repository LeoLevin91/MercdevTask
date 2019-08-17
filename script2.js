class Connected{
    constructor(fieldEmail, fieldPassword){
        this.fieldEmail = fieldEmail;
        this.fieldPassword = fieldPassword;
    }


    static changeCSS(){
        var DOMstrings = {
            borderFieldEmail: 'email',
            borderFieldPassword: 'password',
            errorRect: 'Error'
        };
        document.getElementById(DOMstrings.errorRect).style.display = 'block';
        document.getElementById(DOMstrings.borderFieldEmail).style.color = '#ed4159';
        document.getElementById(DOMstrings.borderFieldEmail).style.borderColor = '#ed4159';
    }

    controller(){
        var json = this.getJSON();
        this.connected(json);
    }


    getJSON(){
        var objEmail = {
            "email": this.fieldEmail,
            "password": this.fieldPassword
        };

        //Преобразование в JSON
        var strJSON = JSON.stringify(objEmail);
        return strJSON;
    }



    connected(json){
        var req = new XMLHttpRequest();
        var url = 'https://us-central1-mercdev-academy.cloudfunctions.net/login';
        var params = json;
        req.open('POST', url, true);
        req.setRequestHeader('Content-type', 'application/json');
        req.send(params);
        req.onreadystatechange = function(){
            if(req.status == 200 && req.readyState == 4){
                window.location.href = 'account1.html';
            }
            else if(req.status != 200 && req.readyState != 4){
                Connected.changeCSS()
            }
        }
    }
}

var start = function () {
    // Хранение ID элементов
    var DOMstrings = {
        borderFieldEmail: 'email',
        borderFieldPassword: 'password',
        errorRect: 'Error'
    };
    // Ожидание события клика
    document.getElementById('submit').onclick = function () {
        // Достает данные из полей
        var email = document.getElementById(DOMstrings.borderFieldEmail).value;
        var password = document.getElementById(DOMstrings.borderFieldPassword).value;

        // Создание объекта и отправка полей ему
        var obj = new Connected(email, password, DOMstrings);
        obj.controller();
    }
}

start();