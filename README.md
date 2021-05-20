# Prueba técnica Masivian

<img src="https://i.imgur.com/wZvxOV0.png" alt="drawing" width="360"/>

Proyecto en el cual se consume la API de los comics de xkcd de forma aleatoria, con la opción de clasificarlos con una puntuación de 1 a 5 estrellas.

Tecnologías implementadas:

- React.js + TypeScript.
- Saas.
- ESLint, Prettier.

## Ver sitio

Aplicación desplegada en Netlify.

https://random-xkcd-comic.netlify.app/

## Instrucciones de uso

Clonar el repositorio o descargar el ZIP.

`git clone https://github.com/raymansell/random-xkcd.git`

Instalar las dependencias

`npm install`

Agregar un archivo `.env` en la raiz del proyecto, con las variables de entorno siguiendo el ejemplo de `.env.example`.

`REACT_APP_XKCD_API=https://getxkcd.now.sh/api/comic`

Debido a restricciones de CORS, es necesario usar una versión externa que tenga CORS habilitados.
En este caso se implementó esta API: https://getxkcd.vercel.app/ desarrollada por @khalby786. (Código fuente: https://github.com/khalby786/getxkcd)

Ejecutar la aplicación en modo desarrollo:

```
# Ejecuta frontend en puerto 3000
npm start
```
