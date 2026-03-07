const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");

const cardsContainer = document.getElementById("cardsContainer");
const totalCounter = document.getElementById("totalCounter");

let openIssues = [];
let closedIssues = [];


function switchTab(btnId) {
    allBtn.classList.add("btn-outline");
    openBtn.classList.add("btn-outline");
    closedBtn.classList.add("btn-outline");

    const selected = document.getElementById(btnId);
    selected.classList.add("btn-primary");
    selected.classList.remove("btn-outline");
    if (selected.innerText === "All") {
        displayAllIssues(allIssues);
    } else if (selected.innerText === "Open") {
        displayAllIssues(openIssues);
    } else {
        displayAllIssues(closedIssues);
    }
}

let allIssues = [];
async function allCardLoaded() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    allIssues = data.data;
    openIssues = allIssues.filter(issue => issue.status === "open");
    closedIssues = allIssues.filter(issue => issue.status === "closed");
    displayAllIssues(allIssues);
}

allCardLoaded();

function displayAllIssues(issues) {
    cardsContainer.innerHTML = "";
    issues.forEach(issue => {
        const innerCard = document.createElement("div");

        const borderColor = issue.status === "open" ? "border-t-green-600" : "border-t-purple-600";

        innerCard.className = `bg-base-100 p-7 rounded-xl shadow-lg space-y-3 border-t-4 ${borderColor}`;

        const priorityColor = issue.priority === "high" ? "badge-error" : issue.priority === "medium" ? "badge-warning" : "badge-info";

        const statusImg = issue.status === "open" ? "assets/Open-Status.png" : "assets/Closed- Status .png";

        const lables = issue.labels.map(item => {
            const lableClor = item === "bug" ? "badge-error" : item === "help wanted" ? "badge-warning" : item === "enhancement" ? "badge-success" : item === "good first issue" ? "badge-info" : "badge-accent";

            return `<div class="badge badge-outline ${lableClor} font-bold">${item}</div>`

        }).join("");
        innerCard.innerHTML = `
            <div class="flex justify-between">
                            <img src="${statusImg}" alt="">
                            <div class="badge badge-soft ${priorityColor} font-bold">${issue.priority}</div>
                        </div>
                        <h2 class="text-xl font-semibold">${issue.title}</h2>
                        <p class="text-gray-500">${issue.description}</p>
                        <div class=" flex gap-2 flex-wrap">
                            ${lables}
                        </div>
                        <div class="flex-1 h-px my-4 bg-gray-300"></div>
                        <p class="text-gray-500">#${issue.id} by ${issue.author}</p>
                        <p class="text-gray-500 font-bold">${new Date(issue.createdAt).toLocaleDateString()}</p>
        `;
        cardsContainer.append(innerCard);
    });

    // show total count
    totalCounter.innerText = issues.length;
}