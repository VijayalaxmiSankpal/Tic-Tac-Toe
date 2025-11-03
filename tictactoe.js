let boxes=document.querySelectorAll(".box");
let resetbutn=document.querySelector("#reset");
let newbutn=document.querySelector("#newGame");
let msgbox=document.querySelector(".msg");
let msg=document.querySelector("#msg");

let turnO=true;
let count=0;
let gameOver=false;

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        // console.log("box was clicked");
        if(!gameOver && box.textContent===""){
            box.textContent=turnO;
            count++;
        }
        if(turnO){
            box.innerText="O";
            turnO=false;
        }else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;

        checkwinner();
    });
});

const disableboxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgbox.classList.remove("hide");
    disableboxes();
}

const checkwinner=()=>{
    for(let pattern of winPatterns){
        // console.log(pattern[0],pattern[1],pattern[2],);
        // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);
        let pos1val= boxes[pattern[0]].innerText;
        let pos2val= boxes[pattern[1]].innerText;
        let pos3val= boxes[pattern[2]].innerText;

        if(pos1val!="" && pos2val!="" && pos3val!=""){
            if (pos1val===pos2val && pos2val===pos3val){
                // console.log("Winner",pos1val);
                showWinner(pos1val);
            }else if(count===9 || pos1val!==pos2val && pos2val!==pos3val){
                    draw();
                    gameOver=true;
            }
        }
        
        
    }
}

const restGame=()=>{
    turnO=true;
    enableboxes();
    msgbox.classList.add("hide");
}

const enableboxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

newbutn.addEventListener("click",restGame);
resetbutn.addEventListener("click",restGame);

const draw=()=>{
    msg.innerText=`Match is a Draw`;
    msgbox.classList.remove("hide");
    disableboxes();
}