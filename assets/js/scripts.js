var oReq = new XMLHttpRequest();

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
    goTo(url);
    return false;
}

function goTo(url){
    window.location.href = url;
}

function PutOnGuard(event){
    event = event || window.event;
    event.cancelBubble = true;
    console.log("Change guard")
    return false
}




