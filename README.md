# README

## Backend Deploy
### 1. Instalación
El pimero paso consiste en: descargar el repositorio, ingresar al directorio **backend** e intralar las dependencias.
```
$ git clone git@github.com:diegocastroh10/project.git
$ cd ./project/backend
$ npm install
```

### 2. Configuración
Para usar el backend es necesario tener conexión con servicio un PostgreSQL sobre el puerto 5432. Este servicio debe tener registrada la siguiente base de datos:
| Parámetro | Valor  |
|-----------|--------|
| Nombre BD | fooddy |
| Usuario   | fooddy |
| Clave     | f00ddy |
| Puerto    | 5432   |

### 3. Levantamiento (Entorno de Desarrollo)
Dentro del directorio **backend** ejecutar el script:
```
$ npm run start:dev
```
Si todo ha salido bien podremos acceder a la documentación en **http://localhost:3001/api**

## Frontend Deploy
### 1. Instalación
El pimero paso consiste en: descargar el repositorio, ingresar al directorio **frontend** e intralar las dependencias.
```
$ git clone git@github.com:diegocastroh10/project.git
$ cd ./project/frontend
$ npm install
```

### 2. Configuración
El Backend debe escuchar en el puerto 3000, dicha configuración se realiza en **package.json**
Para Windows:
```
"start": "set PORT=3000 && react-scripts start"
```
Para Linux:
```
"start": "PORT=3000 react-scripts start"
```

### 3. Levantamiento (Entorno de Desarrollo)
Dentro del directorio **frontend** ejecutar el script:
```
$ npm start
```
Si todo ha salido bien podremos acceder a la documentación en **http://localhost:3000/**