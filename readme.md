REST API для фронта [Ссылка на репозиторий](https://github.com/firstagon/get-the-price).

Реализован с помощью Nodejs, Express, MongoDB, Puppeteer.

Возможности:  
    - Регистрация/логин пользователей\
    - Парсинг с сайта (по ссылке) товара и запись в бд\
    - Проверка предоставленной ссылки\
    - Обновление данный товара по времени у всех пользователей\
    - Выдача, по запросу, листа товаров пользователя, один товар  

Endpoints (./routes/auth.js, ./routes/getRoute.js):  
    - /login логин пользователя\
    - /signup регистрация пользователя\
    - /userfeed лист всех товаров пользователя\
    - /item/:itemId страница товар пользователя  
