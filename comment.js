const authorName = document.getElementById("author-name");
const textInput = document.getElementById("comment-text");
const submitButton = document.getElementById("submit-button");
const commentsContainer = document.getElementById("comments-container");

// US TAKING DATA FROM DATABASE
async function loadComments() { 
    const response = await fetch("http://localhost:3000/comments");
    const comments = await response.json();

    commentsContainer.innerHTML = "";

    comments.forEach(comment => {
        const div = document.createElement("div")
        div.innerHTML = `
            <strong>${comment.author}</strong>
            <p>${comment.text}</p>
            `;
            commentsContainer.appendChild(div);
});
}

// DATA ENTERING BY USER
submitButton.addEventListener("click", async () => { 
    const author = authorName.value;
    const text = textInput.value;

    await fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({author, text})
    });
    authorName.value = "";
    textInput.value = "";

    loadComments();
});

loadComments();

