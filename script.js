async function generateBackup() {
  const blogUrl = document.getElementById("blogUrl").value.trim();
  const outputDiv = document.getElementById("output");

  if (!blogUrl) {
    outputDiv.textContent = "Please enter a valid Blogspot URL.";
    return;
  }

  outputDiv.textContent = "Fetching blog ID...";

  try {
    // Fetch Blog ID
    const blogIdResponse = await fetch(
      `https://www.googleapis.com/blogger/v3/blogs/byurl?url=${blogUrl}&key=AIzaSyDkaLzE7iExkNE97MWid7-cVb4cZvMlCas`
    );

    if (!blogIdResponse.ok) {
      throw new Error("Unable to fetch blog ID. Response: " + (await blogIdResponse.text()));
    }

    const blogData = await blogIdResponse.json();
    console.log("Blog Data:", blogData);
    const blogId = blogData.id;

    outputDiv.textContent = "Blog ID fetched successfully. Fetching posts...";

    // Initialize ZIP archive
    const zip = new JSZip();
    let posts = [];
    let nextPageToken = null;

    // Fetch Posts Only (Pages Removed)
    do {
      const url = nextPageToken
        ? `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=AIzaSyDkaLzE7iExkNE97MWid7-cVb4cZvMlCas&pageToken=${nextPageToken}`
        : `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=AIzaSyDkaLzE7iExkNE97MWid7-cVb4cZvMlCas`;

      const postsResponse = await fetch(url);

      if (!postsResponse.ok) {
        throw new Error("Unable to fetch posts. Response: " + (await postsResponse.text()));
      }

      const postsData = await postsResponse.json();
      console.log("Posts Data:", postsData);
      posts = posts.concat(postsData.items || []);
      nextPageToken = postsData.nextPageToken || null;
    } while (nextPageToken);

    // Add posts to ZIP
    posts.forEach((post) => {
      const fileName = `posts/${post.title.replace(/[^a-zA-Z0-9]/g, "_") || "untitled"}.html`;
      const content = `
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8"><title>${post.title}</title></head>
        <body>
          <h1>${post.title}</h1>
          <p>Published: ${post.published}</p>
          <div>${post.content}</div>
        </body>
        </html>`;
      zip.file(fileName, content);
    });

    outputDiv.textContent = "Posts fetched successfully. Generating ZIP file...";

    // Generate and Download ZIP
    zip.generateAsync({ type: "blob" }).then((blob) => {
      saveAs(blob, "blogger_backup.zip");
      outputDiv.textContent = "Backup complete! Downloaded as blogger_backup.zip.";
    });

  } catch (error) {
    console.error(error);
    outputDiv.textContent = "Error: " + error.message;
  }
}

// DevTools Detection
setInterval(() => {
  const devtools = /./;
  devtools.toString = () => { throw new Error("DevTools detected!"); };
  console.log("%c", devtools);
}, 1000);
