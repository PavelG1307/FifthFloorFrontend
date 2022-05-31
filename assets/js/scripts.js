function ChangeState(id){
    document.getElementById(id).classList.toggle('active')
}

function ChangeStateMb(){
    document.getElementById('on_btn').classList.toggle('active')
    document.getElementById('off_btn').classList.toggle('active')
}

var $j = jQuery.noConflict();

function long_press(event, url) {
    event = event || window.event;
    event.cancelBubble = true;
    // window.location.href = url;
    GetTime();
    return false;
}

function GetTime(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../json/test.json', false);
    xhr.send();
}

xhr.onload = function() {
    alert(`Загружено: ${xhr.status} ${xhr.response}`);
    var request = JSON.parse(xhr.response);
    console.log(request["time"])
  };

xhr.onerror = function() { // происходит, только когда запрос совсем не получилось выполнить
    alert(`Ошибка соединения`);
};

xhr.onprogress = function(event) { // запускается периодически
    // event.loaded - количество загруженных байт
    // event.lengthComputable = равно true, если сервер присылает заголовок Content-Length
    // event.total - количество байт всего (только если lengthComputable равно true)
    alert(`Загружено ${event.loaded} из ${event.total}`);
  };