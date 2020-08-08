import React, {useState} from "react"
import styled from "styled-components"
import Theme from "../styles/theme"

const Form = styled.form`
  padding-left: 30px;

  @media (max-width: ${Theme.breakpoints.lg}) {
    padding-left: 0;
    word-wrap: break-word;
  }

  p {
    margin-bottom: 25px;
  }

  div {
    input {
      width: 60%;
    }

    textarea {
      width: 100%;
    }

    input,
    textarea
    {
      padding: 7px 15px;
      border: 1px solid #ccc;
      margin-bottom: 7px;
    }

    button {
      display: inline-block;
      padding: 6px 12px;
      margin-bottom: 0;
      line-height: 1.42857143;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      cursor: pointer;
      background-image: none;
      border: 1px solid transparent;
      border-radius: 4px;
      background: #5a80b1;
      color: #fff;
      text-decoration: none;
      touch-action: manipulation;
      user-select: none;
      transition: all .3s ease;

      &:hover {
        box-shadow: inset 0 2px 10px rgba(0,0,0,.3);
        color: #fff;
      }
    }
  }
`

const ContactForm = ({url}) => {
  const [status, setStatus] = useState("")

  const submitForm = (event) => {
    event.preventDefault()
    const form = event.target
    const data = new FormData(form)
    const xhr = new XMLHttpRequest()
    xhr.open(form.method, form.action)
    xhr.setRequestHeader("Accept", "application/json")
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return
      if (xhr.status === 200) {
        form.reset()
        setStatus("SUCCESS")
      } else {
        setStatus("ERROR")
      }
    }
    xhr.send(data)
  }

  return (
    <Form
      onSubmit={submitForm}
      action={url}
      method="POST"
    >
      <p>Напишите нам:</p>
      <div>
        {// eslint-disable-next-line jsx-a11y/control-has-associated-label
        }<input type="text" name="name" placeholder="Ваше имя" required/>
      </div>
      <div>
        {// eslint-disable-next-line jsx-a11y/control-has-associated-label
        }<input type="email" name="email" placeholder="E-mail" required/>
      </div>
      <div>
        {// eslint-disable-next-line
        }<input type="text" name="subject" placeholder="Тема сообщения" required/>
      </div>
      <div>
        {// eslint-disable-next-line jsx-a11y/control-has-associated-label
        }<textarea rows="12" name="message" placeholder="Сообщение" required/>
      </div>
      <div>
        {status === "SUCCESS" ? <p>Спасибо за обращение!</p> : <button>Отправить</button>}
        {status === "ERROR" && <p>Извините, что-то пошло не так!</p>}
      </div>
    </Form>
  )
}

export default ContactForm
