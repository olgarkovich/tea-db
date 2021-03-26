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

function renderTeaDetails(doc) {
    detailName.textContent = doc.data().name
    detailDescription.textContent = doc.data().description
    detailImg.src = doc.data().picture



    let commentList = doc.data().comments
    
    // for (let comment in commentList) {
    //     let div = document.createElement('div')
    //     div.classList.add('comment-form')
    //     let p = document.createElement('p')
    //     p.textContent = comment
    //     console.log(comment)
    //     console.log(comment.toString())
    //     div.appendChild(p)
    //     comments.appendChild(div)
    // }
}

const detailName = document.querySelector('#detail-name')
const detailDescription = document.querySelector('#detail-description')
const detailImg = document.querySelector('#detail-img')
const comments = document.querySelector('#comments')
db.collection('tea-type').doc(getCookie('id')).collection('teaList').get(getCookie('name')).then((snapshot) => {
    snapshot.docs.forEach(doc => {
        if (getCookie('name') === doc.id) {
            renderTeaDetails(doc)
        }
    })
})
