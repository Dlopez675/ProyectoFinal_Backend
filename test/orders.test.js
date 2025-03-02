const express = require("express");
const request = require("supertest");
const routes = require("../src/routes/index.js");

const app = express();
app.use(express.json());
app.use("/", routes());

describe("Testeo de endpoints de Ordenes", () => {
    let token;
    let userId;

    beforeAll(async () => {
        // Iniciar sesión para obtener el token
        const loginResponse = await request(app).post("/iniciar_sesion").send({
            email: "usuario1@usuario1.com",
            password: "123456",
        });
        token = loginResponse.body.token;
        userId = loginResponse.body.user.id; // Obtener el ID del usuario
    });

    it("Debería obtener todas las órdenes de un usuario", async () => {
        // Crear una orden para el usuario (opcional, si no hay órdenes en la base de datos)
        const orderResponse = await request(app)
            .post("/order_items")
            .set("Authorization", `Bearer ${token}`)
            .send({
                user_id: userId,
                items: [
                    {
                        product_id: 1, // Asegúrate de que este producto exista en la base de datos
                        quantity: 2,
                        price: 100.0,
                    },
                ],
            });

        // Obtener las órdenes del usuario
        const response = await request(app)
            .get(`/orders/${userId}`)
            .set("Authorization", `Bearer ${token}`);

        // Verificar la respuesta
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true); // Verificar que la respuesta es un array
        expect(response.body.length).toBeGreaterThan(0); // Verificar que hay al menos una orden
    });

    // it("Debería volver a ordenar un pedido existente", async () => {
    //     const orderId = 2;
    //     const res = await request(app)
    //         .post(`/orders/reorder/${orderId}`)
    //         .set("Authorization", `Bearer ${token}`);

    //     expect(res.statusCode).toBe(200);
    //     expect(res.body).toHaveProperty("message", "Orden creada nuevamente");
    //     expect(res.body).toHaveProperty("order_id");
    // });

    // it("Debería devolver error si la orden no existe", async () => {
    //     const orderId = 9999;
    //     const res = await request(app)
    //         .post(`/orders/reorder/${orderId}`)
    //         .set("Authorization", `Bearer ${token}`);

    //     expect(res.statusCode).toBe(404);
    //     expect(res.body).toHaveProperty("message", "Error al volver a ordenar");
    // });

    afterAll(() => {
        console.log(" Pruebas de órdenes completadas.");
    });
});
//orders.test.js