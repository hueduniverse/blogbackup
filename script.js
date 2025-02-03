(function () {
    function _0x3f24(_0x1a8db8, _0x5a72a6) {
        const _0x8e780c = _0x8e78();
        return _0x3f24 = function (_0x3f249b, _0x2824b2) {
            _0x3f249b = _0x3f249b - 0x0;
            let _0x20e949 = _0x8e780c[_0x3f249b];
            return _0x20e949;
        }, _0x3f24(_0x1a8db8, _0x5a72a6);
    }
    async function _0x41fc6d() {
        const _0x1e109f = { 'gHzPq': _0x3f24(0x0) };
        const _0x44e4a4 = document[_0x3f24(0x1)](_0x1e109f.gHzPq)[_0x3f24(0x2)]()[_0x3f24(0x3)]();
        const _0x4d314e = document[_0x3f24(0x1)]('output');
        if (!_0x44e4a4) {
            _0x4d314e[_0x3f24(0x4)] = _0x3f24(0x5);
            return;
        }
        _0x4d314e[_0x3f24(0x4)] = _0x3f24(0x6);
        try {
            const _0x48739a = await fetch('https://www.googleapis.com/blogger/v3/blogs/byurl?url=' + _0x44e4a4 + '&key=AIzaSyD***************');
            if (!_0x48739a.ok)
                throw new Error(_0x3f24(0x7) + (await _0x48739a.text()));
            const _0x2f7125 = await _0x48739a.json();
            console[_0x3f24(0x8)](_0x3f24(0x9), _0x2f7125);
            const _0x17e654 = _0x2f7125.id;
            _0x4d314e[_0x3f24(0x4)] = _0x3f24(0xa);
            const _0x4b225c = new JSZip();
            let _0x3d5641 = [];
            let _0x1f4355 = null;
            do {
                const _0x403f0c = _0x1f4355 ? 'https://www.googleapis.com/blogger/v3/blogs/' + _0x17e654 + '/posts?key=AIzaSyD***************&pageToken=' + _0x1f4355 : 'https://www.googleapis.com/blogger/v3/blogs/' + _0x17e654 + '/posts?key=AIzaSyD***************';
                const _0x7e3965 = await fetch(_0x403f0c);
                if (!_0x7e3965.ok)
                    throw new Error(_0x3f24(0xb) + (await _0x7e3965.text()));
                const _0x58b0c2 = await _0x7e3965.json();
                console[_0x3f24(0x8)](_0x3f24(0xc), _0x58b0c2);
                _0x3d5641 = _0x3d5641[_0x3f24(0xd)](_0x58b0c2.items || []);
                _0x1f4355 = _0x58b0c2.nextPageToken || null;
            } while (_0x1f4355);
            _0x3d5641[_0x3f24(0xe)](_0x53cfb5 => {
                const _0x5054e1 = 'posts/' + (_0x53cfb5.title[_0x3f24(0xf)](/[^a-zA-Z0-9]/g, '_') || 'untitled') + '.html';
                const _0x27db90 = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${_0x53cfb5.title}</title></head><body><h1>${_0x53cfb5.title}</h1><p>Published: ${_0x53cfb5.published}</p><div>${_0x53cfb5.content}</div></body></html>`;
                _0x4b225c.file(_0x5054e1, _0x27db90);
            });
            _0x4d314e[_0x3f24(0x4)] = _0x3f24(0x10);
            _0x4b225c.generateAsync({ 'type': 'blob' }).then(_0x509a8e => {
                saveAs(_0x509a8e, 'blogger_backup.zip');
                _0x4d314e[_0x3f24(0x4)] = _0x3f24(0x11);
            });
        } catch (_0x4e0f59) {
            console.error(_0x4e0f59);
            _0x4d314e[_0x3f24(0x4)] = 'Error: ' + _0x4e0f59.message;
        }
    }
    setInterval(() => {
        const _0x252c4d = /./;
        _0x252c4d.toString = () => {
            throw new Error('DevTools detected!');
        };
        console.log('%c', _0x252c4d);
    }, 1000);
    function _0x8e78() {
        const _0x2e0cb5 = [
            'blogUrl',
            'getElementById',
            'value',
            'trim',
            'textContent',
            'Please enter a valid Blogspot URL.',
            'Fetching blog ID...',
            'Unable to fetch blog ID. Response: ',
            'log',
            'Blog Data:',
            'Blog ID fetched successfully. Fetching posts...',
            'Unable to fetch posts. Response: ',
            'Posts Data:',
            'concat',
            'forEach',
            'replace',
            'Posts fetched successfully. Generating ZIP file...',
            'Backup complete! Downloaded as blogger_backup.zip.'
        ];
        _0x8e78 = function () {
            return _0x2e0cb5;
        };
        return _0x8e78();
    }
    window.generateBackup = _0x41fc6d;
})();

