let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset_btn");

let newGame = document.querySelector("#new_btn");
let msgContainer = document.querySelector(".msg_container");
let msg = document.querySelector("#msg");


let turnO = true; //playerX, playerO - two players
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],       //position of the 9 boxes - 0-8
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0; //again to make count=0 or else it will keep on adding
  enableBtns();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      box.style.color = "#B0D0D3";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      box.style.color = "#F7AF9D";
      turnO = true;
    }
    box.disabled = true; //to disable the button as we can't overwrite on the box
    count++;
    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Oops! Game was a Draw, Play again`;
  msg.style.color = "#49376D";
  msgContainer.style.backgroundColor = "rgb(245, 245, 193)";
  msgContainer.classList.remove("hide");
  disableBtns();
};

const disableBtns = () => { //for disabling boxes when we got our winner
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBtns = () => { //to enable again for playing it again
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Hooray!!! Congratulations, Winner is ${winner}`;
  msg.style.color = "#7494EA";
  msgContainer.style.backgroundColor = "rgb(245, 245, 193)";
  msgContainer.classList.remove("hide");
  disableBtns();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let posn1 = boxes[pattern[0]].innerText;
    let posn2 = boxes[pattern[1]].innerText;
    let posn3 = boxes[pattern[2]].innerText;

    if (posn1 != "" && posn2 != "" && posn3 != "") {
      if (posn1 === posn2 && posn2 === posn3) {
        showWinner(posn1);
      }
    }
  }
};

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
