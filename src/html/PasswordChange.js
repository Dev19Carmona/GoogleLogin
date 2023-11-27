const HTML_passwordChange = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenida y Cambio de Contraseña</title>

    <!-- Estilos CSS en línea -->
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333;
        }

        p {
            color: #555;
        }

        button {
            background-color: #4caf50;
            color: #fff;
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        a {
            text-decoration: none;
            color: #fff;
        }

        .button-link {
            display: inline-block;
            background-color: #4caf50;
            color: #fff;
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 4px;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Bienvenido/a</h1>
        <p>¡Gracias por visitar nuestro sitio! Por favor, inventa una cálida bienvenida para esta sección.</p>
        <p>¿Necesitas cambiar tu contraseña?</p>
        <!-- Enlace directo a la acción de cambio de contraseña -->
        <a class="button-link" href="google.com">Cambiar Contraseña</a>
    </div>
</body>
</html>



`;

module.exports = {
  HTML_passwordChange,
};
