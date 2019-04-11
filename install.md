# Инструкция по установке

#### Создаем папку для проекта
    cd /home/user_name/projects
    mkdir AnnotationSite
    cd AnnotationSite

#### Ставим виртуальное окружение и запускаем его
    python3 -m venv myvenv
    source myvenv/bin/activate

#### Клонируем проект
    git clone https://github.com/DaryaPimenova/AnnotationSite.git
    cd AnnotationSite

#### Ставим все необходимые пакеты
    python3 -m pip install --upgrade pip
    pip install -r requirements.txt


# Инструкция по работе с frontend

#### Если Вы собираетесь вносить изменения в frontend-части проекта,
#### то вам нужно выполнить следующие действия:
#### 1) Установить Nodejs
    wget -qO- https://deb.nodesource.com/setup_11.x | sudo -E bash -
    sudo apt-get install -y nodejs

#### 2) Установить необходимые пакеты
    sudo npm install -g webpack-cli --save-dev
    sudo npm uninstall -g webpack
    sudo npm install

#### Для компилирования JS при работе с проектом делаем следующее
Проект использует единый компилированный JS webpack'ом.
Во время разработки используем быстрый способ с компиляцией JS "на лету" при изменениях в коде:
    
    sudo npm run-script watch

Перед пушем в Git компилируем все JS файлы в проекте с компрессией:

    sudo npm run-script build
