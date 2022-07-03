const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

function HandleMessage(request) {
    request.modules.array.forEach(element => {
        if (id == id_module) {
            console.log('adfadfad')
        }
    });
    console.log(request.modules.id.name)
    console.log(request.modules.id.room)
}

function save() {
    console.log('Save')
    wsApp.doSend()
}

function del() {
    console.log('Delete')
}