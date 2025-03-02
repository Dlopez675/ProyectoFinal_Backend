const express = require("express");
const request = require("supertest");
const routes = require("../src/routes/index.js");

const app = express();
app.use(express.json());
app.use("/", routes());

describe("Testeo de endpoints", () => {
    describe("/Post iniciar_sesion", () => {
        test("deberia retornar un estatus 401 con credenciales incorrecta", async () => {
            const response = await request(app).post("/iniciar_sesion").send({
                email: "nose@gmail.com",
                password: "123",
            });
            expect(response.status).toBe(401);
        });

        test("deberia retornar un estatus 200 con credenciales correctas", async () => {
            const response = await request(app).post("/iniciar_sesion").send({
                email: "usuario1@usuario1.com",
                password: "123456",
            });
            expect(response.status).toBe(200);
        });
    });

    describe("/Get obtner usuarios", () => {
        test("deberia retornar un estatus 401 sin enviar credenciales", async () => {
            const response = await request(app).get("/usuarios");
            expect(response.status).toBe(401);
        });
    });
});

//user.test.js