// 为自毁按钮添加点击事件
document.querySelector('.destruct-button').addEventListener('click', startDestructionEffect);

// 为隐藏按钮添加点击事件，跳转到GitHub
document.querySelector('.hidden-button').addEventListener('click', function() {
    window.location.href = 'https://github.com/NAAAAAAAAA1212/delta-me-13';
});

// 为迷迷.exe按钮添加点击事件，跳转到B站视频
document.querySelector('.file-button[data-id="3"]').addEventListener('click', function() {
    window.location.href = 'https://www.bilibili.com/video/BV1yZ1MB1Eej/?spm_id_from=333.337.search-card.all.click';
});

// 启动自毁效果
function startDestructionEffect() {
    // 隐藏控制面板
    document.querySelector('.control-panel').style.display = 'none';

    // 创建背景闪烁层
    const background = document.createElement('div');
    background.className = 'destruction-background';
    document.body.appendChild(background);

    // 创建深红框
    const frame = document.createElement('div');
    frame.className = 'destruction-frame';
    document.body.appendChild(frame);

    // 创建背景图片容器
    const bgContainer = document.createElement('div');
    bgContainer.className = 'bg-image-container';
    frame.appendChild(bgContainer);

    // 创建图片元素（目前只有1张）
    const bgImage = document.createElement('img');
    bgImage.src = 'destroy_bg/1.jpg';
    bgImage.className = 'bg-image active';
    bgImage.alt = 'Destruction background';
    bgImage.onerror = function() {
        // 如果图片加载失败，移除容器
        bgContainer.style.display = 'none';
    };
    bgContainer.appendChild(bgImage);

    // 如果有更多图片，可以添加到这里
    const bgImages = ['destroy_bg/1.jpg'];

    // 图片轮播功能（如果有多张图片）
    if (bgImages.length > 1) {
        let currentIndex = 0;
        const shuffledImages = [...bgImages].sort(() => Math.random() - 0.5);

        function changeBackgroundImage() {
            currentIndex = (currentIndex + 1) % shuffledImages.length;

            // 创建新图片
            const newImage = document.createElement('img');
            newImage.src = shuffledImages[currentIndex];
            newImage.className = 'bg-image';
            newImage.alt = 'Destruction background';

            // 添加到容器
            bgContainer.appendChild(newImage);

            // 等待加载后切换
            newImage.onload = function() {
                // 隐藏当前激活的图片
                const activeImage = bgContainer.querySelector('.bg-image.active');
                if (activeImage) {
                    activeImage.classList.remove('active');
                }

                // 激活新图片
                newImage.classList.add('active');

                // 移除旧图片
                setTimeout(() => {
                    if (activeImage && activeImage !== newImage) {
                        bgContainer.removeChild(activeImage);
                    }
                }, 500);
            };

            newImage.onerror = function() {
                bgContainer.removeChild(newImage);
            };
        }

        // 每3秒切换一次
        setInterval(changeBackgroundImage, 3000);
    }

    // 创建进度条包裹容器
    const progressWrapper = document.createElement('div');
    progressWrapper.className = 'progress-wrapper';
    frame.appendChild(progressWrapper);

    // 创建进度条标题
    const progressTitle = document.createElement('div');
    progressTitle.className = 'progress-title';
    progressTitle.innerHTML = '⚠️ 数据删除进度';
    progressWrapper.appendChild(progressTitle);

    // 创建百分比显示（在标题和进度条中间）
    const progressPercentageDisplay = document.createElement('div');
    progressPercentageDisplay.className = 'progress-percentage-display';
    progressPercentageDisplay.textContent = '0%';
    progressWrapper.appendChild(progressPercentageDisplay);

    // 创建进度条
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressWrapper.appendChild(progressBar);

    // 创建进度条填充
    const progressFill = document.createElement('div');
    progressFill.className = 'progress-fill';
    progressBar.appendChild(progressFill);

    // 设置进度条动画
    let startTime = Date.now();
    const duration = 10000; // 10秒

    function updateProgress() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const percentage = Math.round(progress * 100);

        progressFill.style.width = `${percentage}%`;
        progressPercentageDisplay.textContent = `${percentage}%`;

        if (percentage < 100) {
            requestAnimationFrame(updateProgress);
        } else {
            // 进度完成后，开始动画
            setTimeout(() => {
                // 移动和放大进度条容器
                progressWrapper.classList.add('centered');

                // 3秒后黑屏
                setTimeout(() => {
                    const blackScreen = document.createElement('div');
                    blackScreen.className = 'black-screen';
                    document.body.appendChild(blackScreen);

                    // 等待动画完成后显示黑屏
                    setTimeout(() => {
                        blackScreen.classList.add('active');

                        // 黑屏后加载并显示文本
                        setTimeout(loadAndDisplayTextFile, 500);
                    }, 100);
                }, 3000);
            }, 1000);
        }
    }

    // 开始进度条动画
    requestAnimationFrame(updateProgress);

    // 更新标题
    titleInterval = setInterval(() => {
        document.title = generateRandomString(20);
    }, 100);
}