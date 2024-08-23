const $circle = document.querySelector("#circle");
const $score = document.querySelector("#score");

const DEG = 40;

function start() {
    setScore(getScore())
    setImage()
}

function setScore(score) {
    localStorage.setItem("score", score)
    $score.textContent = score
}

function setImage() {
    if (getScore() >= 50) {
        $circle.setAttribute("src", "./assets/lizzard.png")
    }
}

function getScore() {
    return Number(localStorage.getItem("score")) ?? 0
}

function addOne() {
    setScore(getScore() + 1)
}

$circle.addEventListener("click", (event) => {
    const rect = $circle.getBoundingClientRect();
  
    const offSetX = event.clientX - rect.left - rect.width / 2;
    const offSetY = event.clientY - rect.top - rect.height / 2;
  
    const tiltX = (offSetY / rect.height) * DEG;
    const tiltY = (offSetX / rect.width) * -DEG;
  
    $circle.style.setProperty("--tiltX", `${tiltX}deg`);
    $circle.style.setProperty("--tiltY", `${tiltY}deg`);
  
    setTimeout(() => {
      $circle.style.setProperty("--tiltX", "0deg");
      $circle.style.setProperty("--tiltY", "0deg");
    }, 300);
  
    const plusOne = document.createElement("div");
    plusOne.classList.add("plus-one");
    plusOne.textContent = "+1";
    plusOne.style.left = `${event.clientX - rect.left}px`;
    plusOne.style.top = `${event.clientY - rect.top}px`;
  
    $circle.parentElement.appendChild(plusOne);
  
    addOne()
  
    setTimeout(() => {
      plusOne.remove()
    }, 2000)
  });

start()

