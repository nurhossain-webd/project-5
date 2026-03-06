const issuesContainer = document.getElementById("issuesContainer");



// load issues from jason
async function loadIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues ")
    const data = await res.json();
    displayIssues(data.data);
    console.log(data.data)
}

function displayIssues(issues) {
    issues.forEach((issue) => {
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
                    <img src="assets/Open-Status.png" alt="">
                    <p class="text-lg">${issue.priority}</p>
                </div>
                <h2 class="text-lg font-bold">${issue.title}</h2>
                <p class="line-clamp-2 text-sm text-black/60">${issue.description}</p>
                <div class="flex gap-2 mb-10">
                    <button class="btn btn-outline rounded-2xl  border-2 border-amber-600 bg-amber-600/30 ">
                       ${issue.labels[0]}</button>
                    <button class="btn btn-outline rounded-2xl border-2 border-amber-600 bg-amber-600/30">
                        ${issue.labels[0]}</button>
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
}
loadIssues();