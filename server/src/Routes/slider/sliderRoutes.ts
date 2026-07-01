import { z } from "zod";
import { FastifyInstance } from "fastify";
import zodToJsonSchema from "zod-to-json-schema";
//
import { sliderHandlers } from "./sliderHandlers";
import { JsonSliderSchema, JsonSliderUpdateSchema, SliderSchema, SliderSchemaUpdate } from "./sliderSchemas";
import { validate } from "../../Middleware/validation.middleware";
import { uploadSchema } from "../../utils/schema";
import { authorize } from "../../Middleware/authorize.middleware";

export function sliderRoutes(app: FastifyInstance) {
  app.post("/upload", { schema: uploadSchema(["Slider"]),preHandler:authorize(["SuperAdmin"]) }, sliderHandlers.uploadSliderImage);

  // Route: Create Slider
  app.post(
    "/create",
    {
      schema: JsonSliderSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(SliderSchema)],
    },

    sliderHandlers.createSlider,
  );

  // Route: Update Slider
  app.put(
    "/update/:id",
    {
      schema: JsonSliderUpdateSchema,
      preHandler: [authorize(["SuperAdmin"]),validate(SliderSchemaUpdate)],
    },

    sliderHandlers.updateSlider,
  );

  // Route: Get All Slider
  app.get(
    "/getall",
    {
      schema: {
        tags: ["Slider"],
      },
      preHandler: authorize(["SuperAdmin"])
    },
    sliderHandlers.getSliders,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Slider"],
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: authorize(["SuperAdmin"])
    },

    sliderHandlers.deleteSliderById,
  );
}
