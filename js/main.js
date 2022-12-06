

//content1
const quickSpan = document.querySelectorAll(".content1 span"); 
for(let i=0;i<quickSpan.length;i++){
    let images = ''; 
    for(let k=0;k<20;k++){ 
        if(k<10){
            images += `<img src="images/quick0${i+1}/quick0${i+1}_0000${k}.png" />`
        }else{
            images += `<img src="images/quick0${i+1}/quick0${i+1}_000${k}.png" />`
        }
        quickSpan[i].innerHTML = images; 
    }
}

//로그인 박스 이미지

let appear_img='';
for(let k=0;k<57;k++){
    if(k<10){
        appear_img += `<img src="images/appear/appear_0000${k}.png" />`;
    }else{
        appear_img += `<img src="images/appear/appear_000${k}.png" />`;
    }
    document.querySelector(".login>.appear").innerHTML = appear_img;
}

let loop_img='';
for(let h=0; h<82;h++){
    if(h<10){
        loop_img += `<img src="images/loop/loop_0000${h}.png" />`;
    }else{
        loop_img += `<img src="images/loop/loop_000${h}.png" />`;
    }
    document.querySelector(".login>.loop").innerHTML = loop_img;
}

//로그인 박스 애니메이션
const delay = 0.05; 
const appearImgs = document.querySelectorAll(".appear > img"); 
const loopImgs = document.querySelectorAll(".loop > img");

for(let i=0; i<appearImgs.length; i++){ 
    appearImgs[i].style.animation = `ani  2.85s linear ${delay * i}s 1` 
}
for(let j=0;j<loopImgs.length;j++){
    loopImgs[j].style.animation = `ani  4.1s linear ${2.85+(delay * j)}s infinite`
}


//고객센터 클릭
const topMenuDD = document.querySelector("dl.topMenu>dd:nth-of-type(5)"); 
topMenuDD.addEventListener("click",e => {  
    e.preventDefault();
    e.currentTarget.classList.toggle("on"); 
    if(topMenuDD.classList.contains("on")){ 
       e.currentTarget.children[0].setAttribute("title","고객센터 닫기") ;
    }else{
        e.currentTarget.children[0].setAttribute("title","고객센터 열기") 
    }
})


const header_wrap = document.querySelector(".header_wrap"); 
const gnb = document.querySelectorAll(".gnb>ul>li"); 
const subLists = document.querySelectorAll(".gnb>ul>li>ul");

for(let i=0;i<gnb.length;i++){
    gnb[i].addEventListener("mouseover", e => {
        header_wrap.classList.add("on");
        subLists.forEach(item =>{
            item.classList.add("on");
        })
        if(topMenuDD.classList.contains("on")){
            topMenuDD.classList.remove("on");
        }
        if(srchBox.classList.contains("on")){
            srchBox.classList.remove("on")
            btn_srch.classList.remove("on")
        }

    })
    gnb[i].addEventListener("mouseout", e => {
        header_wrap.classList.remove("on");
        subLists.forEach(item =>{
            item.classList.remove("on");
        })
    })
    gnb[i].children[0].addEventListener("focus", e => {
        header_wrap.classList.add("on");
        subLists.forEach(item =>{
            item.classList.add("on");
        })
    })
    gnb[i].children[0].addEventListener("blur", e => {
        header_wrap.classList.remove("on");
        subLists.forEach(item =>{
            item.classList.remove("on");
        })
    })
}

header_wrap.addEventListener("mouseover",e=>{
    header_wrap.classList.add("on");
    subLists.forEach(item =>{
        item.classList.add("on");
    })
})
header_wrap.addEventListener("mouseout",e=>{
    header_wrap.classList.remove("on");
    subLists.forEach(item =>{
        item.classList.remove("on");
    })
})

//서치박스
const btn_srch = document.querySelector("span.srch_open");
const srchBox = document.querySelector("form.srch");

btn_srch.addEventListener("click", e =>{
    btn_srch.classList.toggle("on");
    srchBox.classList.toggle("on");
})


//배너
const next = document.querySelector(".btn_next"); //배너의 다음버튼 
const prev = document.querySelector(".btn_prev"); //배너의 이전버튼
const bnnFrame = document.querySelector(".banner_frame"); //배너 전체
const bnnSec = document.querySelectorAll(".banner_frame > section"); //0~11번 섹션

