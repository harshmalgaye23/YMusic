console.log("Welcome to YMucis")
let songindex = 0;
let audioelement = new Audio('songs/2.mp3')
let masterplay = document.getElementById('masterplay')
let progbar = document.getElementById('progbar')
let gif = document.getElementById('gif')
let mastersongname = document.getElementById('mastersongname')
let songItem = Array.from(document.getElementsByClassName("songItem"))
let songs = [
    {songname: "UNSECRET x Vo Williams - Higher" ,filePath: "songs/1.mp3" ,coverPath: "covers/1.jpg"},
    {songname: "Zella Day - Compass            " ,filePath: "songs/2.mp3" ,coverPath: "covers/2.jpg"},
    {songname: "Waka Flocka - No Handz         " ,filePath: "songs/3.mp3" ,coverPath: "covers/3.jpg"},
    {songname: "Yellow Claw - Forgetting       " ,filePath: "songs/4.mp3" ,coverPath: "covers/4.jpg"},
    {songname: "Yellow Claw - The Way          " ,filePath: "songs/5.mp3" ,coverPath: "covers/5.jpg"}

]

songItem.forEach((element, i) =>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songname
})

masterplay.addEventListener('click' ,()=>{
    if( audioelement.paused || audioelement.currentTime <= 0){
        audioelement.play()
        masterplay.classList.remove('fa-play')
        masterplay.classList.add('fa-stop')
        gif.style.opacity = 1;
    }
    else{
        audioelement.pause()
        masterplay.classList.remove('fa-stop')
        masterplay.classList.add('fa-play')
        gif.style.opacity = 0;   
    }
})
audioelement.addEventListener('timeupdate',()=>{
    progress = parseInt((audioelement.currentTime/audioelement.duration) * 100)
    progbar.value = progress
})
progbar.addEventListener('change' , () =>{
    audioelement.currentTime = (progbar.value*audioelement.duration)/100
})

const makeallplay = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-stop')
        element.classList.add('fa-play')
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click' , (e)=>{
        makeallplay()
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-play')
        e.target.classList.add('fa-stop')
        audioelement.src = `songs/${songindex}.mp3`;
        mastersongname.innerText = songs[songindex-1].songname
        audioelement.currentTime = 0
        audioelement.play()
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-play')
        masterplay.classList.add('fa-stop') 
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songindex >4){
        songindex = 0
    }
    else{
        songindex +=1
    }
    audioelement.src = `songs/${songindex}.mp3`;
    mastersongname.innerText = songs[songindex-1].songname
    audioelement.currentTime = 0
    audioelement.play()
    masterplay.classList.remove('fa-play')
    masterplay.classList.add('fa-stop')
})
document.getElementById('back').addEventListener('click', ()=>{
    if(songindex <=0){
        songindex = 5
    }
    else{
        songindex -=1
    }
    audioelement.src = `songs/${songindex}.mp3`;
    mastersongname.innerText = songs[songindex-1].songname
    audioelement.currentTime = 0
    audioelement.play()
    masterplay.classList.remove('fa-play')
    masterplay.classList.add('fa-stop')

})