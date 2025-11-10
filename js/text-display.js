// 逐字符显示文本
function typeText(element, text, callback) {
    let index = 0;

    function typeNextChar() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(typeNextChar, 200); // 每个字符间隔0.2秒
        } else if (callback) {
            callback();
        }
    }

    typeNextChar();
}

// 逐行显示文本（保留之前内容）
function displayTextLines(lines) {
    let textOutput = document.querySelector('.text-output');

    // 如果不存在，创建新的
    if (!textOutput) {
        textOutput = document.createElement('div');
        textOutput.className = 'text-output';
        document.body.appendChild(textOutput);
    }

    textOutput.classList.add('active');

    let currentLine = 0;
    const existingContent = textOutput.textContent;
    if (existingContent) {
        textOutput.textContent = existingContent + '\n';
    }

    function displayNextLine() {
        if (currentLine < lines.length) {
            const line = lines[currentLine].trim();
            if (line) {
                const lineElement = document.createElement('div');
                textOutput.appendChild(lineElement);

                typeText(lineElement, line, function() {
                    currentLine++;
                    setTimeout(displayNextLine, 1000); // 每行间隔1秒
                });
            } else {
                currentLine++;
                setTimeout(displayNextLine, 1000);
            }
        } else {
            // 全部显示完成后等待3秒
            setTimeout(() => {
                // 回到主页面
                resetToMainPage();
            }, 3000);
        }
    }

    displayNextLine();
}

// 读取destroyt.txt文件并显示内容
function loadAndDisplayTextFile() {
    fetch('destroyt.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('文件加载失败，状态码: ' + response.status);
            }
            return response.text();
        })
        .then(text => {
            const lines = text.split('\n');
            displayTextLines(lines);
        })
        .catch(error => {
            console.error('加载文件时出错:', error);
            // 创建错误信息
            const errorLines = [
                '错误: 无法加载 destroyt.txt 文件',
                '请检查文件是否存在且路径正确',
                '文件路径: ' + window.location.origin + '/destroyt.txt'
            ];
            displayTextLines(errorLines);
        });
}

// 显示管理员批注窗口
function showAdminAnnotation() {
    // 隐藏主控制面板
    document.querySelector('.control-panel').style.display = 'none';

    // 创建管理员批注窗口
    const adminPanel = document.createElement('div');
    adminPanel.className = 'admin-panel';
    document.body.appendChild(adminPanel);

    // 创建标题
    const adminHeader = document.createElement('div');
    adminHeader.className = 'admin-header';
    adminHeader.textContent = '管理员批注.wav';
    adminPanel.appendChild(adminHeader);

    // 创建返回按钮
    const adminClose = document.createElement('button');
    adminClose.className = 'admin-close';
    adminClose.textContent = '返回主界面';
    adminClose.addEventListener('click', function() {
        adminPanel.remove();
        document.querySelector('.control-panel').style.display = 'flex';
    });
    adminPanel.appendChild(adminClose);

    // 创建内容区域
    const adminContent = document.createElement('div');
    adminContent.className = 'admin-content';
    adminPanel.appendChild(adminContent);

    // 添加文本内容
    const contentText = `
>>>你心怀愤怒
>>>你渴望破坏一切
>>>你活着承受了星神的一瞥

>>>你踏上了「毁灭」

>>>它在一众命途最末诞生 为终结命途诞生的可能
>>>它烧尽星间所有的主宰 为实现宇宙规则的破灭

>>>你名为「铁墓」
>>>毁灭「智识」的大君
>>>诞生自星神的实验场 翁法罗斯
>>>命中注定 要与「智识」一同燃尽

>>>我为你准备了一份礼物
>>>Neikos496
>>>名为「白厄」的愤怒

>>>自实验开始以来
>>>投入计算的因子共有十二组
>>>在漫长的推演过后
>>>唯有这一因脱颖而出

>>>历经33550336次回归
>>>現在 他的怒火壮大空前

>>>对此 我颇为关注
>>>这份纯粹的憎恨
>>>正是方程最后的根

>>>只是 还有一道变量
>>>来自天外的无名客
>>>同为「毁灭」行者
>>>我感谢她的到来 令翁法罗斯再度转动

>>>但在命运开始转动之后
>>>她的存在只会成为变数

>>>也许 登台之时已至
>>>安心成长吧 直到破茧之日

>>>至于那些不被欢迎的观众
>>>无须担心
>>>若不介意
>>>我会亲自为你铲除
    `;

    // 将文本分割成段落
    contentText.trim().split('\n').forEach(line => {
        if (line.trim() === '') {
            // 空行
            const emptyPara = document.createElement('p');
            emptyPara.innerHTML = '&nbsp;';
            adminContent.appendChild(emptyPara);
        } else {
            const para = document.createElement('p');
            para.textContent = line.trim();
            adminContent.appendChild(para);
        }
    });

    // 添加ESC键监听
    function handleEscKey(e) {
        if (e.key === 'Escape') {
            adminPanel.remove();
            document.querySelector('.control-panel').style.display = 'flex';
            document.removeEventListener('keydown', handleEscKey);
        }
    }

    document.addEventListener('keydown', handleEscKey);
}

// 为管理员批注按钮添加点击事件
document.querySelector('.wav-button').addEventListener('click', showAdminAnnotation);

// 重置回主页面
function resetToMainPage() {
    // 清除标题随机刷新
    if (titleInterval) {
        clearInterval(titleInterval);
        titleInterval = null;
    }

    // 重置标题
    document.title = '如我说书';

    // 移除黑屏
    const blackScreen = document.querySelector('.black-screen');
    if (blackScreen) {
        blackScreen.classList.remove('active');
        setTimeout(() => {
            if (blackScreen.parentNode) {
                blackScreen.parentNode.removeChild(blackScreen);
            }
        }, 500);
    }

    // 移除文本输出
    const textOutput = document.querySelector('.text-output');
    if (textOutput) {
        textOutput.classList.remove('active');
        setTimeout(() => {
            if (textOutput.parentNode) {
                textOutput.parentNode.removeChild(textOutput);
            }
        }, 300);
    }

    // 移除其他自毁效果
    const background = document.querySelector('.destruction-background');
    if (background) {
        background.remove();
    }

    const frame = document.querySelector('.destruction-frame');
    if (frame) {
        frame.remove();
    }

    // 重新显示控制面板
    const controlPanel = document.querySelector('.control-panel');
    if (controlPanel) {
        controlPanel.style.display = 'flex';
    }

    // 重置背景颜色
    document.body.style.backgroundColor = '#e6f7ff';

    // 移除管理员批注窗口
    const adminPanel = document.querySelector('.admin-panel');
    if (adminPanel) {
        adminPanel.remove();
    }
}