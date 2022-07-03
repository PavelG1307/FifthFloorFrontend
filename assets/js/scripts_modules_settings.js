const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

function HandleMessage(request) {
    for (const key in request.modules){
        if (request.modules[key].id_module == id) {
            document.querySelector('#name').setAttribute('value', request.modules[key].name)
            document.querySelector('#room').setAttribute('value', request.modules[key].location)
            break
        }
    }
}

function save() {
    console.log('Save')
    wsApp.doSend()
}

function del() {
    console.log('Delete')
}