let bnnNum = 0;
const lastNum = bnnSec.length - 1;

const bnnRollA = document.querySelectorAll(".banner_rolling > ul > li > a")

const arrowA = document.querySelectorAll(".banner_arrow >a");
const bnnRoll = document.querySelectorAll(".banner_rolling a")

function bnnAction(bannerNumer){ //배너 공통 함수 
    bnnFrame.style.left = `${-bannerNumer * bnnW}px`;

    if(bnnSec[bannerNumer].classList.contains("white")){
        arrowA.forEach(item =>{
            item.classList.add("white")
        })
        bnnRoll.forEach(item=>{
            item.classList.add("white")
        })
    }else{
        arrowA.forEach(item =>{
            item.classList.remove("white")
        })
        bnnRoll.forEach(item=>{
            item.classList.remove("white")
        })
    }

    bnnRollA.forEach(item =>{
        item.classList.remove("on");
    })
    bnnRollA[bannerNumer].classList.add("on");
}

//반응형웹
let bnnW = document.querySelector("body>section").offsetWidth; 

window.addEventListener("resize",()=>{
    bnnW = document.querySelector("body>section").offsetWidth; 
})

bnnAction(0);

//next 
next.addEventListener("click",e=>{
    e.preventDefault();
    bnnNum++;
    if(bnnNum>lastNum) bnnNum=0;

    bnnAction(bnnNum);
})

//prev 
prev.addEventListener("click",e=>{
    e.preventDefault();
    bnnNum--;
    if(bnnNum<0) bnnNum=lastNum;

    bnnAction(bnnNum);
})

//오토배너
function autoBanner(){
    bnnNum++;
    if(bnnNum>lastNum) bnnNum=0;

    bnnAction(bnnNum);

    autobnn = setTimeout(autoBanner,5000);
}
let autobnn = setTimeout(autoBanner,5000)

//재생멈춤버튼
let flag = true;
let bnnPlay = document.querySelector("a.btn_play");

bnnPlay.addEventListener("click",e=>{
    e.preventDefault();
    if(flag){
        clearTimeout(autobnn);
        bnnPlay.classList.add("pause");
        flag = false;
    }else{
        autobnn = setTimeout(autoBanner,5000);
        bnnPlay.classList.remove("pause");
        flag=true;
    }
})

////롤링 클릭 했을때 섹션 보이기.
const bnnRollLists = document.querySelectorAll(".banner_rolling li");

for(let i=0;i<bnnRollLists.length;i++){
    bnnRollLists[i].addEventListener("click",e=>{
        e.preventDefault();
        clearTimeout(autobnn);
        flag = false;
        bnnAction(i);
        bnnPlay.classList.add("pause");
        bnnNum = i;
    })
}

//content1 마우스오버시에 애니메이션
const content1List = document.querySelectorAll(".content1 ul li");

for(let i=0;i<content1List.length;i++){
    content1List[i].addEventListener("mouseover",e=>{
        e.preventDefault();
        for(let k=0;k<20;k++){
            let imgLi = e.currentTarget.children[0].children[0].children;
            imgLi[k].style.animation = `ani  1s linear ${delay * k}s 1`
         }
    })

    content1List[i].addEventListener("mouseout",e=>{
        e.preventDefault();
        for(let k=0;k<20;k++){
            let imgLi = e.currentTarget.children[0].children[0].children;
            imgLi[k].style.animation = "none"
         }
    })
}


// 스크롤이벤트
window.addEventListener("scroll",()=>{
    let scroll = document.querySelector('html').scrollTop;
    //도넛움직이기
    const doughnut_Left_L = document.querySelector(".doughnut_Left_L");
    const doughnut_Left_s = document.querySelector(".doughnut_Left_s");
    const combine_Left = document.querySelector(".combine_Left");

    combine_Left.style.top =`${scroll * 0.7}px`
    doughnut_Left_s.style.top = `${scroll * 0.5}px`
    doughnut_Left_L.style.top =`${1310-scroll * 0.8}px`

  
    const doughnut_Center_M = document.querySelector(".doughnut_Center_M")
    const doughnut_Center_s = document.querySelector(".doughnut_Center_s")

    doughnut_Center_M.style.top = `${1200-scroll * 1.2}px`
    doughnut_Center_s.style.top = `${scroll * 0.1}px`

    const combine_right = document.querySelector(".combine_right");
    const doughnut_right_M = document.querySelector(".doughnut_right_M");

    combine_right.style.top =`${scroll * 0.5}px`
    doughnut_right_M.style.top =`${scroll * 0.5}px`
})


