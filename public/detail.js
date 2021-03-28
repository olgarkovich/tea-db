const detailName = document.querySelector('#detail-name')
const detailDescription = document.querySelector('#detail-description')
const comments = document.querySelector('#comments')
const form = document.querySelector('#input-form')

let d

function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
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

    let img = document.createElement('img')
    img.src = doc.data().picture
    img.classList.add("left-img")
    img.alt = "tea"
    img.width = 170
    img.height = 170
    img.style.margin = 10

    detailDescription.appendChild(img)

    let commentArray = getCommentArray(doc)

    console.log(commentArray.length)

    commentArray.forEach(comment => {
            let div = document.createElement('div')
            div.classList.add('comment-form')
            let p = document.createElement('p')
            p.textContent = comment
            console.log(comment)
            div.appendChild(p)
            comments.appendChild(div)
        }
    )
}

function getCommentArray(doc) {
    let commentList = doc.data().comments
    return commentList.split(',')
}

db.collection('tea-type').doc(getCookie('id')).collection('teaList').get(getCookie('name')).then((snapshot) => {
    snapshot.docs.forEach(doc => {
        if (getCookie('name') === doc.id) {
            d = doc
            console.log('d = doc')
            renderTeaDetails(doc)
        }
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let comments = getCommentArray(d)
    db.collection('tea-type').doc(getCookie('id')).collection('teaList').doc(getCookie('name')).update({
        comments: comments + ', ' + form.comment.value
    })
    setTimeout(function () {
        location.reload();
    }, 1000);
})
