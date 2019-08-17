
// Хранение данных о полях
var dataCSS = (function () {
    var DOMstrings = {
        borderFieldEmail: 'email',
        borderFieldPassword: 'password',
        errorRect: 'Error'
    };
    return {
        getDOMStrings: function() {
            return DOMstrings;
        }
    }
})();

// Изменение CSS в случае ввода неверных данных
var chancgeCSS = (function (dCSS) {
    var DOM = dCSS.getDOMStrings();
    return {
        changes: function () {
            document.getElementById(DOM.errorRect).style.display = 'block';
            document.getElementById(DOM.borderFieldEmail).style.color = '#ed4159';
            document.getElementById(DOM.borderFieldEmail).style.borderColor = '#ed4159';
        }
    }
})(dataCSS);

// Сбор данных, преобразование их в JSON и вход
var pharseData = (function (cCSS) {

    var getJSON = function (fieldEmail, fieldPassword) {
        var objEmail = {
            "email": fieldEmail,
            "password": fieldPassword
        };

        //Преобразование в JSON
        var strJSON = JSON.stringify(objEmail);
        return strJSON;
    };

    var pharseJSON = function (data) {
        var req = new XMLHttpRequest();
        var url = 'https://us-central1-mercdev-academy.cloudfunctions.net/login';
        var params = data;
        req.open('POST', url, true);
        req.setRequestHeader('Content-type', 'application/json');
        req.send(params);
        req.onreadystatechange = function(){
            if(req.status == 200 && req.readyState == 4){
                window.location.href = 'account.html';
            }
            else if(req.status != 200 && req.readyState != 4){
                cCSS.changes();
            }
        }
    };

    return {
        getJSONBack: function (fieldEmail,fieldPassword ) {
            var a = getJSON(fieldEmail,fieldPassword );
            return a;
        },
        connected: function (data) {
            pharseJSON(data);
        }
    }
})(chancgeCSS);

// Начало работы
var controller = (function (pD, cCSS, dCSS) {

    var clickAciton = function(){
        console.log('clickAction is worked!');
        document.getElementById('submit').onclick = function () {
            // Достает данные из полей
            var DOM = dCSS.getDOMStrings();
            var email = document.getElementById(DOM.borderFieldEmail).value;
            var password = document.getElementById(DOM.borderFieldPassword).value;

            // Отдаем считаные данные и назад получаем JSON
            var data = pD.getJSONBack(email, password);
            // Попытка соединения
            pD.connected(data);
        }
    }

    return{
        init: function () {
            // Аккумулирование всех действий
            console.log('App is started.');
            // Действия при клике на кнопку
            clickAciton();
        }
    }

})(pharseData, chancgeCSS, dataCSS);

controller.init();