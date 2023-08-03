(() => {

    let yOffset = 0; // window.pageYOffset 대신에 쓸 변수
    let PrevScrollHeight = 0; // 현재 스크롤 위치(yOffset) 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된 (눈 앞에 보고있는) 씬 (Scrollsection)
    let enterNewScene = false; // 새로운 Scene이 시작된 순간 true
    // sceneInfo는 각 scene에 대한 정보를 담고 있다.
    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅 // 이 값이 작으면 한번 스크롤 할 때마다 휙휙 넘어가는 원리
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d')
            },
            values: {
                messageA_opacity: [0, 1]
            }
        },
        {   
            // 1
            type: 'normal',
            heightNum: 5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            //2
            type: 'sticky',
            heightNum: 5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        },
        {
            //3
            type: 'sticky',
            heightNum: 5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        }
    ];
    
    function setLayout() {
        // 각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight; // window.innerHeight는 브라우저 창의 높이
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
        }

        yOffset = window.scrollY;

        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset) { // 이미지로 그려보면 이해가 쉬움
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene=${currentScene}`)
    }

    function calcValues (values, currentYOffset) { // currentYOffset은 현재 씬에서 얼마나 스크롤 됐는지를 의미
        let rv;
        // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

        rv = scrollRatio * (values[1] - values[0]) + values[0];

        return rv;
    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values
        const currentYOffset = yOffset - PrevScrollHeight;

        console.log(currentScene)

        switch (currentScene) {
            case 0:
                // console.log('0 play')
                let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset)
                objs.messageA.style.opacity = messageA_opacity_in;
                console.log(messageA_opacity_in)
                break;

            case 1:
                // console.log('1play')
                break;

            case 2:
                // console.log('2play')
                break;

            case 3:
                // console.log('3play')
                break;
        }
    }

    function scrollLoop() {
        enterNewScene = false;
        PrevScrollHeight = 0; // PrevScrollHeight의 초기화가 함수 내에 있어야 맥북 기준 4 scene의 총합 11540이 찍히고 다음 scrollLoop() 이 실행될 때 다시 초기화 된다. (값이 누적되지 않는다.) 
        for (let i = 0; i < currentScene; i++) {
            PrevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if(yOffset > PrevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if(yOffset < PrevScrollHeight) {
            enterNewScene = true;
            if (currentScene === 0) return; // scene 0에서 바운싱 스크롤이 일어났을 때 콘솔에 -값을 찍히지 않게 방지
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (enterNewScene) return;

        playAnimation();
    }

    window.addEventListener('scroll', () => {
        yOffset = window.scrollY;  // window.pageYOffset은 deprecated 되었다.
        scrollLoop()
    });
    // window.addEventListener('DOMContentLoaded', setLayout)
    window.addEventListener('load', setLayout)
    window.addEventListener('resize', setLayout) // 화면 크기가 바뀌었을때를 기준으로 setLayout을 정의하기

})();