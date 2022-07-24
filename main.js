const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// get height off display 
var getHeightandSetHeight = function() {
    var heightDisMu = $('.display_music')
    var heightDisList = $('.play_music-list')
    if( screen.width > 1023 ){
        heightDisList.style.height = ( heightDisMu.offsetHeight ) + "px" 
    }
    
}
getHeightandSetHeight()
// render song : loa cac bai nhac vao 
// scroll top 
// play / pause /seek 
// cd rotate 
// next / prew 
// random 
// next / repeat 
// active song 
// scroll active song into view 
// play song when click 

const cd = $('.display_music')
const audioSong = $('#audio')
const playBtn = $('.fa-play')
const pauseBtn =$('.fa-pause')
const nextBtn =  $('.fa-forward-step')
const preBtn =  $('.fa-backward-step')
const repeatBtn =$('.fa-retweet')
const randomBtn = $('.fa-shuffle')
const cdThumb = $('.display_music-header--img')
const columnBtns = $$('.volumn_btn-hover') 
const itemVoloum = $('#progress_volumn')
const progressVolume = $('#progress_volumn')
const app = {
    currentIndex : 0 , 
    isPlaying : false ,
    isPause : false ,
    isRandom : false , 
    isRepeat : false , 
    listSongs: [
        {
            song: 'mama boy',
            singer: 'amme',
            avatar: './images/01.jpg',
            mp3: './music/01.mp3'
        },
        {
            song: 'vì mẹ anh bắt chia tay',
            singer: 'miu lê, karik',
            avatar: './images/02.jpg',
            mp3: './music/02.mp3'
        },
        {
            song: 'Shay Nắnggg',
            singer: 'amme, obito',
            avatar: './images/03.jpg',
            mp3: './music/03.mp3'
        },
        {
            song: 'chạy khỏi thế giới này',
            singer: 'Da LAB, Phương Ly',
            avatar: './images/04.jpg',
            mp3: './music/04.mp3'
        },
        {
            song: 'QUERRY ',
            singer: 'QNT, TRUNG TRẦN, RPT MCK',
            avatar: './images/05.jpg',
            mp3: './music/05.mp3'
        },
        {
            song: 'gác lại âu lo',
            singer: 'dalab, miu lê',
            avatar: './images/06.jpg',
            mp3: './music/06.mp3'
        },
        {
            song: 'matchanah',
            singer: 'híu, bâu',
            avatar: './images/07.jpg',
            mp3: './music/07.mp3'
        },
        {
            song: 'lời đường mật',
            singer: 'lyly, hiếu thứ hai',
            avatar: './images/08.jpg',
            mp3: './music/08.mp3'
        },
        {
            song: 'cô gái vàng',
            singer: 'huyr, tùng viu',
            avatar: './images/09.jpg',
            mp3: './music/09.mp3'
        },
        {
            song: 'cho mình em',
            singer: 'đen, binz',
            avatar: './images/10.jpg',
            mp3: './music/10.mp3'
        },
        
    ],
    // tu lam tiep gan meo dc
    loadTimeSong : function() {
        // const allListSong = $$('.items-times:nth-child(i)')
        function addZero(number) {
            if (number >= 0 && number <= 9) return `0${number}`
            else return number
        }
        function convertSecondsToMinutes(timeType, element = '') {
            let seconds = 0
            if (timeType === 'currentTime') {
                seconds = element.currentTime.toFixed(0)
            } else if (timeType === 'duration') {
                seconds = element.duration.toFixed(0)
            } else {
                seconds = timeType.toFixed(0)
            }
            const minutes = Math.trunc(seconds / 60)
            return `${addZero(minutes)}:${addZero(seconds - minutes * 60)}`
        }
        var leng = this.listSongs.length
        const musicIt = []
        for( var i = 0 ; i < leng ; i ++ ) {
            musicIt.push(  new Audio(this.listSongs[i].mp3) )
                    
        }
        
        musicIt.forEach((audio , index ) => {
            console.log(audio)
            console.log(index +':' + $('.items-times:nth-child('+index+')'))
            audio.addEventListener('loadedmetadata', function() {
                $('.items-times:nth-child('+4+')').textContent = convertSecondsToMinutes('duration', audio)
                console.log(  $('.items-times:nth-child('+2+')'))
                
            })
        })
    }

    ,
    render: function() {
        const listMusicApp = $('.play_music-list') 
        // load song in display music 
        var setNumberForSong = function(x) {
            if( x > 0 && x < 9 ) {
                return "0" + (x + 1) 
            }
            else if( x == 0  ) {
                return "01"
            }
            else if( x >=9 ) {
                return x + 1 
            }
        }

        var htmls = this.listSongs.map((s , index) => {
            
            return  '<div class="items"><span class="items_order">'+setNumberForSong(index)+'</span><img src="'+ s.avatar+'"alt=""class="items-img"><div class="items_music-info"><div class="items_name-song">'+s.song+'</div><div class="items_music-singer">'+s.singer+'</div></div><span class="items-times">'+''+'</span></div></div>'
            
        })
        listMusicApp.innerHTML = htmls.join("\n")
        
        
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
          get: function () {
            return this.listSongs[this.currentIndex];
          }
        });
       
      },

    loadCurrentSong: function() {

        const imgDisplay = $('.display_music-header--img')
        const nameSong = $('.display_music-header--name')
        const nameSinger = $('.display_music-header--singer')
        
        $('#audio').src = this.currentSong.mp3
        imgDisplay.src = this.currentSong.avatar 
        nameSong.textContent = this.currentSong.song 
        nameSinger.textContent = this.currentSong.singer

    } ,

   
    scrollListMusicFixDisplay: function() {

    },
    
    hadEvevnt: function(func) {
        const _this = this
        const cdHeight = $('.display_music').offsetHeight
        const cdlist = $('.play_music-list')
        const cdLidtHeight = cdlist.offsetHeight
        getImgaBackGr()

        cdlist.onscroll = function () {
            if(screen.width < 1023 ) {
                const scrollHeight = cdlist.scrollTop
                const newHeightList = cdHeight - scrollHeight
                const setHeightDis = newHeightList > 200 ? newHeightList : 200 
                cd.style.height = setHeightDis + "px"
                cd.style.opacity = newHeightList / cdHeight > 0.8 ? (newHeightList / cdHeight) : 1
                const newHeightDisplay = cdLidtHeight + (cdHeight - setHeightDis) + "px"
                cdlist.style.height = newHeightDisplay
                if( setHeightDis < 300 ) {
                 $('.display_music-header--img').style.display = "none"
                 $('.display_music-header--singer').style.display = "none"
                }
                else {
                 $('.display_music-header--img').style.display = "block"
                 $('.display_music-header--singer').style.display = "block"
                }
            }
         };
       
        playBtn.onclick = function() {
            audioSong.play()
            playActive()
            
        }
        function playActive() {
            isPlaying = true 
            playBtn.classList.remove('active')
            playBtn.classList.add('no-active')
            pauseBtn.classList.remove('no-active')
            pauseBtn.classList.add('active')
        }
        function pasueActive() {
            isPlaying = false 
            playBtn.classList.remove('no-active')
            playBtn.classList.add('active')
            pauseBtn.classList.remove('active')
            pauseBtn.classList.add('no-active')
        }
        pauseBtn.onclick = function() {
            
            audioSong.pause()
            pasueActive()

        }
        audioSong.onplay = function() {
            cdThumbAnimate.play()
            $('.display_music-header--img').style.borderRadius = 50+"%"
            
        }
        audioSong.onpause = function() {
            $('.display_music-header--img').style.borderRadius = 0+"%"
            cdThumbAnimate.pause()
        }

        const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
            duration: 10000, // 10 seconds
            iterations: Infinity
          });
          cdThumbAnimate.pause();
        
        //   next play 
        nextBtn.onclick = function() {
            if( _this.isRandom === true ) {
                if( _this.isRandom === true ) {    
                    let newCurrentIndex    
                    do{
                        newCurrentIndex = Math.floor( Math.random() * (_this.listSongs.length) )
                    }while( newCurrentIndex === _this.currentIndex || newCurrentIndex === (_this.currentIndex- 1 ) ||newCurrentIndex === ( _this.currentIndex + 1 ));
                    _this.currentIndex = newCurrentIndex
                }
                _this.loadCurrentSong()
                
            }
            else {
                if( _this.currentIndex >= _this.listSongs.length - 1 ) {
                    _this.currentIndex = 0
                } 
                else {
                    _this.currentIndex ++ 
                }
                _this.loadCurrentSong()
                
                if( isPlaying === true  ) {
                    audioSong.play()
                }
            }
            getImgaBackGr()
            
        }
        // back play song 
        preBtn.onclick = function() {
            if(_this.currentIndex == 0 ) {
                _this.currentIndex = _this.listSongs.length - 1
            }
            else {
                _this.currentIndex --
            }
            _this.loadCurrentSong()
            if( _this.isPlaying === true ) {
                audioSong.play()
            }
            getImgaBackGr()

        } 

        //next phan tu random
        randomBtn.onclick = function() { 
            _this.isRandom = !_this.isRandom

            if( randomBtn.classList.contains('active_btn') === true ) {
                randomBtn.classList.remove('active_btn')
            }else {
                randomBtn.classList.add('active_btn')
            }
            
            
            
        }
        //next phan repeat
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat 
            if( repeatBtn.classList.contains('active_btn') === true ){
                repeatBtn.classList.remove('active_btn')
            }
            else {
                repeatBtn.classList.add('active_btn')
            }
        }
        // xu ly khi tua
        progress.onchange = function(e) {
            const changeTime = ( audioSong.duration / 100 ) * e.target.value 
            audioSong.currentTime = changeTime 
            const timelessTheSong = ($('#progress'),'::-webkit-slider-thumb')
            console.log( timelessTheSong )
        }
        // uppdate tiem in thanh
        // khi ohat het bai hat chuyen bai 
        audioSong.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(
                    (audio.currentTime / audio.duration) * 100
                    );
                    progress.value = progressPercent;
                }
            };
            
        audioSong.onended = function() {
                if( _this.isRandom === true ) {    
                    let newCurrentIndex    
                    do{
                        newCurrentIndex = Math.floor( Math.random() * (_this.listSongs.length) )
                    }while( newCurrentIndex === _this.currentIndex || newCurrentIndex === (_this.currentIndex- 1 ) ||newCurrentIndex === ( _this.currentIndex + 1 ));
                    _this.currentIndex = newCurrentIndex
                    _this.loadCurrentSong()
                }
                if( _this.isRepeat === true ) {
                    _this.currentIndex = _this.currentIndex
                    _this.loadCurrentSong()
                }else {
                    nextBtn.click()
                }
                
                audioSong.play()
                getImgaBackGr()
            }

        progressVolume.value = 1
        // tang giam am luong 
        for( const item of columnBtns ) {
            if($('#progress_volumn').classList.contains('active')) {
                $('#progress_volumn').classList.remove('active')
            }
            function addActiveVolumn() {
                $('#progress_volumn').classList.add('active')
            } 
            function removeActiveVolumn() {
                $('#progress_volumn').classList.remove('active')
            }
            item.onclick = function(e) {
                if( $('#progress_volumn').classList.contains('active') === false )  {
                    addActiveVolumn()
                   
                }else {
                    removeActiveVolumn()
                }
            }
            
        }
        // get icon theo am luong 
        function setActiveIConVolume(arrIconVolume, index3 ) {
            for(var i = 0 ; i < 3 ; i++ ) {
                if( i !== index3 ) {
                    arrIconVolume[i].classList.add('no-active')
                    arrIconVolume[i].classList.remove('active')
                }
            }
            arrIconVolume[index3].classList.add('active')
            arrIconVolume[index3].classList.remove('no-active')
        }
        function getIconWithVolume() {
            const iconVoulumOff = $('.fa-volume-off')
            const iconVoulumLow = $('.fa-volume-low')
            const iconVoulumHigh = $('.fa-volume-high')
            const arrIconVolume = [ iconVoulumOff , iconVoulumLow  , iconVoulumHigh]
            console.log(arrIconVolume)
            if( progressVolume.value == 0) {
                setActiveIConVolume(arrIconVolume , 0 )
            }
            else if( progressVolume.value > 0.1 && progressVolume.value  < 0.7 ) {
                setActiveIConVolume(arrIconVolume , 1 )
                
            }
            else if( progressVolume.value > 0.6 && progressVolume.value  <= 1 ) {
                setActiveIConVolume(arrIconVolume , 2 )
                
            }

        }
        // thay doi volumn cua audio 
        itemVoloum.onchange = function(e) {
            const volumnChange = e.target.value 
            audioSong.volume = volumnChange
            // const newVolume = 
            getIconWithVolume()
        }
        // lay bai hat lam anh nen cho backgroun
        
        function getImgaBackGr() {
            const url =  'url('+_this.listSongs[_this.currentIndex].avatar +')'
            $('#app').style.backgroundImage = url 
        }
        
        // lay bai hat da dc click 
        this.render()

        const listSongBtn = $$('.items')
        
        listSongBtn.forEach(( itemSong , index ) => {
            itemSong.onclick = function() {
                playActive()
                _this.currentIndex = index 
                _this.loadCurrentSong()
                audioSong.play()
                getImgaBackGr()
            }

        })
        
        
    }, 

    
    
    start: function() {
        
        // load bai hat 
        this.render()
        // // load cac su kien cua music 
        this.defineProperties()
        // define properties cho object 
        this.loadCurrentSong()
        // this.loadTimeSong()
        this.hadEvevnt(this.randomNextSong)
        // // tai thong tin bai hat khi vao ung dung  

        
        
       
    },

    

}
app.start()