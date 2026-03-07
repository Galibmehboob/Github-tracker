console.log('Hah! See Again!')

let allIssues = [];

const allBtn = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"; //promise of response
    fetch(url)//promise of response
        .then(res => res.json())//promise of json
        .then(data => {
            allIssues = (data.data)
            displayIssues(allIssues);
            updateCount(allIssues);
        });//
}

const removeActive = () => {
    const buttons = document.querySelectorAll(".tabs button");

    buttons.forEach(btn => {
        btn.classList.remove("btn-primary");
    });
}


document.getElementById("all-btn").addEventListener("click", function () {
    removeActive();
    this.classList.add("btn-primary");
    displayIssues(allIssues);
    updateCount(allIssues);
});

document.getElementById("open-btn").addEventListener("click", function () {

    removeActive();
    this.classList.add("btn-primary");
    const openIssues = allIssues.filter(issue => issue.status === "open");

    displayIssues(openIssues);
    updateCount(openIssues);
});

document.getElementById("close-btn").addEventListener("click", function () {

    removeActive();
    this.classList.add("btn-primary");
    const closedIssues = allIssues.filter(issue => issue.status === "closed");

    displayIssues(closedIssues);
    updateCount(closedIssues);
});

// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [2 items],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"

//  <i class="fa-solid fa-tag"></i>
// <i class="fa-solid fa-bug"></i>
// <i class="fa-regular fa-life-ring"></i>

// issue count
const updateCount = (issues) => {
    const count = document.getElementById("issues-count");
    count.innerText = `${issues.length} Issues`;

}
// status color
const getLabelColor = (label) => {

    if (label === "bug")
        return "bg-red-400";

    if (label === "enhancement")
        return "bg-blue-400";

    if (label === "documentation")
        return "bg-purple-400";

    if (label === "good first issue")
        return "bg-green-400";

    if (label === "help wanted")
        return "bg-orange-400";



}
const getLabelTag = (label) => {

    if (label === "bug")
        return `<i class="fa-solid fa-bug"></i>`;

    if (label === "enhancement")
        return `<i class="fa-solid fa-wand-magic-sparkles"></i>`;

    if (label === "documentation")
        return `<i class="fa-brands fa-readme"></i>`;

    if (label === "good first issue")
        return `<i class="fa-brands fa-jira"></i>`;

    if (label === "help wanted")
        return `<i class="fa-brands fa-hire-a-helper"></i>`;

}
const priorityBadge = (priority) => {

    if (priority === "high") return "bg-red-100 text-red-600";

    if (priority === "medium") return "bg-yellow-100 text-yellow-500";

    if (priority === "low") return "bg-gray-100 text-gray-300";

    return "bg-gray-200";

}

const displayIssues = (issues) => {
    // console.log(issues)
    const container = document.getElementById('issues-container');

    container.innerHTML = "";

    issues.forEach(data => {
        const borderColor =
            data.status === "open"
                ? "border-green-400"
                : "border-purple-400";
        const statusImg = data.status === 'open' ? "Open-Status.png" : "Closed- Status .png";

        const badge = priorityBadge(data.priority);

        const badgeTag = `
                  <span class="text-xs ${badge} px-6 py-2 rounded-full font-semibold">
                  ${data.priority.toUpperCase()}
                  </span>
                  `;

        const labelsTag = data.labels.map(label => {
            const color = getLabelColor(label);
            const tag = getLabelTag(label);
            return `
    <span class="flex items-center gap-1 ${color} text-white text-[10px] px-1 py-1  rounded-full">
    ${tag}  ${label.toUpperCase()}
    </span>
    `;

        }).join("");


        const card = document.createElement('div');

        card.innerHTML = `
          <div class="card bg-base-100 h-full shadow rounded-md overflow-auto">
    
    <div class="border-t-3 ${borderColor} rounded-full"></div>

    <div class="card-body">

        <!-- top section -->
        <div class="flex justify-between items-center">
            <!-- green circle image -->
            <img src="./assets/${statusImg}">

            <!-- priority -->
            ${badgeTag}
        </div>

        <!-- title -->
        <h2 class="card-title text-lg font-bold mt-3">
            ${data.title}
        </h2>

        <!-- description -->
        <p class="text-gray-500 text-sm">
            ${data.description}
        </p>

        <!-- labels -->
        <div class="flex gap-3 mt-4">
               <small class="flex gap-2">${labelsTag}</small>
        </div>

    </div>

    <!-- footer -->
    <div class="border-t-2 px-6 py-4 border-gray-200 text-gray-400 text-xs flex justify-between">

        <div >
            <p>#${data.id} by ${data.author}</p>
            <p>Assignee: ${data.assignee || "Unassigned"}</p>
        </div>

        <div class="text-end">
            <p>${new Date(data.createdAt).toLocaleDateString()}</p>
            <p>Updated: ${new Date(data.updatedAt).toLocaleDateString()}</p>
        </div>

    </div>

</div>
        `;

        container.append(card);

    });

}




allBtn();


// const issueConatainer = document.getElementById('issues-container')