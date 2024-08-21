require('dotenv').config();


async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });

    // Check if tabs array is not empty and tabs[0] exists
    if (tabs && tabs[0]) {
        return tabs[0].url; // Return the URL of the active tab
    } else {
        return null; // Return null if no active tab found
    }
}


document.addEventListener('DOMContentLoaded', async function() {
    const main = await getActiveTabURL();
    const btn = document.querySelector('button');
    let display= document.querySelector('img');
    const apiKey = process.env.API_KEY;
    const loadingIndicator= document.querySelector('.loading')
    const getQrCode=async(url)=>{
        loadingIndicator.style.display='block';
        const config = {headers:{'X-Api-Key': apiKey }}
        const res= await fetch("https://api.api-ninjas.com/v1/qrcode?data=" + url + "&format=" + "png",config)
        const data= await res.text()
        console.log(data)
        display.src=`data:image/png;base64,${data}`
        loadingIndicator.style.display='none';
    }
   /*  text.innerHTML = (`Current Link: ${main}`) || "No active tab found"; // Display message if no active tab found */
    getQrCode(`${main}`)
    document.querySelector('.download-btn').addEventListener('click', function() {
        var imgSrc = document.querySelector('.disp').src;
        var downloadLink = document.querySelector('.download-btn');
        downloadLink.href = imgSrc;
        downloadLink.download = 'image.png'; // You can change the file name here
    });
});
