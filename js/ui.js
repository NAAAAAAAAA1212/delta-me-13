// 处理图片加载失败
function handleImageError(imgElement) {
    imgElement.style.display = 'none';
    const button = imgElement.closest('.file-button');
    const iconContainer = imgElement.parentElement;
    const label = button.querySelector('.button-label');

    // 移除 has-icon 类
    button.classList.remove('has-icon');

    // 调整容器大小
    iconContainer.style.minHeight = '24px';
    iconContainer.style.marginBottom = '5px';

    // 调整标签样式
    label.style.marginTop = '0';
    label.classList.add('no-icon-label');

    // 调整容器类
    iconContainer.classList.add('no-icon-container');
}

// 检查图片是否加载成功（按钮7和8不加载图片）
function checkImageLoad() {
    document.querySelectorAll('.button-icon').forEach(img => {
        const button = img.closest('.file-button');
        const buttonId = button.getAttribute('data-id');

        // 按钮7和8不加载图片
        if (buttonId === '7' || buttonId === '8') {
            img.parentElement.style.display = 'none';
            button.classList.remove('has-icon');
            return;
        }

        if (img.complete && img.naturalHeight !== 0) {
            button.classList.add('has-icon');
        } else {
            img.addEventListener('load', function() {
                const button = this.closest('.file-button');
                button.classList.add('has-icon');
            });
            img.addEventListener('error', function() {
                handleImageError(this);
            });
        }
    });
}

// 更新按钮ID显示状态
function updateButtonIds() {
    const buttonIds = document.querySelectorAll('.button-id');
    buttonIds.forEach(idElement => {
        idElement.style.display = show_id ? 'flex' : 'none';
    });

    // 显示/隐藏控制台指令提示
    const instructions = document.querySelector('.console-instructions');
    if (instructions) {
        instructions.style.display = show_id ? 'block' : 'none';
    }
}

// 为其他按钮添加无效果的点击事件
document.querySelectorAll('.file-button:not(.destruct-button):not(.hidden-button):not([data-id="3"])').forEach(button => {
    button.addEventListener('click', function() {
        // 无效果，只添加一个简单的视觉反馈
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });
});

// 键盘快捷键：按1-8触发对应按钮
document.addEventListener('keydown', function(e) {
    const controlPanel = document.querySelector('.control-panel');
    if (!controlPanel || controlPanel.style.display === 'none') return;

    if (e.key >= '1' && e.key <= '8') {
        const button = document.querySelector(`.file-button[data-id="${e.key}"]`);
        if (button) {
            button.click();
            e.preventDefault();
        }
    }
});