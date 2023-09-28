async function submit_form_callback(data) {
  delete data.form_id

  const res = await fetch(`${window.location.href}api/add`, {
    method: 'POST',
    body: JSON.stringify(data)
  })

  const elem = document.getElementById('generated_url_collapsible')
  const json = await res.json()
  set_status(elem, json.status_msg)

  if (res.ok) {
    toggle_submit_btn()
    document.getElementById('generated_url').value = json.main_url
    document.getElementById('generated_secret_key').value = json.secret_key

    elem.style.display = ''
    M.Collapsible.getInstance(elem).open()
  } else {
    elem.style.display = ''
  }
}

async function delete_form_callback(data) {
  temp = new URL(data.url_suffix);
  data.url_suffix = temp.pathname.replace("/", "");

  delete data.form_id
  const res = await fetch(`${window.location.href}api/delete`, {
    method: 'POST',
    body: JSON.stringify(data)
  })

  const elem = document.getElementById('deleted_url_collapsible')
  const json = await res.json()
  set_status(elem, json.status_msg)

  if (res.ok) {
    elem.style.display = ''

    document.querySelector('input#delete_url').disabled = true
    document.querySelector('input#secret_key').disabled = true
    document.querySelector('button#delete_btn').disabled = true

    M.Collapsible.getInstance(elem).open()
  } else {
    elem.style.display = ''
  }
}

async function form_callback(data) {
  if (data.form_id == 'submit_url') await submit_form_callback(data)
  if (data.form_id == 'delete_url') await delete_form_callback(data)
}
