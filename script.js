const notesContainer = document.querySelector(".running-notes .main-rn");
const complteNoteContainer = document.querySelector(".completed-notes .main-rn");
const addBtn = document.querySelector("div.left-div > div > div > div > i.fa.fa-plus");
const saveBtn = document.querySelector("div.left-div > div > div > div > i.fa.fa-save");
let notesAll = localStorage.getItem('notes') !== null ? JSON.parse(localStorage.getItem('notes')) : [];

function getNotes() {
    notesAll.forEach((note) => {
        if (note.status === 'pending'){
            notesContainer.innerHTML += generateNotesTemplate(note.id, note.text, note.status);
        } else {
            complteNoteContainer.innerHTML += generateNotesTemplate(note.id, note.text,note.status);
        }
    })
}

getNotes();

function generateNotesTemplate(id, note, status) {
    let changeStyle = (status === 'completed') ? "fa-solid fa-reply" : "fa fa-check";
    let notesHtml = `<li class="list" id=${id}>
    <div class="notes" contenteditable="true">
    ${note}
    </div>
    <div class="overlay">
        <i class="fa fa-trash"></i>
        <i class='${changeStyle}'></i>
    </div>
    </li>`
    return notesHtml;
}

function storeNotes() {
    const runningNotes = notesContainer.querySelectorAll(".list");
    const complteNote = complteNoteContainer.querySelectorAll(".list");
    notesAll = [];
    runningNotes.forEach((note) => {
        Array.from(note.children).forEach((e) => {
            if (e.classList.contains("notes")) {
                let eachNote = {
                    id: note.id,
                    text: e.innerText,
                    status:'pending'
                }

                notesAll.push(eachNote);
            }
        })
    })

    complteNote.forEach((note) => {
        Array.from(note.children).forEach((e) => {
            if (e.classList.contains("notes")) {
                let eachNote = {
                    id: note.id,
                    text: e.innerText,
                    status:'completed'
                }

                notesAll.push(eachNote);
            }
        })
    })
    localStorage.setItem("notes", JSON.stringify(notesAll));
}

addBtn.addEventListener("click", () => {
    notesContainer.innerHTML += generateNotesTemplate(Math.floor(Math.random() * 100000), "", "pending");
})

saveBtn.addEventListener("click", () => {
    storeNotes();
})

notesContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("fa-trash")) {
        event.target.closest(".list").remove();
        storeNotes();
    }

    if (event.target.classList.contains("fa-check")) {
        notesAll.forEach((note) => {
            if (note.id == event.target.parentElement.parentElement.id){
                note.status = "completed";
            }
        })
        localStorage.setItem("notes", JSON.stringify(notesAll));
    }
});

complteNoteContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("fa-trash")) {
        event.target.closest(".list").remove();
        storeNotes();
    }

    if (event.target.classList.contains("fa-reply")) {
        notesAll.forEach((note) => {
            if (note.id == event.target.parentElement.parentElement.id){
                note.status = "pending";
            }
        })
        localStorage.setItem("notes", JSON.stringify(notesAll));
    }
});

