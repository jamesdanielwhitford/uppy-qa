import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import Dashboard from '@uppy/dashboard';

const uploadUrl = `${process.env.HOST_URL}/image`;

const uppy = new Uppy()
    .use(Dashboard, {
        inline: true,
        target: '#drag-drop-area',
    })
    .use(XHRUpload, {
        endpoint: uploadUrl,
        fieldName: 'userFile',
        formData: true,
    })

uppy.on('complete', (result) => {
    console.log(result);
    for (const file of result.successful) {
        const url = `${process.env.STATIC_HOST_URL}/${file.response.body.msg}`;
        const link = document.createElement('a');
        link.href = url;
        link.innerHTML = url;
        const li = document.createElement('li');
        li.appendChild(link);
        document.getElementById('links').appendChild(li);
    }
});