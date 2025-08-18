// margins script 
const colors = ["#FFCA3F", "#2DB34A", "#68CFF1", "#D32D20"];
const left = document.querySelector(".lines-left");
const right = document.querySelector(".lines-right");

function generateLines(container, count, align) {
    for (let i = 0; i < count; i++) {
        const line = document.createElement("div");
        line.classList.add("line");

        // random size
        const length = (Math.random() * (10 - 5) + 5).toFixed(1);
        line.style.width = length + "vw";

        // random color
        line.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        line.style.alignSelf = align;

        container.appendChild(line);
    }
}

generateLines(left, 36, "flex-start");
generateLines(right, 36, "flex-end");