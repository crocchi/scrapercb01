

const preload = (msg) => {
    const preloadElement = document.getElementById('preload');
    if(msg){
        document.getElementById('error').innerText=msg;
    }
    if (preloadElement.style.display === 'block') {
        preloadElement.style.display = 'none';
    } else {
        preloadElement.style.display = 'block';
    }
}