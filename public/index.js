function renderTeaType(doc) {
    let li = document.createElement('li')
    li.setAttribute('data-id', doc.id)

    let div = document.createElement('div')
    div.classList.add('tea-list')

    let table = document.createElement('table')
    let tr = document.createElement('tr')

    let td1 = document.createElement('td')
    let img = document.createElement('img')
    img.src = doc.data().picture

    img.classList.add('img-size')
    img.alt = 'white'
    td1.appendChild(img)

    let td2 = document.createElement('td')
    let h3 = document.createElement('h3')
    h3.textContent = doc.data().name
    let p = document.createElement('p')
    p.textContent = doc.data().description
    let btn = document.createElement('button')
    btn.classList.add('tea-btn')
    btn.textContent = 'Перейти к чаю'
    btn.onclick = function () {
        deleteCookie('id')
        document.cookie = 'id=' + doc.id
        location.href = 'type.html'
    }
    td2.appendChild(h3)
    td2.appendChild(p)
    td2.appendChild(btn)

    tr.appendChild(td1)
    tr.appendChild(td2)
    table.appendChild(tr)
    div.appendChild(table)
    li.appendChild(div)
    teaList.appendChild(li)
}

function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

const teaList = document.querySelector('#tea-list')
db.collection('tea-type').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderTeaType(doc)
    })
})