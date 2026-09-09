const express = require('express');
const { PAISES } = require('./paises');   // trae los datos de países

const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/ejercicio2/:pais/:salario', (req, res) => {
  try {
    // Normalizar el país: minúsculas y sin espacios/acentos
    const paisKey = req.params.pais
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita acentos
      .replace(/\s/g, '');                              // quita espacios

    // Validar el salario (que sea número mayor a cero)
    const salarioBruto = Number(req.params.salario);
    if (Number.isNaN(salarioBruto) || salarioBruto <= 0) {
      return res.status(400).json({ error: 'El salario debe ser un número mayor a cero' });
    }

    // Validar que el país esté permitido
    const config = PAISES[paisKey];
    if (!config) {
      const permitidos = Object.values(PAISES).map(p => p.nombre).join(', ');
      return res.status(400).json({ error: `El pais no es valido. Paises permitidos: ${permitidos}` });
    }

    // Calcular impuestos
    const iva = salarioBruto * (config.iva / 100);
    const renta = salarioBruto * (config.renta / 100);
    const salarioNeto = salarioBruto - iva - renta;

    // Responder con el JSON en el formato pedido
    res.json({
      pais: paisKey,
      salarioBruto: salarioBruto,
      porcentajeIVA: `${config.iva}%`,
      porcentajeRenta: `${config.renta}%`,
      iva: iva,
      renta: renta,
      salarioNeto: salarioNeto,
    });
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});