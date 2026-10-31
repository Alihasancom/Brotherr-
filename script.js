const screens=[...document.querySelectorAll('.screen.slide')];let current=0,played=false;const $=id=>document.getElementById(id);const hitAudio=$('hitAudio');
function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));$(id).classList.add('active');const idx=screens.findIndex(s=>s.id===id);$('slideCount').textContent=idx>=0?`${idx+1} / ${screens.length}`:'BIRTHDAY FINAL';}
function goNext(){if(current<screens.length-1){current++;showScreen(screens[current].id)}}
document.querySelectorAll('.next').forEach(b=>b.addEventListener('click',goNext));
function hitLastBall(){if(played)return;played=true;$('hitBtn').disabled=true;$('commentary').textContent='THE BAT CONNECTS… WHAT A MASSIVE HIT!';$('batter').classList.add('swing');$('cricketBall').classList.add('fly');hitAudio.currentTime=0;hitAudio.play().catch(()=>{});setTimeout(()=>{$('runs').textContent='6';$('balls').textContent='0';$('sixFlash').classList.remove('hidden');$('commentary').textContent='SIIIIIIXXXX! STRAIGHT OUT OF THE GROUND! 🔥';$('unlock').classList.remove('hidden');$('hitBtn').classList.add('hidden')},1150)}
$('hitBtn').addEventListener('click',hitLastBall);$('cricketScene').addEventListener('click',hitLastBall);$('cricketScene').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();hitLastBall()}});
$('enterBtn').onclick=()=>{current=0;showScreen('dua')};
const giftVideo=$('giftVideo');
giftVideo.addEventListener('error',()=>{$('giftStatus').textContent='Video could not load. Keep the assets folder beside index.html and reopen using Live Server.';});
giftVideo.addEventListener('loadedmetadata',()=>{$('giftStatus').textContent='Your video surprise is ready ❤️';});
$('giftBtn').onclick=()=>{$('giftBtn').classList.add('opened');$('giftStatus').textContent='Loading your video surprise…';$('videoWrap').classList.remove('hidden');$('giftNext').classList.add('hidden');giftVideo.load();const playPromise=giftVideo.play();if(playPromise&&playPromise.catch){playPromise.catch(()=>{$('giftStatus').textContent='Video is ready — tap the play button below to start ❤️';});}};
function continueAfterVideo(){$('giftVideo').pause();goNext()}$('videoContinue').onclick=continueAfterVideo;$('giftNext').onclick=goNext;
$('replay').onclick=()=>{played=false;$('runs').textContent='0';$('balls').textContent='1';$('hitBtn').disabled=false;$('hitBtn').classList.remove('hidden');$('unlock').classList.add('hidden');$('sixFlash').classList.add('hidden');$('batter').classList.remove('swing');$('cricketBall').classList.remove('fly');showScreen('challenge')};
showScreen('challenge');
