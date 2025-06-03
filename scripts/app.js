    

document.addEventListener('DOMContentLoaded', function() {
    
    if (!('speechSynthesis' in window)) {
        console.log('Speech synthesis not supported');
        document.getElementById('speak-btn').disabled = true;
        document.getElementById('stop-speak-btn').disabled = true;
        return;
    }

    const synth = window.speechSynthesis;
    let currentUtterance = null;
    let speechRate = 1.0;
    const speakBtn = document.getElementById('speak-btn');
            const stopBtn = document.getElementById('stop-speak-btn');
    const slowDownBtn = document.getElementById('slowDownBtn');
    const speedUpBtn = document.getElementById('speedUpBtn');
    const rateDisplay = document.getElementById('rateDisplay');


    function speakContent() {
        
        synth.cancel();
        
        
        const content = document.querySelector('main').innerText || document.body.innerText;
        
        
                currentUtterance = new SpeechSynthesisUtterance(content);
                    currentUtterance.lang = 'en-US'; 
                currentUtterance.rate = speechRate;
                speakBtn.innerHTML = '<i class="fas fa-volume-up"></i> Reading...';
                            currentUtterance.onend = function() {
                                speakBtn.innerHTML = '<i class="fas fa-volume-up"></i> Read';
                                currentUtterance = null;
                            };
        
        // xtart reading
        synth.speak(currentUtterance);
    }

    // stop reading
    function stopSpeaking() {
        synth.cancel();
        speakBtn.innerHTML = '<i class="fas fa-volume-up"></i> Read';
    }

    // change speed
    function updateRate() {
        rateDisplay.textContent = speechRate.toFixed(1) + 'x';
    }

    speakBtn.addEventListener('click', speakContent);
    stopBtn.addEventListener('click', stopSpeaking);
    
    slowDownBtn.addEventListener('click', function() {
        if (speechRate > 0.5) {
            speechRate -= 0.1;
            updateRate();
        }
    });
    
    speedUpBtn.addEventListener('click', function() {
        if (speechRate < 2.0) {
            speechRate += 0.1;
            updateRate();
        }
    });
});


  let countNum = 0;
  function count() {
    countNum++;
    document.getElementById("counter").innerHTML = countNum;
  }
