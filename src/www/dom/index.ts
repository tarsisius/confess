if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    const send = document.getElementById('send') as HTMLElement
    const loader = document.getElementById('loader') as HTMLElement

    function toggleElements(show: boolean) {
      send.classList.toggle('hidden', !show)
      loader.classList.toggle('hidden', show)
    }

    document.body.addEventListener('htmx:beforeRequest', () =>
      toggleElements(false)
    )
    document.body.addEventListener('htmx:beforeOnLoad', () =>
      toggleElements(true)
    )
  })
}

console.log('Hello from script.ts')
