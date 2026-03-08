const issuesContainer = document.getElementById("issuesContainer");
const IssueDetailsModal = document.getElementById("Issue_details_modal")
const totalIssues = document.getElementById("totalIssues")
const allBtn = document.getElementById("allBtn")
const openBtn = document.getElementById("openBtn")
const closedBtn = document.getElementById("closedBtn")

// load issues from jason
async function loadIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues ")
    const data = await res.json();

    // filter loaded data according to btn click
    function handleFilter(type) {
        let filteredIssues;

        if (type === "closed") {
            filteredIssues = data.data.filter(i => i.status === "closed");

        } else if (type === "open") {
            filteredIssues = data.data.filter(i => i.status === "open");
        } else {
            filteredIssues = data.data;
        }
        issuesContainer.innerHTML = " ";
        displayIssues(filteredIssues);
    }

    closedBtn.addEventListener("click", () => handleFilter("closed"));
    openBtn.addEventListener("click", () => handleFilter("open"));
    allBtn.addEventListener("click", () => handleFilter("all"));


    handleFilter("all");


}

function displayIssues(issues) {
    let sum = 0;
    issues.forEach((issue) => {

        sum = sum + 1;
        const card = document.createElement("div")
        card.className = "p-4 space-y-3 border-t-4 border-green-500 rounded-lg"
        if (issue.status === "open") {
            card.className = "p-4 space-y-3 border-t-4 border-green-500 rounded-lg"
        }
        else if (issue.status === "closed") {
            card.className = "p-4 space-y-3 border-t-4 border-violet-500 rounded-lg"
        }

        card.innerHTML = `
     <div class="flex justify-between">
                    <img src="${issue.status === "open" ? "assets/Open-Status.png" : "assets/Closed- Status .png"}" alt="">
                      <p class="text-lg inline-block px-3 py-1 rounded-full ${issue.priority === "high" ? "bg-red-500/20 text-red-600" :
                issue.priority === "medium" ? "bg-amber-600/20 text-amber-700" :
                    "bg-green-500/20 text-green-700"
            }">
    ${issue.priority}
  </p>
                </div>
                <h2 class="text-lg font-bold" onclick="openIssueModal(${issue.id})">${issue.title}</h2>
                <p class="line-clamp-2 text-sm text-black/60">${issue.description}</p>
                <div class="flex gap-2 mb-10">
                    <button class="btn btn-outline rounded-2xl  border-2 border-amber-600 bg-amber-600/30 ">
                       ${issue.labels[0]}</button>
                    <button class="btn btn-outline rounded-2xl border-2 border-amber-600 bg-amber-600/30">
                        ${issue.labels[1]}</button>
                </div>
                 <div class="flex justify-between">
                   <p class="text-black/60">${issue.author}</p>
                   <p class="text-black/60">${issue.assignee}</p> 
                </div>
                 <div class="flex justify-between">
                 <p class="text-black/60">${issue.createdAt}</p>
                 <p class="text-black/60">${issue.updatedAt}</p>
                 </div> `
        issuesContainer.appendChild(card);

    })
    totalIssues.innerText = sum;
}

async function openIssueModal(id) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    const modalData = data.data;

    // Put content directly inside the dialog
    IssueDetailsModal.innerHTML = `
    <div class="modal-box w-11/12 max-w-3xl max-h-[80vh] overflow-y-auto">
      <h3 class="text-lg font-bold">${modalData.title}</h3>

      <p class="py-4">
        <span class="bg-green-500 rounded-3xl text-white px-3 py-1">${modalData.status}</span>
        <span class="mx-2 text-gray-400 text-xl">•</span>
        Opened by ${modalData.assignee}
        <span class="mx-2 text-gray-400 text-xl">•</span>
        ${modalData.updatedAt}
      </p>

      <div class="flex flex-wrap gap-2 my-6">
        ${(modalData.labels || [])
            .map(l => `<span class="btn btn-outline rounded-2xl border-2 border-amber-600 bg-amber-600/30">${l}</span>`)
            .join("")}
      </div>

      <p class="text-sm text-black/60 mb-6">
        ${modalData.description}
      </p>

      <div class="space-y-2">
        <div class="flex justify-between w-8/12">
          <p class="text-black/60">Assignee:</p>
          <p class="text-black/60">Prior</p>
        </div>

        <div class="flex justify-between w-8/12">
          <p class="text-black/60">${modalData.assignee}</p>
          <p class="text-black/60">${modalData.priority ?? "-"}</p>
        </div>
      </div>

      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  `;

    IssueDetailsModal.showModal();
}


loadIssues();