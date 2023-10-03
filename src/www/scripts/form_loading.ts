if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    const send = document.querySelector<HTMLElement>('#send')
    const loader = document.querySelector<HTMLElement>('#loader')

    function toggleElements(show: boolean) {
      send?.classList.toggle('hidden', !show)
      loader?.classList.toggle('hidden', show)
    }

    document.body.addEventListener('htmx:beforeRequest', () => {
      toggleElements(false)
    })

    document.body.addEventListener('htmx:beforeOnLoad', () => {
      toggleElements(true)
    })

    // Clear message input after send
    document.body.addEventListener('htmx:afterRequest', (e) => {
      //@ts-expect-error
      const isSuccessful = e?.detail?.successful
      if (isSuccessful) {
        const messageInput =
          document.querySelector<HTMLInputElement>('#message')
        if (messageInput) messageInput.value = ''
      }
    })
  })
}
