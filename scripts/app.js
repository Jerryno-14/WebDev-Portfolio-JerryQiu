    

document.addEventListener('DOMContentLoaded', function() {
    // 检查浏览器支持
    if (!('speechSynthesis' in window)) {
        console.log('Speech synthesis not supported');
        document.getElementById('speak-btn').disabled = true;
        document.getElementById('stop-speak-btn').disabled = true;
        return;
    }

    const synth = window.speechSynthesis;
    let currentUtterance = null;
    let speechRate = 1.0;

    // 获取元素
    const speakBtn = document.getElementById('speak-btn');
    const stopBtn = document.getElementById('stop-speak-btn');
    const slowDownBtn = document.getElementById('slowDownBtn');
    const speedUpBtn = document.getElementById('speedUpBtn');
    const rateDisplay = document.getElementById('rateDisplay');

    // 朗读函数
    function speakContent() {
        // 停止当前朗读
        synth.cancel();
        
        // 获取主要内容
        const content = document.querySelector('main').innerText || document.body.innerText;
        
        // 创建语音对象
        currentUtterance = new SpeechSynthesisUtterance(content);
        currentUtterance.lang = 'en-US'; // 设置为美式英语
        currentUtterance.rate = speechRate;
        
        // 更新按钮状态
        speakBtn.innerHTML = '<i class="fas fa-volume-up"></i> Reading...';
        
        // 朗读结束回调
        currentUtterance.onend = function() {
            speakBtn.innerHTML = '<i class="fas fa-volume-up"></i> Read';
            currentUtterance = null;
        };
        
        // 开始朗读
        synth.speak(currentUtterance);
    }

    // 停止朗读
    function stopSpeaking() {
        synth.cancel();
        speakBtn.innerHTML = '<i class="fas fa-volume-up"></i> Read';
    }

    // 调整语速
    function updateRate() {
        rateDisplay.textContent = speechRate.toFixed(1) + 'x';
    }

    // 事件监听
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

// 移除原来的样式操作代码（除非您确实需要）
// const element = document.getElementById('myElement');
// element.style.opacity = '0.5';
// element.style.transform = 'translateX(100px)';
// element.style.transition = 'all 0.3s ease';