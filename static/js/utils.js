function toggle_submit_btn() {
  const elem = document.getElementById('generated_url_collapsible')
  M.Collapsible.getInstance(elem).close()
  elem.style.display = 'none'

  const submit_btn = document.getElementById('submit_btn')
  const clear_btn = document.getElementById('clear_btn')

  if (submit_btn.style.display == 'none') submit_btn.style.display = ''
  else submit_btn.style.display = 'none'

  if (clear_btn.style.display == 'none') clear_btn.style.display = ''
  else clear_btn.style.display = 'none'
}

function clear_submit_form(form) {
  const inputs = form.getElementsByTagName('input')
  for (const input of inputs) {
    input.classList.remove('valid')
    input.value = ''
  }
  toggle_submit_btn()
}

function copy_to_clipboard(elem) {
  if (elem.innerText == '') return
  elem.select()
  document.execCommand('copy')

  if (elem.id == 'generated_secret_key') {
    M.toast({ html: 'copied secret key to clipboard.' })
  } else {
    M.toast({ html: 'copied short url to clipboard.' })
  }
}

function set_status(elem, status_type) {
  msg = status_msgs[status_type]
  if (!msg) {
    msg = status_msgs['UNKNOWN_ERROR'];
    msg.title = `${msg.title} [${status_type}]`
  }

  // title icon color
  elem
    .querySelector('div.collapsible-header')
    .querySelector('i')
    .classList.add(msg.icon_color)

  const title_icon_elem = elem
    .querySelector('div.collapsible-header')
    .querySelector('i')

  const title_elem = elem.querySelector('div.collapsible-header')

  title_icon_elem.innerText = msg.icon
  title_elem.innerHTML = title_elem.innerHTML.replace('STATUS_TITLE', msg.title)

  if (msg.collapsable) {
    elem.getElementsByTagName('li')[0].classList.remove('disabled')

    if (msg.body) {
      elem.querySelector('div.collapsible-body span').textContent = msg.body;
    }

  } else {
    elem.getElementsByTagName('li')[0].classList.add('disabled')
  }
}
