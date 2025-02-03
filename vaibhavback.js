(function() {
    function _0x3b4f(_0x5bfa0b, _0x4b90d8) {
        const _0x26d384 = _0x4197();
        return _0x3b4f = function(_0x1aa47e, _0x500d58) {
            _0x1aa47e = _0x1aa47e - 0x1b0;
            let _0x50ff5c = _0x26d384[_0x1aa47e];
            return _0x50ff5c;
        }, _0x3b4f(_0x5bfa0b, _0x4b90d8);
    }
    
    async function generateBackup() {
        const _0x2fc4d3 = document[_0x3b4f(0x1b2)]("blogUrl")[_0x3b4f(0x1b4)]()[_0x3b4f(0x1b6)]();
        const _0x4da403 = document[_0x3b4f(0x1b2)]("output");

        if (!_0x2fc4d3) {
            _0x4da403[_0x3b4f(0x1b7)] = "Please enter a valid Blogspot URL.";
            return;
        }

        _0x4da403[_0x3b4f(0x1b7)] = "Fetching blog ID...";
        try {
            const _0x3bb054 = await fetch(`https://www.googleapis.com/blogger/v3/blogs/byurl?url=${_0x2fc4d3}&key=AIzaSyDkaLzE7iExkNE97MWid7-cVb4cZvMlCas`);
            if (!_0x3bb054.ok) throw new Error("Unable to fetch blog ID.");

            const _0x3d956f = await _0x3bb054.json();
            const _0x5aa484 = _0x3d956f.id;

            _0x4da403[_0x3b4f(0x1b7)] = "Blog ID fetched successfully. Fetching posts...";
            const _0x5bf1b8 = new JSZip();
            let _0x5af98c = [];
            let _0x41dc27 = null;

            do {
                const _0x1f8039 = _0x41dc27
                    ? `https://www.googleapis.com/blogger/v3/blogs/${_0x5aa484}/posts?key=AIzaSyDkaLzE7iExkNE97MWid7-cVb4cZvMlCas&pageToken=${_0x41dc27}`
                    : `https://www.googleapis.com/blogger/v3/blogs/${_0x5aa484}/posts?key=AIzaSyDkaLzE7iExkNE97MWid7-cVb4cZvMlCas`;

                const _0x300eec = await fetch(_0x1f8039);
                if (!_0x300eec.ok) throw new Error("Unable to fetch posts.");

                const _0x10bdca = await _0x300eec.json();
                _0x5af98c = _0x5af98c.concat(_0x10bdca.items || []);
                _0x41dc27 = _0x10bdca.nextPageToken || null;
            } while (_0x41dc27);

            _0x5af98c.forEach(_0x1d5714 => {
                const _0xae2632 = `posts/${_0x1d5714.title.replace(/[^a-zA-Z0-9]/g, "_") || "untitled"}.html`;
                const _0x2aa02b = `<html><head><title>${_0x1d5714.title}</title></head><body><h1>${_0x1d5714.title}</h1><p>${_0x1d5714.published}</p><div>${_0x1d5714.content}</div></body></html>`;
                _0x5bf1b8.file(_0xae2632, _0x2aa02b);
            });

            _0x4da403[_0x3b4f(0x1b7)] = "Posts fetched successfully. Generating ZIP file...";
            _0x5bf1b8.generateAsync({ 'type': "blob" }).then(_0x1f6588 => {
                saveAs(_0x1f6588, "blogger_backup_by_hueduniverse.zip");
                _0x4da403[_0x3b4f(0x1b7)] = "Backup complete! Downloaded as blogger_backup.zip.";
            });

        } catch (_0x2a7a0f) {
            console.error(_0x2a7a0f);
            _0x4da403[_0x3b4f(0x1b7)] = "Error: " + _0x2a7a0f.message;
        }
    }

    function _0x4197() {
        const _0x4007a5 = ["textContent", "getElementById", "value", "trim"];
        _0x4197 = function() {
            return _0x4007a5;
        };
        return _0x4197();
    }

    setInterval(() => {
        const _0x2cc263 = /./;
        _0x2cc263.toString = () => {
            throw new Error("DevTools detected!");
        };
        console.log("%c", _0x2cc263);
    }, 1000);

})();
