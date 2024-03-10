document.addEventListener('DOMContentLoaded', function () {
    const url = 'app.php'
    sendRequest('GET', url).then(data => {
        renderMessages(data)
    }).catch(error => {
        console.log(error)
        renderInfoMsg(true)
    })

    watchingForm()
    document.querySelector('.btn_send-form').addEventListener('click', (e) => {
        e.preventDefault()
        let form = document.forms.messageForm
        if (checkForm(form)) {
            sendForm(form, url)
        }
    })
})

function sendRequest(method, url, body = null) {
    return fetch(url, {
        method: method,
        body: body,
    }).then(response => {
        if (response.ok) {
            return response.json()
        }
    })
}

function checkForm(form) {
    let result = true
    let error = 0
    let inputs = form.querySelectorAll('input, textarea')
    inputs.forEach((input) => {
        if (input.type === 'submit') return
        if (input.value.trim() === '') {
            error++
            input.value = 'Обязательное поле'
        }
        if(input.value.trim().length < 3) {
            error++
            input.value = 'Поле должно содержать больше 3 символов'
        }
        if(input.value.trim().length < 3) {
            error++
            input.value = 'Поле должно содержать больше 3 символов'
        }
        if (input.type === 'email' && !input.value.includes('@')) {
            error++
            input.value = 'Неверный формат почтового адреса'
        }
        if (error !== 0) {
            formErrorAction(input.parentNode)
            input.parentNode.classList.add('filled')
            setTimeout(() => {
                input.parentNode.classList.remove('filled')
                input.value = ''
            }, 1500)
            result = false
        }
    })
    return result
}

function watchingForm() {
    let inputs = document.forms.messageForm.querySelectorAll('input, textarea')
    inputs.forEach((input) => {
        if (input.type === 'submit') return
        let inputParent = input.parentNode
        input.addEventListener('focus', () => {
            inputParent.classList.add('focused')
            if (inputParent.classList.contains('error')) {
                input.value = ''
                formErrorAction(inputParent, true)
            }
        })
        input.addEventListener('input', () => {
            inputParent.classList.add('filled')
        })
        input.addEventListener('blur', () => {
            inputParent.classList.remove('focused')
            if (input.value === '') inputParent.classList.remove('filled')
        })
    })
}

function sendForm(form, url) {
    let body = new FormData(form)

    sendRequest('POST', url, body).then(data => {
        form.reset()
        renderMessages(data)
        renderInfoMsg()
    }).catch(error => {
        console.log(error)
        renderInfoMsg(true)
    }).finally(() => {
        popupAction(true)
    })
}

function formErrorAction(input, removeError = false) {
    if (removeError) {
        input.classList.remove('error')
    } else {
        input.classList.add('error')
    }
}

function renderInfoMsg(error = false) {
    let div = addElement('div', 'info')
    let body = addElement('div', 'info_body')
    let h3 = addElement('h3', '', 'Успех!')
    let p = addElement('p', '', 'Сообщение добавлено.')
    let icon = addElement('div', 'info_icon')
    let close = addElement('div', 'info_close')
    close.innerHTML = `<svg onclick="closeInfo()" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="sc-bcXHqe bPVbdI"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.9398 12.0006L6.84834 16.0921L7.90899 17.1528L12.0005 13.0613L16.092 17.1528L17.1526 16.0921L13.0611 12.0006L17.1526 7.90911L16.092 6.84845L12.0005 10.9399L7.90901 6.84845L6.84835 7.90911L10.9398 12.0006Z"></path></svg>`
    if (error) {
        div.classList.add('error')
        h3.innerText = 'Ошибка!'
        p.innerText = 'Попробуйте еще раз.'
        icon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="rgba(255,12,12,1)" class="sc-bcXHqe NcSfy"><circle opacity="0.7" cx="12" cy="12" r="10"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M10.9393 12L7.469 15.4703L8.53093 16.5297L11.9999 13.0607L15.469 16.5298L16.531 15.4704L13.0606 12L16.5309 8.52972L15.469 7.47034L11.9999 10.9394L8.53094 7.47035L7.46899 8.52972L10.9393 12Z" fill="white"></path></svg>`
    } else {
        div.classList.add('success')
        icon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="rgba(0,211,89,1)" class="sc-bcXHqe NcSfy"><circle opacity="0.7" cx="12" cy="12" r="10"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M17.561 9.1768L11.061 15.5704C10.7479 15.8784 10.2449 15.8763 9.93433 15.5657L6.93433 12.5657L8.0657 11.4343L10.5047 13.8733L16.439 8.03613L17.561 9.1768Z" fill="white"></path></svg>`
    }
    body.append(h3)
    body.append(p)
    div.append(icon)
    div.append(body)
    div.append(close)
    document.querySelector('.comments').before(div)
    setTimeout(() => {
        div.classList.add('active')
    }, 300)
    setTimeout(() => {
        closeInfo()
    }, 5000)
}

function closeInfo() {
    let info = document.querySelector('.info')
    info.className = 'info'
    setTimeout(() => {
        info.remove()
    }, 300)
}

function renderMessages(data) {
    let commentsBlock = document.querySelector('.comments')
    if (data.emptyMsg) {
        let commentItem = addElement('div', 'no_comment', data.emptyMsg)
        commentsBlock.prepend(commentItem)
    } else {
        if (commentsBlock.querySelector('.no_comment')) commentsBlock.querySelector('.no_comment').remove()
        Object.values(data).forEach((value) => {
            let commentItem = addElement('div', 'comment_item')
            let commentHeader = addElement('div', 'comment_header')
            let commentBody = addElement('div', 'comment_body')
            let elName = addElement('p', '', value.name)
            let elEmail = addElement('p', '', value.email)
            let elText = addElement('p', '', value.text)
            let elDate = addElement('p', 'comment_date', value.published)
            commentHeader.append(elName, elEmail)
            commentBody.append(elText, elDate)
            commentItem.append(commentHeader, commentBody)
            commentsBlock.prepend(commentItem)
        })
    }

}

function addElement(element, className = '', innerText = '') {
    let el = document.createElement(element);

    if (className) {
        el.className = className
    }
    if (innerText) {
        el.innerText = innerText
    }

    return el
}

function popupAction(close = false) {
    let overlay = document.querySelector('.overlay')

    if (close) {
        overlay.classList.remove('active')
        setTimeout(() => {
            overlay.style.display = ''
        }, 300)
        document.body.classList.remove('with_popup')
    } else {
        overlay.style.display = 'flex'
        setTimeout(() => {
            overlay.classList.add('active')
        }, 300)
        document.body.classList.add('with_popup')
    }
}