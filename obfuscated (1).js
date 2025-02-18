const API_KEY = 'AIzaSyDkaLzE7iExkNE97MWid7-cVb4cZvMlCas';
let posts = [];

// Fetch posts from Blogger API
async function fetchPosts() {
    const blogUrl = document.getElementById("blogUrl").value.trim();
    const outputDiv = document.getElementById("output");
    const postListDiv = document.getElementById("postList");
    const backupButton = document.getElementById("backupButton");

    // Clear previous data
    outputDiv.innerHTML = "";
    postListDiv.innerHTML = "";
    backupButton.style.display = "none";

    if (!/^https?:\/\/[a-zA-Z0-9-]+\.blogspot\.com/.test(blogUrl)) {
        outputDiv.innerHTML = "Invalid Blogger URL. Please enter a valid URL.";
        return;
    }

    outputDiv.innerHTML = "Fetching posts...";

    try {
        // Fetch Blog ID
        const blogResponse = await fetch(`https://www.googleapis.com/blogger/v3/blogs/byurl?url=${blogUrl}&key=${API_KEY}`);
        if (!blogResponse.ok) throw new Error("Failed to fetch the blog. Check your URL or API Key.");
        const blogData = await blogResponse.json();

        // Fetch Posts
        const postsResponse = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogData.id}/posts?key=${API_KEY}`);
        if (!postsResponse.ok) throw new Error("Failed to fetch posts. Please try again later.");
        const postData = await postsResponse.json();

        if (postData.items && postData.items.length > 0) {
            posts = postData.items;
            postListDiv.innerHTML = posts
                .map(post => `<div><input type="checkbox" id="${post.id}" value="${post.id}"><label for="${post.id}">${post.title}</label></div>`)
                .join("");
            backupButton.style.display = "block";
            outputDiv.innerHTML = "Select posts to back up.";
        } else {
            outputDiv.innerHTML = "No posts found on this blog.";
        }
    } catch (error) {
        console.error(error);
        outputDiv.innerHTML = `Error: ${error.message}`;
    }
}

// Backup selected posts
async function backupPosts() {
    const selectedPosts = Array.from(document.querySelectorAll('#postList input:checked')).map(cb => cb.value);

    if (selectedPosts.length === 0) {
        alert("Please select at least one post to back up.");
        return;
    }

    const zip = new JSZip();
    selectedPosts.forEach(postId => {
        const post = posts.find(p => p.id === postId);
        if (post) {
            zip.file(`${post.title}.html`, post.content || "No content available");
        }
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "blogger_backup.zip");
}
