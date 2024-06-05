function toggle_submit_btn () {
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

function set_status (elem, status_type) {
  const t_status_msgs = JSON.parse(JSON.stringify(status_msgs))

  let status_msg = t_status_msgs[status_type]

  if (!status_msg) {
    status_msg = t_status_msgs['UNKNOWN_ERROR']
    status_msg.title = `${status_msg.title} [${status_type}]`
  }

  // title icon color
  elem.querySelector(
    'div.collapsible-header i'
  ).className = `material-icons ${status_msg.icon_color}`

  const title_icon_elem = elem
    .querySelector('div.collapsible-header')
    .querySelector('i')

  const title_elem = elem.querySelector('div.collapsible-header').lastChild

  title_icon_elem.innerText = status_msg.icon
  title_elem.nodeValue = status_msg.title

  if (status_msg.collapsable) {
    elem.getElementsByTagName('li')[0].classList.remove('disabled')

    if (status_msg.body) {
      elem.querySelector('div.collapsible-body span').textContent =
        status_msg.body
    }
  } else {
    elem.getElementsByTagName('li')[0].classList.add('disabled')
  }
}

function form_handle_error (t, nums = false) {
  if (t.validity.patternMismatch) {
    if (nums) {
      t.setCustomValidity('Only alphabets and numbers are allowed.')
    } else {
      t.setCustomValidity('Only alphabets are allowed.')
    }
  } else {
    t.setCustomValidity('')
  }
}

function add_form_event (form_selector) {
  const form_elem = document.querySelector(form_selector)
  form_elem.addEventListener('submit', async event => {
    event.preventDefault()

    let data = { form_id: form_elem.id }
    for (const input of document
      .querySelector(form_selector)
      .querySelectorAll('input')) {
      if (input.name) data[input.name] = input.value
    }
    await form_callback(data)
  })
}

async function submit_form_callback (data) {
  delete data.form_id
  const res = await fetch(`${window.location.origin}/api/add`, {
    method: 'POST',
    body: JSON.stringify(data)
  })

  const elem = document.getElementById('generated_url_collapsible')
  const json = await res.json()
  set_status(elem, json.status_msg)

  if (res.ok) {
    toggle_submit_btn()
    document.getElementById('generated_url').value = `${window.location.origin}/${json.url_suffix}`
    document.getElementById('generated_secret_key').value = json.secret_key

    elem.style.display = ''
    M.Collapsible.getInstance(elem).open()
  } else {
    elem.style.display = ''
  }
}

async function delete_form_callback (data) {
  temp = new URL(data.url_suffix)
  data.url_suffix = temp.pathname.replace('/', '')

  delete data.form_id
  const res = await fetch(`${window.location.origin}/api/delete`, {
    method: 'POST',
    body: JSON.stringify(data)
  })

  const elem = document.getElementById('deleted_url_collapsible')
  const json = await res.json()
  set_status(elem, json.status_msg)

  if (res.ok) {
    elem.style.display = ''

    document.querySelector('input#short_url').disabled = true
    document.querySelector('input#secret_key').disabled = true
    document.querySelector('button#delete_btn').disabled = true

    M.Collapsible.getInstance(elem).open()
  } else {
    elem.style.display = ''
  }
}

async function form_callback (data) {
  if (data.form_id == 'submit_url') await submit_form_callback(data)
  if (data.form_id == 'delete_url') await delete_form_callback(data)
}
