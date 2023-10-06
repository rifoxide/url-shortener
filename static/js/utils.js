function clear_submit_form (form) {
  const inputs = form.getElementsByTagName('input')
  for (const input of inputs) {
    input.classList.remove('valid')
    input.value = ''
  }
  toggle_submit_btn()
}

function copy_to_clipboard (elem) {
  if (elem.innerText == '') return
  elem.select()
  document.execCommand('copy')

  if (elem.id == 'generated_secret_key') {
    M.toast({ html: 'copied secret key to clipboard.' })
  } else {
    M.toast({ html: 'copied short url to clipboard.' })
  }
}
