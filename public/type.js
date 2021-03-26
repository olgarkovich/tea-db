function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function renderTeaType(doc) {
    let h3main = document.querySelector('#type-name')
    if (doc.data().type != null) {
        h3main.textContent = doc.data().type

        let p = document.querySelector('#type-description')
        if (doc.data().type != null) {
            p.textContent = doc.data().fullDescription
        }
    }

    let li = document.createElement('li')
    li.style.marginTop = 10

    let div = document.createElement('div')
    div.classList.add('tea-block')

    let table = document.createElement('table')
    let tr1 = document.createElement('tr1')
    let td1 = document.createElement('td1')
    let a = document.createElement('a')
    a.onclick = function () {
        deleteCookie('name')
        document.cookie = 'name=' + doc.id
        location.href = 'detail.html'
    }
    a.href = "detail.html"
    let img = document.createElement('img')
    img.src = doc.data().picture
    img.classList.add("img-size")
    img.alt = "yellow"
    a.appendChild(img)

    td1.appendChild(a)
    tr1.appendChild(td1)
    table.appendChild(tr1)

    let tr2 = document.createElement('tr2')
    let td2 = document.createElement('td2')
    let h3 = document.createElement('h3')
    h3.classList.add('type-text')
    h3.textContent = doc.data().name
    td2.appendChild(h3)
    tr2.appendChild(td2)
    table.appendChild(tr2)
    div.appendChild(table)
    li.appendChild(div)
    typeList.appendChild(li)
}

const typeList = document.querySelector('#type-list')

function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

db.collection('tea-type').doc(getCookie('id')).collection('teaList').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderTeaType(doc)
    })
})