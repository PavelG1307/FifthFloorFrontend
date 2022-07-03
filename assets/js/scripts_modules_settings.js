const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

const el_name = document.getElementById('name')
const el_loc = document.getElementById('room')

function HandleMessage(request) {
    for (const key in request.modules){
        if (request.modules[key].id_module == id) {
            el_name.setAttribute('value', request.modules[key].name)
            el_loc.setAttribute('value', request.modules[key].location)
            break
        }
    }
}

function save() {
    console.log('Save')
    document.querySelector('#nam')
    wsApp.doSend({
        type: 'UPDATE MODULE',
        module: id,
        name: el_name.value,
        location: el_loc.value
    })
}

function del() {
    console.log('Delete')
}