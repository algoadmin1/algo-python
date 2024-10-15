const videosList = [
{
	// video: 'img/vid01-01.mp4',
	video: 'https://res.cloudinary.com/www-avattireapp-com/video/upload/v1726453178/vid01-01a.mov', //'img/vid01-00.mp4',
	title: 'Level 1.1 The Jab'
},
{
	video: 'https://res.cloudinary.com/www-avattireapp-com/video/upload/v1726453180/vid01-02.mov', // 'img/vid01-02.mp4',
	title: 'Level 1.2 The Jab'
},
{
	video: 'https://res.cloudinary.com/www-avattireapp-com/video/upload/v1726453183/vid01-03.mov',   //'img/vid01-03.mp4',
	title: 'Level 1.3 The Jab'
},
{
	video: 'https://res.cloudinary.com/www-avattireapp-com/video/upload/v1726453285/vid01-04.mov', //'img/vid01-04.mp4',
	title: 'Level 1.4 The Jab'
},
{
	video: 'https://res.cloudinary.com/www-avattireapp-com/video/upload/v1726453284/vid01-05.mov', //'img/vid01-05.mp4',
	title: 'Level 1.5 The Jab'
},
{
	video: 'https://res.cloudinary.com/www-avattireapp-com/video/upload/v1726453279/vid01-06.mov',  //'img/vid01-06.mp4',
	title: 'Level 1.6 The Jab'
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