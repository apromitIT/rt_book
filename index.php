    <!doctype html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>РТ - Гостевая книга</title>
        <link rel="stylesheet" href="./style.css">
        <script src="./script.js" defer></script>
    </head>
    <body>
    <header>
        <div class="container">
            <a href="/" class="logo"></a>
        </div>
    </header>
    <main>
        <div class="container">
            <h1>Гостевая книга</h1>
            <button class="btn" onclick="popupAction()">Новая запись</button>
            <div class="comments">
            </div>
        </div>
    </main>

    <div class="overlay">
        <div class="popup">
            <div class="popup_header">
                <h2>Написать сообщение</h2>
                <span class="icon" onclick="popupAction(true)">
                    <svg width="24" height="24" viewBox="0 0 24 24"
                         aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="#272F3D"
                         class="sc-bcXHqe bPVbdI">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M10.9398 12.0006L4.99876 17.9417L6.05941 19.0024L12.0005 13.0612L17.9416 19.0024L19.0022 17.9417L13.0611 12.0006L19.0022 6.0595L17.9415 4.99884L12.0005 10.9399L6.05943 4.99884L4.99878 6.0595L10.9398 12.0006Z"></path>
                    </svg>
                </span>
            </div>
            <form name="messageForm">
                <div class="form_group">
                    <label for="">Имя</label>
                    <input name="name" type="text" required>
                </div>
                <div class="form_group">
                    <label for="">E-mail</label>
                    <input name="email" type="email" required>
                </div>
                <div class="form_group form_group_txt">
                    <label for="">Сообщение</label>
                    <textarea name="text" required></textarea>
                </div>
                <input type="submit" class="btn btn_send-form" value="Отправить">
            </form>
        </div>
    </div>
    <footer>
        <div class="container">
            <p>&#169; <?= date("Y"); ?> Ростелеком</p>
        </div>
    </footer>
    </body>
    </html>

