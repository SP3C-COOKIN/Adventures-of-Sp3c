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

            <small>${new Date(comment.timestamp).toLocaleString()}</small>
            
            <svg width="80" height="80" viewbox="0 0 100 100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>

            <small>${comment.like}</small>
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

