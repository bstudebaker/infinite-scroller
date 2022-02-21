const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let imageArray = [];

// Unsplash API
const count = 7;
const apiKey = 'tyIhSt5ovpGAOx9ApI1izjOwxPVPG8W5cDZQQtW59Nc';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

// Set DOM attributes function
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos and add it to the DOM
function displayImage(){
    imagesLoaded = 0;
    totalImages = imageArray.length;
    // Run the function for each object in imageArray
    imageArray.forEach((photo) =>{
        // Create <a> to link to Unsplash API
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create an img tag for photos
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener to check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put the img inside <a> and put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get the images from the Unsplash API
async function getImages(){
    try{
        const response = await fetch(apiURL);
        imageArray = await response.json();
        displayImage();
    }catch(error){
        // Catch any error here
        console.log('Sorry you had an error: ', error)
    }
}

// Check if scrolling near the bottom of the page and load more photos
window.addEventListener('scroll', ()=>{
    if(window.innerHeight = window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getImages();
    }
});

// On page load
getImages();