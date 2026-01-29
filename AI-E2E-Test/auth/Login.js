process.loadEnvFile('../.env');

import { test } from "node:test";
import assert from "node:assert";

import { Stagehand } from "@browserbasehq/stagehand";

test("Un usuario puede iniciar sesión correctamente", async () => {
  const stagehand = new Stagehand({
    env: "LOCAL",
    model: "google/gemini-2.5-flash",    
  });

  await stagehand.init();

  const [page] = stagehand.context.pages();

  await page.goto("http://localhost:5173/auth/login");

  //Lo que quiero que haga

  await stagehand.act(
    'Espera a que la página cargue el texto "Iniciar sesión", maximo 30 segundos',
  );

  await stagehand.act(
    'Escribe "luis.nunez@neweratech.com" en el campo de correo electronico',
  );

  await stagehand.act('Escribe "12345" en el campo de contraseña');
  await stagehand.act('Click en el botón "Iniciar sesión"');

  await stagehand.act('Espera a que termine de cargar la pagina, por lo menos 5 segundos');

  //Extraer informacion
  const { extraction } = await stagehand.extract("Proveedores");

  //Validar
  assert.strictEqual(extraction, "Proveedores");

  await stagehand.close();
});
