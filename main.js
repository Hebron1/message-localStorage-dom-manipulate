// Simpan dulu di localStorage

function savePosts(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
}

function getPosts() {
    const posts = localStorage.getItem('posts');
    return posts ? JSON.parse(posts) : [];
}

if (document.getElementById('posts-list')) {
    const posts = getPosts();
    const postsListDiv = document.getElementById('posts-list');
    
    if (posts.length === 0) {
        postsListDiv.innerHTML = '<p>No posts available</p>';
    } else {
        posts.forEach((post) => {
            const postDiv = document.createElement('div');
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p class="theContent">${post.content}</p>
            `;
            const deleted = document.createElement("i");
            deleted.setAttribute("class", "fas fa-trash-alt delete-icon");
            postDiv.appendChild(deleted)
            postDiv.setAttribute("class", "note");
            postsListDiv.appendChild(postDiv);

            deleted.addEventListener("click", () => {
                const posts = getPosts();
                const findIndexPost = posts.findIndex(p => p.id === post.id);
                if (findIndexPost !== false) {
                    // findIndexPost !== -1
                    posts.splice(findIndexPost, 1);
                    savePosts(posts);
                    postDiv.remove();
                }
            })
        });
    }
}

if (document.getElementById('post-form')) {
    const form = document.getElementById('post-form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        const posts = getPosts();

        const newPost = {
            id: posts.length + 1,
            title: title,
            content: content,
        };

        posts.push(newPost);
        savePosts(posts);

        // Cara redirect praktis
        window.location.href = 'index.html';
    });
}
