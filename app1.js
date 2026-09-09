const express = require('express');
const app = express();

app.get('/api/funcion/:parametroURL', (req, res) => {

    const salario = parseFloat(req.params.parametroURL);

    if (isNaN(salario) || salario <= 0) {
        return res.status(400).json({
            "error": "El salario debe ser un número mayor a cero"
        });
    }

    const calculoIva = salario * 0.13;
    const calculoRenta = salario * 0.10;

    res.json({
        "monto": salario,

        "iva": calculoIva,
        
        "renta": calculoRenta
    });
});

app.listen(3000, () => {
    console.log('Servidor encendido : http://localhost:3000/api/funcion/1000');
});