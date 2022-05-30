function ChangeState(id){
    document.getElementById(id).classList.toggle('active')
}

var $j = jQuery.noConflict();

// Функция для определения координат указателя мыши
function defPosition(event) {
    var x = y = 0;
    var d = document;
    var w = window;

    if (d.attachEvent != null) { // Internet Explorer & Opera
        x = w.event.clientX + (d.documentElement.scrollLeft ? d.documentElement.scrollLeft : d.body.scrollLeft);
        y = w.event.clientY + (d.documentElement.scrollTop ? d.documentElement.scrollTop : d.body.scrollTop);
    } else if (!d.attachEvent && d.addEventListener) { // Gecko
        x = event.clientX + w.scrollX;
        y = event.clientY + w.scrollY;
    }

    return {x:x, y:y};
}

function menu(event) {
    // Блокируем всплывание события contextmenu
    event = event || window.event;
    event.cancelBubble = true;

    // Задаём позицию контекстному меню
    var menu = $j('.right-menu').css({
        top: defPosition(event).y + "px",
        left: defPosition(event).x + "px"
    });

    // Показываем собственное контекстное меню
    menu.show();

    // Блокируем всплывание стандартного браузерного меню
    return false;
}

// Закрываем контекстное при клике правой кнопкой по документу
$j(document).on('contextmenu', function(){
    $j('.right-menu').hide();
});

// Закрываем контекстное при клике левой кнопкой по документу
$j(document).on('click', function(){
    $j('.right-menu').hide();
});
