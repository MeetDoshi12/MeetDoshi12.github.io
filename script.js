var context;
var colors=["#2c3e50","#95a5a6","#d35400","#27ae60","#16a085","#f39c12","#2980b9","#e67e22","#bdc3c7","#1abc9c"];
var siz=[];
var x=[];
var y=[];
var dx=[];
var dy=[];
function init() {
	context = document.getElementById('header_canvas').getContext('2d');
	context.canvas.width = window.innerWidth;
	for(i=0;i<10;++i){
		x.push(Math.random()*context.canvas.width);
		y.push(Math.random()*context.canvas.height);
		dx.push((Math.random()-0.5)*1.8);
		dy.push((Math.random()-0.5)*1.8);
		siz.push((Math.random()+1.25)*28.0)
	}
	setInterval(draw,5);
}

function draw() {
	context.canvas.width = window.innerWidth;
	context.clearRect(0,0,context.canvas.width,350);
	context.globalAlpha=0.82;
	for(i=0;i<10;++i){
		context.beginPath();
		context.fillStyle=colors[i];
		context.arc(x[i],y[i],siz[i],0,Math.PI*2,true);
		context.closePath();
		context.fill();
		if(x[i]<0 || x[i]>context.canvas.width) dx[i]=-dx[i];
		if(y[i]<0 || y[i]>context.canvas.height) dy[i]=-dy[i];
		x[i]+=dx[i];
		y[i]+=dy[i];
	}
}

init();

window.onscroll = function() {
	var nav = document.getElementById('n1');
	if ( window.pageYOffset > 299 ) {
		nav.classList.add("navtop");
		nav.classList.remove("nav");
	} else {
		nav.classList.add("nav");
		nav.classList.remove("navtop");
	}
}

// function thanks() {
//     var name = document.getElementsByName('Name')[0].value;
//     var email = document.getElementsByName('Email')[0].value;
//     var comments = document.getElementsByName('Comments')[0].value;

//     var data = {
//         'Name': name,
//         'Email': email,
//         'Comments': comments
//     };

//     // Send POST request to Google Apps Script API
//     fetch('https://script.google.com/macros/s/AKfycbyNGlI_D64V7wLBC-ZB3uyAwDy_awbl98WxtLSG598vMLA5KHpixQ7U4zoBUZ65E0qwow/exec', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => {
//         if (response.ok) {
//             alert("Thanks for your feedback!");
//         } else {
//             throw new Error('Network response was not ok');
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert("There was an error submitting your feedback. Please try again later.");
//     });
// }

function thanks() {
	var name = document.getElementsByName('Name')[0].value;
	var email = document.getElementsByName('Email')[0].value;
	var comments = document.getElementsByName('Comments')[0].value;
  
	// Prepare data object
	var data = {
	  'Name': name,
	  'Email': email,
	  'Comments': comments
	};
  
	// Push data to Firebase Realtime Database
	firebase.database().ref('feedbacks').push(data)
	  .then(function() {
		alert("Thanks for your feedback!");
	  })
	  .catch(function(error) {
		console.error("Error saving feedback: ", error);
		alert("Error submitting feedback. Please try again later.");
	  });
  }  
 
