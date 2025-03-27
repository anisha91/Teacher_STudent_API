const request = require("supertest");
const app = require("../server"); // Import app without starting the server
const pool = require("../config/database");

describe("Teacher-Student API", () => {
    test("Register students", async () => {
        const res = await request(app).post("/api/register")
            .send({
                teacher: "teacherken@gmail.com",
                students: ["studentjon@gmail.com", "studenthon@gmail.com"],
            });

        expect(res.status).toBe(204);
    });

    test("Get common students", async () => {
        const res = await request(app).get(
            "/api/commonstudents?teacher=teacherken@gmail.com"
        );
        expect(res.status).toBe(200);
        expect(res.body.students).toContain("studentjon@gmail.com");
    });

    test("Suspend student", async () => {
        const res = await request(app).post("/api/suspend").send({
            student: "studentjon@gmail.com",
        });

        expect(res.status).toBe(204);
    });

    test("Should return recipients when students are mentioned", async () => {
        const response = await request(app)
            .post("/api/retrievefornotifications")
            .send({
                teacher: "teacherken@gmail.com",
                notification: "Hello students! @studentjon@gmail.com @studenthon@gmail.com",
            })
            .set("Content-Type", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("recipients");
        expect(Array.isArray(response.body.recipients)).toBe(true);
    });

    test("Should return 400 when missing fields", async () => {
        const response = await request(app)
            .post("/api/retrievefornotifications")
            .send({ teacher: "teacherken@gmail.com" }) // No notification field
            .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Missing required fields");
    });
});
