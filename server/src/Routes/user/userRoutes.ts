import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";
//Locals
import { userHandlers } from "./userHandlers";
import { JsonUserSchema, userSchema } from "./userSchemas";
import { validate } from "../../Middleware/validation.middleware";
import { authorize } from "../../Middleware/authorize.middleware";

export function userRoutes(app: FastifyInstance) {
  // Route: Create User
  app.post(
    "/create",
    {
      schema: JsonUserSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(userSchema), ],
    },

    userHandlers.createUser,
  );

  // Route: Update User
  app.put(
    "/update/:id",
    {
      schema: JsonUserSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(userSchema)],
    },

    userHandlers.updateUser,
  );

  // Route: Get All Users
  app.get(
    "/getall",
    {
      schema: {
        tags: ["User"],
        preHandler: authorize(["SuperAdmin"]),
      },
    },
    userHandlers.getUsers,
  );

  // Route: Get All Users
  app.get(
    "/:id",
    {
      schema: {
        tags: ["User"],
        preHandler: authorize(["SuperAdmin"]),
      },
    },
    userHandlers.getUserById,
  );

  //Route: Delete User

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["User"],
        preHandler: authorize(["SuperAdmin"]),
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
    },

    userHandlers.deleteUser,
  );
}
