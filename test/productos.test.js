const express = require("express");
const request = require("supertest");
const routes = require("../src/routes/index.js");

const app = express();
app.use(express.json());
app.use("/", routes());

describe("Testeo de endpoints de productos", () => {
    let token;

    beforeAll(async () => {
        // Iniciar sesión para obtener el token
        const loginResponse = await request(app).post("/iniciar_sesion").send({
            email: "usuario1@usuario1.com",
            password: "123456",
        });
        token = loginResponse.body.token;
    });

    describe("/POST productos", () => {
        test("debería retornar un estatus 201 al crear un producto", async () => {
            const response = await request(app)
                .post("/productos")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    product_name: "Producto 1",
                    description: "Descripción del producto 1",
                    img: "imagen.jpg",
                    price: 100.0,
                    stock: 10,
                    category_id: 1,
                    ingredients: ["ingrediente1", "ingrediente2"] // Asegúrate de incluir este campo
                });
            expect(response.status).toBe(201);
        });
    });

    describe("/GET productos", () => {
        test("debería retornar un estatus 200 y una lista de productos", async () => {
            const response = await request(app)
                .get("/productos")
                .set("Authorization", `Bearer ${token}`); // Incluir el token en la cabecera
            expect(response.status).toBe(200);
            expect(response.body.productos).toBeDefined();
        });
    });
});
//productos.test.js