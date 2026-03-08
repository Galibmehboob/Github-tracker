console.log('Hah! See you Again!')

let allIssues = [];

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-issue");

searchBtn.addEventListener("click", () => {

    if (window.innerWidth < 768) {

        if (searchInput.classList.contains("hidden")) {
            searchInput.classList.remove("hidden");
            searchInput.classList.add("block");
            searchInput.focus();
        } else {
            searchInput.classList.add("hidden");
        }

    }

});

//Search section
document.getElementById('search-btn').addEventListener("click", () => {
    const input = document.getElementById('search-issue');
    const searchValue = input.value.trim().toLowerCase();
    // console.log(searchValue)
    if (searchValue === "") {
        displayIssues(allIssues);
        updateCount(allIssues);
        return;
    }
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
        .then(res => res.json())
        .then(search => {
            const allCard = search.data;
            // console.log(allCard);
            const filterCards = allCard.filter(issue => issue.title.toLowerCase().includes(searchValue));
            displayIssues(filterCards);
            updateCount(filterCards);
        })
})

// fetch section
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

const loadIssueDetails = (id) => {

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then(res => res.json())
        .then(data => showModal(data.data))

}



// button section
document.getElementById("all-btn").addEventListener("click", function () {
    removeActive();
    loadingSpin(true);
    this.classList.add("btn-primary");
    setTimeout(() => {

        displayIssues(allIssues);
        updateCount(allIssues);
    }, 300);
});

document.getElementById("open-btn").addEventListener("click", function () {

    removeActive();
    loadingSpin(true);
    this.classList.add("btn-primary");
    setTimeout(() => {
        const openIssues = allIssues.filter(issue => issue.status === "open");
        displayIssues(openIssues);
        updateCount(openIssues);
    }, 300)

});

document.getElementById("close-btn").addEventListener("click", function () {

    removeActive();
    loadingSpin(true);
    this.classList.add("btn-primary");
    setTimeout(() => {
        const closedIssues = allIssues.filter(issue => issue.status === "closed");
        displayIssues(closedIssues);
        updateCount(closedIssues);
    }, 300)

});


// "id": 
// "title": 
// "description": 
// "status": 
// "labels":
// "priority":
// "author": 
// "assignee": 
// "createdAt":
// "updatedAt": 


// Added loading spinner
const loadingSpin = (status) => {
    if (status == true) {
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('issues-container').classList.add('hidden')
    } else {
        document.getElementById('spinner').classList.add('hidden')
        document.getElementById('issues-container').classList.remove('hidden')
    }
}
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

// Functions
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
          <div onclick="loadIssueDetails(${data.id})" class="card bg-base-100 h-full shadow rounded-md overflow-auto cursor-pointer">
    
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
    loadingSpin(false);

}



const showModal = (issue) => {

    const modal = document.getElementById('modal-content');
    const labelsMod = issue.labels.map(label => {
        const bg = getLabelColor(label);
        const bd = getLabelTag(label);
        return `
<span class="flex items-center gap-1 ${bg} text-white text-xs px-2 py-1 rounded-full">
    ${bd} ${label.toUpperCase()}
</span>
`;
    }).join("");

    const priobdg = priorityBadge(issue.priority);
    const prioTag = `
                  <span class="text-xs ${priobdg} px-6 py-2 rounded-full font-semibold">
                  ${issue.priority.toUpperCase()}
                  </span>
                  `;


    const statusColor =
        issue.status === "open"
            ? "bg-green-300"
            : "bg-purple-300";
    modal.innerHTML = `
<h1 class="text-lg font-bold mt-3">${issue.title}</h1>

<div class="flex gap-2 text-sm text-gray-400">
<p class="px-2 flex items-center justify-center rounded-lg text-xs text-white ${statusColor}">
${issue.status}
</p>
*
<p>Opened by-${issue.author}</p>
*
<p>${new Date(issue.createdAt).toLocaleDateString()}</p>
</div>

<div class="flex gap-2 mt-3">
${labelsMod}
</div>

<p class="mt-3 text-gray-400">${issue.description}</p>

<div class="flex justify-between m-5 p-5 shadow bg-gray-100 rounded-lg">
<p>${issue.assignee || "Unassigned"}</p>
<p>${prioTag}</p>
</div>
`;
    document.getElementById("issue_modal").checked = true;

}






allBtn();


// const issueConatainer = document.getElementById('issues-container')