//content3
const all = document.querySelectorAll(".content3>div>div>ul>li") //all
for(let i=0;i<all.length;i++){
    all[i].addEventListener("mouseover",e=>{
        e.preventDefault();
        e.currentTarget.classList.add("on")
    })
    all[i].addEventListener("mouseout",e=>{
        e.preventDefault();
        e.currentTarget.classList.remove("on")
    })
}



const group = document.querySelectorAll(".content3_inner >ul >li>a");
const listAll = document.querySelectorAll('.content3_inner >div> ul> li') 
console.log(listAll)

const ent = document.querySelectorAll(".content3_inner>div > ul> li.ent")
const shop = document.querySelectorAll(".content3_inner>div > ul> li.shop")
const diner = document.querySelectorAll(".content3_inner>div > ul> li.diner")
const box = document.querySelectorAll(".content3_inner >div> ul> li.box")


for(let k=0;k<group.length;k++){
    group[k].addEventListener('click',e=>{
        e.preventDefault();
        group.forEach(item=>{
            item.classList.remove('on');
        });
        e.currentTarget.classList.add('on');

        let className = e.currentTarget.parentElement.getAttribute("class");
        listAll.forEach(item => {
            item.style.display = 'none';
        });
 
        switch(className){
            case'all' : 
            listAll.forEach(item => {
                item.style.display = 'block';
            });
                break;
            case 'ent' :
                ent.forEach(item => {
                    item.style.display = 'block';
                });
                break;
            case 'shop' :
                shop.forEach(item => {
                    item.style.display = 'block';
                });
                break;
            case 'diner' :
                diner.forEach(item => {
                    item.style.display = 'block';
                });
                break;
            case 'box' :
                box.forEach(item => {
                    item.style.display = 'block';
                });
                break;
        }
    })
}



//footer cj그룹계열사 바로가기
const footerDD = document.querySelector(".foot_inner > dl > dd.family_site");

footerDD.addEventListener('click',e=>{
    e.preventDefault();
    e.currentTarget.classList.toggle("on");
})

//top버튼
const topBtn = document.querySelector("div.top");
window.addEventListener('scroll',e=>{
    let scroll = document.querySelector('html').scrollTop;
    console.log(scroll);
    if(scroll <= 0){
        topBtn.classList.remove("on","ab");
    }else if(scroll>2600){
        topBtn.classList.add("ab")
    }else{
        topBtn.classList.remove("ab");
        topBtn.classList.add("on");
    };
})
topBtn.addEventListener("click",e=>{
    e.preventDefault();
    window.scroll({
        top:0,
        behavior:"smooth"
    })
})

//모바일 햄버거 버튼
const mobBtn = document.querySelector("div.mobBtn");
const close = document.querySelector("div.mobBtn_close");

const body = document.querySelector("body");
const bg = document.querySelector("div.bg");
const moblie = document.querySelector("div.mob") 

mobBtn.addEventListener("click",e=>{
    e.preventDefault();

    body.classList.add("on");
    bg.classList.add("on");
    moblie.classList.add("on");
    close.classList.add("on")
    
})
close.addEventListener("click",e=>{
    e.preventDefault();

    body.classList.remove("on");
    bg.classList.remove("on");
    moblie.classList.remove("on");
    close.classList.remove("on")
})

//모바일 고객센터
const mobTopMenuDD = document.querySelector("div.mob dl >dd:nth-of-type(5)>a");

mobTopMenuDD.addEventListener("click",e=>{
    e.currentTarget.parentElement.classList.toggle("on");
})

// 모바일 gnb
const mobGnb = document.querySelectorAll(".mob_gnb>ul>li");

for(let i=0; i<mobGnb.length; i++){
    mobGnb[i].addEventListener('click',e=>{
        e.preventDefault();
        mobGnb[i].classList.toggle("on")
    })
}