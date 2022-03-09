//ARRAY DI OGGETI DESCRITTIVI PER OGNI POST

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];


//1. stampo i post nel DOM tramite JS:
const arrLikedIds = []; //array ID
const containerPosts = document.getElementById('container'); //container di tutti i post

function createPost(objPost) { //fuzione creazione post che richiamo in fondo!!
    
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.dataset.postid = objPost.id;
    postElement.innerHTML = `<div class="post__header">
    <div class="post-meta">
        <div class="post-meta__icon">
            ${getProfilePicHtml(objPost)}
        </div>
        <div class="post-meta__data">
            <div class="post-meta__author">${objPost.author.name}</div>
            <div class="post-meta__time">${objPost.created.split('-').reverse().join('/')}</div>
        </div>
    </div>
</div>
<div class="post__text">${objPost.content}</div>
<div class="post__image">
    <img src="${objPost.media}" alt="">
</div>
<div class="post__footer">
    <div class="likes js-likes">
        <div class="likes__cta">
            <a class="like-button js-like-button ${arrLikedIds.includes(objPost.id) ? 'like-button--liked': ''}" href="#">
                <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                <span class="like-button__label">Mi Piace</span>
            </a>
        </div>
        <div class="likes__counter">
            Piace a <b class="js-likes-counter">${objPost.likes}</b> persone
        </div>
    </div>
</div>`;

    postElement.querySelector('.like-button').addEventListener('click', clickButton);//bottone MI PIACE
 
    containerPosts.append(postElement); //stampo i post nel DOM

}


//funzione cambiamento al click di MI PIACE
function clickButton(event) { 
    
    event.preventDefault();
    const btnLike = this;
    const postElement = btnLike.closest('.post');
    const postId = parseInt(postElement.dataset.postid);
    const eleCounter = postElement.querySelector('.js-likes-counter');

    let indexLikedPosts = 0;

    while (postId != posts[indexLikedPosts].id) {
		indexLikedPosts++;
	}
	const objPost = posts[indexLikedPosts];

    if (btnLike.classList.contains('like-button--liked')) {
		removeLike(btnLike, objPost);
	} else {
		addLike(btnLike, objPost);
	}

    eleCounter.innerHTML = objPost.likes;
         
}


//se tolgo LIKE
function removeLike(btnLikeArgument, objPostArgument) {
	btnLikeArgument.classList.remove('like-button--liked');

	objPostArgument.likes--;
	const index = arrLikedIds.indexOf(objPostArgument.id);
	arrLikedIds.splice(index, 1);
	
}


//se metto LIKE
function addLike(btnLikeArgument, objPostArgument) {
	btnLikeArgument.classList.add('like-button--liked');

	objPostArgument.likes++;
	arrLikedIds.push(objPostArgument.id);
	
}


// funzione x gestire assenza immagine di profilo
function getProfilePicHtml(objPost) {
	if (objPost.author.image == null) {
		let arrNameParts = objPost.author.name.split(' ');
		let initials = '';
		for (let index in arrNameParts) {
			initials += arrNameParts[index][0].toUpperCase();
		}
		return `<div class="profile-pic-default"><span>${initials}</span></div>`;
	} else {
		return `<img class="profile-pic" src="${objPost.author.image}" alt="${objPost.author.name}"></img>`;
	}
}

    //CICLO X LA CREAZIONE DEI 5 POST
    for (let i = 0; i < posts.length; i++) { 
    
        createPost(posts[i]); //richiamo funzione creazione post
    }