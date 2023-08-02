(() => {

    let yOffset = 0; // window.pageYOffset 대신에 쓸 변수
    let PrevScrollHeight = 0; // 현재 스크롤 위치(yOffset) 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된 (눈 앞에 보고있는) 씬 (Scrollsection)
    // sceneInfo는 각 scene에 대한 정보를 담고 있다.
    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅 // 이 값이 작으면 한번 스크롤 할 때마다 휙휙 넘어가는 원리
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0')
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
    }

    function scrollLoop() {
        PrevScrollHeight = 0; // PrevScrollHeight의 초기화가 함수 내에 있어야 맥북 기준 4 scene의 총합 11540이 찍히고 다음 scrollLoop() 이 실행될 때 다시 초기화 된다. (값이 누적되지 않는다.) 
        for (let i = 0; i < currentScene; i++) {
            PrevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if(yOffset > PrevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
        }

        if(yOffset < PrevScrollHeight) {
            if (currentScene === 0) return; // scene 0에서 바운싱 스크롤이 일어났을 때 콘솔에 -값을 찍히지 않게 방지
            currentScene--;
        }

        console.log(currentScene);
    }

    window.addEventListener('resize', setLayout) // 화면 크기가 바뀌었을때를 기준으로 setLayout을 정의하기
    window.addEventListener('scroll', () => {
        yOffset = window.scrollY;  // window.pageYOffset은 deprecated 되었다. 
        scrollLoop()
    });

    setLayout()

})();