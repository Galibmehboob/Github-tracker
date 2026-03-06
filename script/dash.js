console.log('Hah! See Again!')

const allBtn = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"; //promise of response
    fetch(url)//promise of response
        .then(res => res.json())//promise of json
        .then(data => displayIssues(data.data));//
}

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

const displayIssues = (issues) => {
    // console.log(issues)
    const container = document.getElementById('issues-container');

    container.innerHTML = "";

    issues.forEach(data => {

        const card = document.createElement('div');

        card.innerHTML = `
          <div class="card bg-base-100 h-full shadow rounded-md overflow-auto">
    
    <div class="border-t-3 border-green-400 rounded-full"></div>

    <div class="card-body">

        <!-- top section -->
        <div class="flex justify-between items-center">
            <!-- green circle image -->
            <img src="./assets/Open-Status.png">

            <!-- priority -->
            <span class="bg-red-100 text-xs text-red-400 px-6 py-2 rounded-full font-semibold">
                ${data.priority}
            </span>
        </div>

        <!-- title -->
        <h2 class="card-title text-lg font-bold mt-3">
            ${data.title}
        </h2>

        <!-- description -->
        <p class="text-gray-500 text-sm">
            ${data.description}
        </p>

        <!-- tags -->
        <div class="flex gap-3 mt-4">

            <span class="flex items-center gap-2 border border-red-300 text-red-500 text-xs px-2 py-1 rounded-full">
                <i class="fa-solid fa-bug"></i>
                BUG
            </span>

            <span class="flex items-center gap-2 border border-yellow-400 text-yellow-600 px-2 py-1 rounded-full text-xs">
                <i class="fa-regular fa-life-ring"></i>
                HELP WANTED
            </span>

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
allBtn()

// const issueConatainer = document.getElementById('issues-container')