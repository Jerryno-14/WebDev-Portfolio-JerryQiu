const element = document.getElementById('myElement');

// 直接设置样式（无过渡）
element.style.opacity = '0.5';
element.style.transform = 'translateX(100px)';

// 添加过渡效果
element.style.transition = 'all 0.3s ease';