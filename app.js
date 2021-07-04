const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"; //검정색
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white"; // 처음 기본 배경색 설정
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); //처음 기본 배경색 채워놓기

ctx.strokeStyle = INITIAL_COLOR; //선 색깔
ctx.fillStyle = INITIAL_COLOR; //채우기 색깔
ctx.lineWidth = 2.5; //선 굵기

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    //offsetX, Y는 전체 브라우저 화면에서의 좌표 아닌 캔버스 내에서의 좌표 의미
    //반면 clientX, Y는 전체 브라우저 화면에서의 좌표를 나타낸다
    if(!painting){
        ctx.beginPath(); //경로 생성
        ctx.moveTo(x, y); //선 시작 좌표
    } else {
        ctx.lineTo(x, y); //선 끝 좌표
        ctx.stroke(); //선 그리기
    }
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; //선 그리기 색깔
    ctx.fillStyle = color; //전체 채우기 색깔
}

function changeRange(event){
    const brushSize = event.target.value;
    ctx.lineWidth = brushSize;
}

function switchMode(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "paint";   
    }   
}

function fillCanvas(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
    //우클릭하면 메뉴가 뜨는 기본값이 실행되지 않는다
    //고로 이미지 저장 등 불가능
}

function saveImg(){
    const img = canvas.toDataURL();
    //toDataURL() 이미지 주소. png로 받아줌
    //toDataURL(image/jpg) 이렇게 하면 jpg로 받아줌
    const link = document.createElement("a");
    link.href = img;
    //이미지 주소를 링크에 넣어줌
    link.download = "PaintJS"; 
    //저장될 이미지의 파일명
    link.click();
    //클릭함으로서 위의 과정들이 실행되고 파일은 잘 저장됨
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    //mousemove 마우스가 캔버스 내에서 움직이는 것
    canvas.addEventListener("mousedown", startPainting);
    //mousedown 마우스가 클릭되는 것
    canvas.addEventListener("mouseup", stopPainting);
    //mouseup 마우스 클릭했다가 클릭 버튼 놓는 것
    canvas.addEventListener("mouseleave", stopPainting);
    //mouseleave 마우스가 캔버스 밖으로 이탈
    canvas.addEventListener("click", fillCanvas);
    //캔버스 클릭하면 전체 채우기
    canvas.addEventListener("contextmenu", handleCM);
    //마우스 우클릭하면 뜨는 메뉴
}

Array.from(colors).forEach(color => color.addEventListener("click", changeColor));
//color는 colors array속 하나씩을 받아주는 역할임
//고로 이름은 자유롭게 지정가능 color 아니여도 potato, a 다 넣어도 돌아감

if(range){
    range.addEventListener("input", changeRange);
}

if(mode){
    mode.addEventListener("click", switchMode);
}

if(save){
    save.addEventListener("click", saveImg);
}