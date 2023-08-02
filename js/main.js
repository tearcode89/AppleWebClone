(() => {
    // sceneInfo는 각 scene에 대한 정보를 담고 있다.
    let yOffset = 0; // window.pageYOffset 대신 쓸 변수

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

    function ScrollLoop() {

    }

    window.addEventListener('resize', setLayout) // 화면 크기가 바뀌었을때를 기준으로 setLayout을 정의하기
    window.addEventListener('scroll', () => {
        yOffset = window.scrollY;
        ScrollLoop()
    })

    setLayout()

})();