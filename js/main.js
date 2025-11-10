// 全局变量
let show_id = false;
let titleInterval = null;

// 暴露给控制台的函数
window.showIds = function(show) {
    show_id = show;
    updateButtonIds();
    console.log(`编号显示状态: ${show_id ? '显示' : '隐藏'}`);
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查图片加载状态
    checkImageLoad();

    // 初始化按钮ID显示状态
    updateButtonIds();

    // 添加控制台指令提示
    console.log('控制台可用指令:');
    console.log('showIds(true)  - 显示按钮编号');
    console.log('showIds(false) - 隐藏按钮编号');
    console.log('键盘快捷键: 按1-8可触发对应按钮');
    console.log('按ESC键可以从管理员批注返回主界面');
    console.log('请确保 destroyt.txt 文件存在且可访问');

    // 初始化时间显示（实时更新，每分钟一次）
    updateTime();
    setInterval(updateTime, 60000);
});

// 更新时间显示（只显示小时和分钟）
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('currentTime').textContent = `${hours}:${minutes}`;
}

// 生成随机字符
function getRandomChar() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    return characters.charAt(Math.floor(Math.random() * characters.length));
}

// 生成20个字符的随机字符串
function generateRandomString(length = 20) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += getRandomChar();
    }
    return result;
}