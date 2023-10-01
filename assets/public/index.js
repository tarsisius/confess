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
    });
}
console.log('Hello from script.ts');
