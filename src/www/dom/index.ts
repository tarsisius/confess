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

    const coppyButton = document.getElementById(
      'copy_url_button'
    ) as HTMLButtonElement
    const urlInput = document.getElementById('url_input') as HTMLInputElement

    coppyButton?.addEventListener('click', async () => {
      await navigator.clipboard.writeText(urlInput.value)

      const copyIcon = document.getElementById('copy_url_icon') as HTMLElement
      const copiedIcon = document.getElementById(
        'copied_url_icon'
      ) as HTMLElement

      copyIcon.classList.add('hidden')
      copiedIcon.classList.remove('hidden')
    })
  })
}

console.log('Hello from script.ts')
