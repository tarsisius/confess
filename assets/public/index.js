"use strict";
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        const send = document.getElementById('send');
        const loader = document.getElementById('loader');
        function toggleElements(show) {
            send.classList.toggle('hidden', !show);
            loader.classList.toggle('hidden', show);
        }
        document.body.addEventListener('htmx:beforeRequest', () => toggleElements(false));
        document.body.addEventListener('htmx:beforeOnLoad', () => toggleElements(true));
        const coppyButton = document.getElementById('copy_url_button');
        const urlInput = document.getElementById('url_input');
        coppyButton?.addEventListener('click', async () => {
            await navigator.clipboard.writeText(urlInput.value);
            const copyIcon = document.getElementById('copy_url_icon');
            const copiedIcon = document.getElementById('copied_url_icon');
            copyIcon.classList.add('hidden');
            copiedIcon.classList.remove('hidden');
        });
    });
}
console.log('Hello from script.ts');
