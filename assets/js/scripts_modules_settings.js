const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

function HandleMessage(request) {
    for (const key in request.modules){
        if (request.modules[key].id_module == id) {
            document.getElementById('name').setAttribute('value', request.modules[key].name)
            document.getElementById('room').setAttribute('value', request.modules[key].location)
            break
        }
    }
}

function save() {
    console.log('Save')
    wsApp.doSend({
        type: 'UPDATE MODULE',
        module: id,
        name: document.getElementById('name').value,
        location: ocument.getElementById('room').value
    })
}

function del() {
    console.log('Delete')
}