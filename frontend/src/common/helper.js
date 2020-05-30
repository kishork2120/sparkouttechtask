// Error/Exception response handler
export function responseHandler(response, history) {
  console.log(response);
  if (response.status === 401) {
    sessionStorage.setItem('user', null);
    history.push('/');
    return alert(response.message);
  } else {
    return alert(response.message);
  }
}

// Get email from session
export function getEmailFromSession() {
  return JSON.parse(sessionStorage.getItem('user')).email;
}

// handling move to next field when pressing enter
export function handleEnter(event) {
  if (event.keyCode === 13) {
    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);
    form.elements[index + 1].focus();
    event.preventDefault();
  }
}
