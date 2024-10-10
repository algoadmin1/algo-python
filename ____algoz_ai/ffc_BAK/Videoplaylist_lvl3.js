const videosList = [
{
	video: 'https://res.cloudinary.com/www-avattireapp-com/video/upload/v1726453178/vid01-01a.mov',  
	title: 'Level 3.1 The One Two'
},
{
	video: 'https://res.cloudinary.com/www-avattireapp-com/video/upload/v1726453180/vid01-02.mov',  
	title: 'Level 3.2 The One Two'
},
{
	video: 'https://res.cloudinary.com/www-avattireapp-com/video/upload/v1726453183/vid01-03.mov',    
	title: 'Level 3.3 The One Two'
},
{
	video: 'https://res.cloudinary.com/www-avattireapp-com/video/upload/v1726453285/vid01-04.mov',  
	title: 'Level 3.4 The One Two'
},
{
	video: 'https://res.cloudinary.com/www-avattireapp-com/video/upload/v1726453284/vid01-05.mov',  
	title: 'Level 3.5 The One Two'
},
{
	video: 'https://res.cloudinary.com/www-avattireapp-com/video/upload/v1726453279/vid01-06.mov',   
	title: 'Level 3.6 The One Two'
},

]

const categories = [...new Set(videosList.map((item) => { return item }))]
document.getElementById('videosList').innerHTML = categories.map((item) => {
	var { video, title } = item;
	return (
		`<div class="list active">
		<video src=${video} class="list-video"></video>
		<h3 class="list-title">${title}</h3>
		</div>`
		)
}).join('')

let videoList = document.querySelectorAll('.video-list-container .list');
videoList.forEach(remove => { remove.classList.remove('active') });
videoList.forEach(vid => {
	vid.onclick = () => {
		videoList.forEach(remove => { remove.classList.remove('active') });
		vid.classList.add('active');
		let src = vid.querySelector('.list-video').src;
		let title = vid.querySelector('.list-title').innerHTML;
		document.querySelector('.main-video-container .main-video').src = src;
		document.querySelector('.main-video-container .main-video').play();
		document.querySelector('.main-video-container .main-vid-title').innerHTML = title;
	};
});