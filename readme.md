# Informacion del proyecto

Este proyecto esta realizado con nodejs v20.18.0, y utiliza el motor de plantillas EJS. Es una aplicacion, para cargar tareas con asunto, descripcion y fecha, la cual esta ultima define tiempo para el aviso por mail.

La aplicacion tiene la capacidad de cada cierto tiempo, revisar las tareas y enviar un mail de aviso, a los mails elegidos al momento de crear la tarea.

## Caracteristicas.

Por el momento esta aplicacion puede enviar mails, desde una casilla de gmail, teniendo que generar una contraseña desde el propio mail. No tiene implementado todavia que la tarea se pueda reprogramar, con el tiempo definido desde el formulario.

La informacion tiene persitencia por el momento, guardando la informacion en un archivo .json.




## Variables de entorno.

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`PASS_EMAIL`


### Version.

La version de la aplicacion es la V0.5.010, considerada una version Beta.