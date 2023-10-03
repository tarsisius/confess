document.addEventListener('DOMContentLoaded', () => {
  const copyButton =
    document.querySelector<HTMLButtonElement>('#copy_url_button')
  const urlInput = document.querySelector<HTMLInputElement>('#url_input')
  const copyIcon = document.querySelector<HTMLElement>('#copy_url_icon')
  const copiedIcon = document.querySelector<HTMLElement>('#copied_url_icon')

  if (copyButton && urlInput && copyIcon && copiedIcon) {
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(urlInput.value)
        copyIcon.classList.add('hidden')
        copiedIcon.classList.remove('hidden')
      } catch (err) {
        console.error('Unable to copy text: ', err)
      }
    })
  }
})
