
let timer;
const preload = (msg) => {
    const preloadElement = document.getElementById('preload');

    if (preloadElement.style.display === 'none') {
        timer = setTimeout(() => {
            location.reload();
        }, 400000);
    } else {
        clearTimeout(timer);
    }  if(msg){
        document.getElementById('error').innerText=msg;
    }
    if (preloadElement.style.display === 'block') {
        preloadElement.style.display = 'none';
    } else {
        preloadElement.style.display = 'block';
    }
}


document.getElementById('rame').addEventListener('load', function() {
    // Your operations here. For example:
    console.log('Iframe content loaded or changed!');
    window.scrollTo(0, document.body.scrollHeight);
});