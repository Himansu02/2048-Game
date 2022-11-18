var board;
var score=0;
var rows=4;
var columns=4;
var maxScore=0;

window.onload=function() {
    setGame();
}

function setGame(){
    board=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

    for(var r=0;r<rows;r++)
    {
        for(var c=0;c<columns;c++)
        {
            var tile=document.createElement("div");
            tile.id=r.toString()+"-"+c.toString();
            var num=board[r][c];
            updateTile(tile,num)
            document.getElementById("board").append(tile)
        }
    }

    setTwo();
    setTwo();

}

function checkVerticalMatching(){
    for(let r=0;r<rows;r++)
    {
        for(let c=0;c<columns-1;c++)
        {
            if(board[c][r]==board[c+1][r])
            {
                return true;
            }
        }
    }
    return false;
}



function checkHorizontalMatching(){
    for(let r=0;r<rows;r++)
    {
        for(let c=0;c<columns-1;c++)
        {
            if(board[r][c]==board[r][c+1])
            {
                return true;
            }
        }
    }
    return false;
}

function gameOver(){
    for(let r=0;r<rows;r++)
    {
        for(let c=0;c<columns;c++)
        {
            if(board[r][c]==2048)
            {
                console.log("You Win");
            }
        }
    }
    if(!hasEmptyTile()&&!checkHorizontalMatching()&&!checkVerticalMatching())
    {
        setTimeout(() => {
            document.getElementById("main-div").style.display="none";
            document.getElementById("finalScore").innerText=score;
            document.getElementById("gameOver").style.display="flex";
        }, 1000);
    }
}

document.getElementById("button").addEventListener("click",()=>{
    document.getElementById("main-div").style.display="block";
    document.getElementById("gameOver").style.display="none";
    if(maxScore<score)
    {
        maxScore=score;
        document.getElementById("max-score").innerHTML=score;
    }
    score=0;
    document.getElementById("score").innerText=score;
    for(let r=0;r<rows;r++)
    {
        for(let c=0;c<columns;c++)
        {
            var tile=document.getElementById(r.toString()+"-"+c.toString());
            board[r][c]=0;
            updateTile(tile,0);
        }
    }
    setTwo()
    setTwo()
})

document.addEventListener("keyup",(e)=>{
    if(e.code=="ArrowLeft")
    {
        slideLeft();
        setTwo();
        gameOver()
    }
    else if(e.code=="ArrowRight")
    {
        slideRight();
        setTwo();
        gameOver()
    }
    else if(e.code=="ArrowUp")
    {
        slideUp();
        setTwo();
        gameOver()
    }
    else if(e.code=="ArrowDown")
    {
        slideDown();
        setTwo();
        gameOver()
    }
    document.getElementById("score").innerText=score;
});

function hasEmptyTile()
{
    for(let r=0;r<rows;r++)
    {
        for(let c=0;c<columns;c++)
        {
            if(board[r][c]==0)
            {
                return true;
            }
        }
    }
    return false;
}

function setTwo(){
    if(!hasEmptyTile()){
        return;
    }

    let founded=false;
    while(!founded)
    {
        let r=Math.floor(Math.random()*rows);
        let c=Math.floor(Math.random()*columns);

        if(board[r][c]==0)
        {
            board[r][c]=2;
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            tile.innerText="2";
            tile.classList.add("x2");
            founded=true;
        }
    }
}

function slideDown(){
    let columnArray;
    for(let c=0;c<columns;c++)
    {
        columnArray=[];
        for(let r=0;r<rows;r++)
        {
            columnArray.push(board[r][c]);
        }
        let row=columnArray;
        row.reverse();
        row=slide(row);
        row.reverse();
        columnArray=row;
        for(let r=0;r<rows;r++)
        {
            board[r][c]=columnArray[r];
        }
        for(let r=0;r<rows;r++)
        {
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideUp()
{
    let columnArray;
    for(let c=0;c<columns;c++)
    {
        columnArray=[];
        for(let r=0;r<rows;r++)
        {
            columnArray.push(board[r][c]);
        }
        let row=columnArray;
        row=slide(row);
        columnArray=row;
        for(let r=0;r<rows;r++)
        {
            board[r][c]=columnArray[r];
        }
        for(let r=0;r<rows;r++)
        {
            let tile=document.getElementById(r.toString()+"-"+c.toString());
            let num=board[r][c];
            updateTile(tile,num);
        }
    }
}

function slide(row){
    row=removeZeros(row);
    
    for(let i=0;i<row.length-1;i++)
    {
        if(row[i]==row[i+1])
        {
            row[i]*=2;
            row[i+1]=0;
            score+=row[i];
        }
    }
    row=removeZeros(row)

    while(row.length!=columns)
    {
        row.push(0);
    }
    return row;
}

function slideLeft(){

        for(var r=0;r<rows;r++)
        {
            let row=board[r];
            row=slide(row);
            board[r]=row;

            for(let c=0;c<columns;c++)
            {
                let tile=document.getElementById(r.toString()+"-"+c.toString())
                let num=board[r][c];
                updateTile(tile,num);
            }
        }
}

function slideRight(){

    for(var r=0;r<rows;r++)
    {
        let row=board[r];
        row.reverse();
        row=slide(row);
        row.reverse();
        board[r]=row;

        for(let c=0;c<columns;c++)
        {
            let tile=document.getElementById(r.toString()+"-"+c.toString())
            let num=board[r][c];
            updateTile(tile,num);
        }
    }
}


function removeZeros(row){
    return row.filter(nums => nums!=0)
}


function updateTile(tile,num)
{
    tile.innerText=""
    tile.classList.value=""
    tile.classList.add("tile")
    if(num>0)
    {
        tile.innerText=num;
            if(num<=4096)
        {
            tile.classList.add("x"+num.toString())
        }
        else{
            tile.classList.add("x8192");
        }
    }
    
}