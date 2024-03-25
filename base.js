
let i = 0;
let article = document.querySelector('article');
let positionXMap = new Map();
let totalCount = 0;

const init = () => {
    i = 0;
    positionXMap.clear();
    totalCount = 0;
    article.style.transform = `translateX(0px)`
}

const initHtml = () => {
    init();
    article.childNodes.forEach((node, index) => {
        if (node.nodeType === 1) {
            let rect = node.getBoundingClientRect();
            if (!positionXMap.has(rect.x)) {
                positionXMap.set(rect.x, node);
            }
        }
    });

    totalCount = positionXMap.size;
}

// 创建一个元素，用于显示当前页码和总页码的比例
const createViewport = () => {
    let viewport = document.createElement('div');
    viewport.style.position = 'fixed';
    viewport.style.bottom = '8px';
    viewport.style.right = '16px';
    viewport.innerHTML = `${i + 1}/${totalCount}`;
    viewport.style.fontSize = '12px';
    // 颜色设置为浅灰色
    viewport.style.color = '#ccc';

    viewport.id = 'viewport';
    document.body.appendChild(viewport);
}

window.onload = () => {
    initHtml();
    createViewport();
}


window.onresize = () => {
    initHtml();
    document.querySelector('#viewport').innerHTML = `${i + 1}/${totalCount}`;
}

const handleClick = (event) => {
    event.stopPropagation();
    let width = document.body.offsetWidth;

    if (event.x < width / 3) {
        prev();
    } else if (event.x > width / 3 * 2) {
        next();

    } else {
        console.log('click center');
    }

    document.querySelector('#viewport').innerHTML = `${i + 1}/${totalCount}`;
}
const prev = () => {
    let width = document.body.offsetWidth;
    i--;
    if (i < 0) {
        i = 0
        alert('已经是第一页了');
    };

    article.style.transform = `translateX(-${(width - 16) * i}px)`
}

const next = () => {
    let width = document.body.offsetWidth;
    i++;
    if (i >= totalCount) {
        i = totalCount - 1;
        alert('已经是最后一页了');
    }

    article.style.transform = `translateX(-${(width - 16) * i}px)`
}