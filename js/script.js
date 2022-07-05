window.onload = () => {
   const splitTime = (sec) => {
      // let seconds = Math.floor(sec % 60)
      let seconds
      if (Math.floor(sec % 60) < 10) {
         seconds = `0${Math.floor(sec % 60)}`
      }
      else
         seconds = Math.floor(sec % 60)
      return `${Math.floor(sec / 60)}:${seconds}`
   }



   let player = document.getElementById('player')
   let artist = document.getElementById('artist')
   let song = document.getElementById('song')
   let play = document.getElementById('play')
   let playIcon = document.getElementsByClassName('playIcon')
   let audioElement = document.getElementById('audioElement')
   let playerImg = document.getElementById('playerImg')
   let durringTime = document.getElementById('durringTime')
   let duration = document.getElementById('duration')
   let myRange = document.getElementById('myRange')
   let next = document.getElementById('next')
   let prewious = document.getElementById('prewious')




   let audioArr = ['./audio/doja_cat_-_woman_(z2.fm).mp3', './audio/kola_-_chi_razom_(z2.fm).mp3', './audio/Lana Del Rey - Summer Wine (mp3store.cc).mp3', './audio/la-blogotheque-the-d248-i-a-take-away-show_456239231.mp3']
   let imagesArr = ['url(../img/artworks-9vcy5i8USx6PRORe-IYr9yw-t500x500.jpg)', 'url(../img/kola.webp)', 'url(../img/3fe1db5766c6451eb7033410240ed3ab.webp)', 'url(../img/thedo_band2014.webp)']
   let songName = ['Woman', 'Чи Разом?', 'Summer Wine', 'Dust It Off']
   let artistName = ['Doja Cat', 'Kola', 'Lana Del Rey', 'THE DØ']
   player.style.backgroundImage = imagesArr[0]
   playerImg.style.backgroundImage = imagesArr[0]
   artist.innerText = artistName[0]
   song.innerText = songName[0]
   audioElement.setAttribute('src', audioArr[0])

   playIcon[0].classList.add('display-block')
   playIcon[1].classList.add('display-none')

   durringTime.innerText = splitTime(audioElement.currentTime)




   let i = 0

   function nextAudio() {
      playerImg.style.backgroundSize = '120%'
      i++

      if (i >= artistName.length)
         i = 0

      artist.innerText = artistName[i]
      song.innerText = songName[i]
      player.style.backgroundImage = imagesArr[i]
      playerImg.style.backgroundImage = imagesArr[i]
      audioElement.setAttribute('src', audioArr[i])
      for (const iterator of playIcon) {
         iterator.classList.remove('display-block')
         iterator.classList.remove('display-none')
      }
      if (audioElement.paused) {
         audioElement.play()
         imtervalId = setInterval(() => {
            durringTime.innerText = splitTime(audioElement.currentTime)
            myRange.value = audioElement.currentTime
            if (myRange.value == Math.trunc(myRange.max)) {
               nextAudio()
            }
         }, 1000)

         playIcon[1].classList.add('display-block')
         playIcon[0].classList.add('display-none')
      }
   }
   next.addEventListener('click', () => {
      nextAudio()
   })

   prewious.addEventListener('click', () => {
      playerImg.style.backgroundSize = '120%'
      i--
      if (i < 0)
         i = artistName.length - 1
      artist.innerText = artistName[i]
      song.innerText = songName[i]
      player.style.backgroundImage = imagesArr[i]
      playerImg.style.backgroundImage = imagesArr[i]
      audioElement.setAttribute('src', audioArr[i])

      for (const iterator of playIcon) {
         iterator.classList.remove('display-block')
         iterator.classList.remove('display-none')
      }
      if (audioElement.paused) {
         audioElement.play()
         imtervalId = setInterval(() => {
            durringTime.innerText = splitTime(audioElement.currentTime)
            myRange.value = audioElement.currentTime
            if (myRange.value == Math.trunc(myRange.max)) {
               nextAudio()
            }
         }, 1000)

         playIcon[1].classList.add('display-block')
         playIcon[0].classList.add('display-none')
      }
   })



   let imtervalId



   play.addEventListener('click', () => {
      for (const iterator of playIcon) {
         iterator.classList.remove('display-block')
         iterator.classList.remove('display-none')
      }
      if (audioElement.paused) {
         audioElement.play()
         playerImg.style.backgroundSize = '120%'
         imtervalId = setInterval(() => {
            durringTime.innerText = splitTime(audioElement.currentTime)
            myRange.value = audioElement.currentTime
            if (myRange.value == Math.trunc(myRange.max)) {
               nextAudio()
            }
         }, 1000)

         playIcon[1].classList.add('display-block')
         playIcon[0].classList.add('display-none')
      }
      else {
         audioElement.pause()
         playerImg.style.backgroundSize = '100%'
         clearInterval(imtervalId)

         playIcon[0].classList.add('display-block')
         playIcon[1].classList.add('display-none')
      }
   })

   myRange.addEventListener('input', () => {
      audioElement.currentTime = myRange.value
      durringTime.innerText = splitTime(audioElement.currentTime)
      if (myRange.value == myRange.max) {
         nextAudio()
      }
   })








   if (audioElement.duration) {
      doSomething()
   }
   else {
      audioElement.onloadedmetadata = doSomething;
   }

   function doSomething(event) {
      duration.innerText = splitTime(audioElement.duration)
      myRange.min = 0
      myRange.max = audioElement.duration
   }
}

