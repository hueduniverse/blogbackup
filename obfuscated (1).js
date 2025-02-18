(function() {
    const _0x123abc = async function(_0x789url) {
        const _0xabcApiKey = 'AIzaSyDkaLzE7iExkNE97MWid7-cVb4cZvMlCas';
        try {
            const _0x123res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/byurl?url=${_0x789url}&key=${_0xabcApiKey}`);
            if (!_0x123res.ok) throw new Error('Invalid blog URL.');
            const _0x789data = await _0x123res.json();
            const _0x456blogId = _0x789data.id;
            const _0x456posts = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${_0x456blogId}/posts?key=${_0xabcApiKey}`);
            if (!_0x456posts.ok) throw new Error('Failed to fetch posts.');
            return (await _0x456posts.json()).items;
        } catch (_0xerror) {
            throw new Error(_0xerror.message);
        }
    };

    const _0xrenderPosts = async function() {
        const _0xblogUrl = document.getElementById('blogUrl').value;
        const _0xpostListDiv = document.getElementById('postList');
        const _0xoutputDiv = document.getElementById('output');
        try {
            _0xpostListDiv.innerHTML = '<p>Loading posts...</p>';
            const _0xposts = await _0x123abc(_0xblogUrl);
            _0xpostListDiv.innerHTML = _0xposts.map((_0xpost) => `
                <div>
                    <input type="checkbox" id="${_0xpost.id}" value="${_0xpost.id}">
                    <label for="${_0xpost.id}">${_0xpost.title}</label>
                </div>
            `).join('');
        } catch (_0xerror) {
            _0xpostListDiv.innerHTML = '';
            _0xoutputDiv.innerHTML = `<p>${_0xerror.message}</p>`;
        }
    };

    const _0xbackupSelected = async function() {
        const _0xselectedPosts = Array.from(document.querySelectorAll('#postList input:checked')).map((_0xcheckbox) => _0xcheckbox.value);
        if (_0xselectedPosts.length === 0) {
            alert('Please select at least one post.');
            return;
        }
        const _0xblogUrl = document.getElementById('blogUrl').value;
        try {
            const _0xposts = await _0x123abc(_0xblogUrl);
            const _0xzip = new JSZip();
            for (let _0xpostId of _0xselectedPosts) {
                const _0xpost = _0xposts.find((_0xpost) => _0xpost.id === _0xpostId);
                if (_0xpost) {
                    _0xzip.file(`${_0xpost.title}.html`, _0xpost.content || '');
                }
            }
            const _0xzipBlob = await _0xzip.generateAsync({ type: 'blob' });
            saveAs(_0xzipBlob, 'blogger_backup.zip');
        } catch (_0xerror) {
            console.error('Error:', _0xerror.message);
        }
    };

    window.validateAndFetchPosts = function() {
        const _0xblogUrl = document.getElementById('blogUrl').value;
        const _0xvalid = /^https?:\/\/([a-zA-Z0-9_-]+)\.blogspot\.com(\/)?$/.test(_0xblogUrl);
        if (!_0xvalid) {
            document.getElementById('output').innerHTML = '<p>Invalid Blogger URL. Please enter a valid URL.</p>';
        } else {
            _0xrenderPosts();
        }
    };

    window.generateBackup = _0xbackupSelected;
})();
