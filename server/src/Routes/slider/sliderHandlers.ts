import { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../error/handleError";
import { sliderService } from "./sliderService";
import { CollectionName } from "../../constants/collection";
import { SliderType, SliderUpdateType } from "./sliderSchemas";
import { saveFileService } from "../../utils/service";

export const sliderHandlers = {
  async uploadSliderImage(req: FastifyRequest, reply: FastifyReply) {
    return await saveFileService(req, reply, CollectionName.slider, [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
      "image/gif",
      "image/svg+xml",
    ]);
  },

  async createSlider(req: FastifyRequest, reply: FastifyReply) {
    const slider = req.server.mongo.db!.collection<SliderType>(CollectionName.slider);
    const data = req.body as SliderType;
    try {
      const result = await sliderService.createSlider(slider, data);

      reply.code(201).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async updateSlider(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const slider = req.server.mongo.db!.collection<SliderUpdateType>(CollectionName.slider);

    try {
      const sliderData = req.body as SliderUpdateType;

      const result = await sliderService.updateSlider(slider, sliderData, id);
      reply.code(200).send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async getSliders(req: FastifyRequest, reply: FastifyReply) {
    const slider = req.server.mongo.db!.collection<SliderType>(CollectionName.slider);

    try {
      const sliders = await sliderService.getSliders(slider);
      reply.send(sliders);
    } catch (err) {
      handleError(reply, err, req);
    }
  },

  async deleteSliderById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const slider = req.server.mongo.db!.collection<SliderType>(CollectionName.slider);

    try {
      const result = await sliderService.deleteSliderById(slider, id);
      reply.send(result);
    } catch (err) {
      handleError(reply, err, req);
    }
  },
};
