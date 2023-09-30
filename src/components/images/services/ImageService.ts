import { errors } from '../../../errorHandler.js';
import { Image } from '../models/index.js';
import type { ImageObject } from '../../../interfaces/mongoose.gen.js';

export const ImageService = () => {
  const getById = async (id: string) => {
    return (await Image.findById(id).orFail(ImageNotFoundError(id))).toJSON<ImageObject>();
  };

  const create = async (newImage: ImageObject) => {
    const imageInstance = await Image.create(newImage);
    return imageInstance.toJSON<ImageObject>();
  };

  const updateById = async (id: string, updates: Partial<ImageObject>) => {
    return (
      await Image.findByIdAndUpdate(id, updates).orFail(ImageNotFoundError(id))
    ).toJSON<ImageObject>();
  };

  const deleteById = async (id: string): Promise<void> => {
    await Image.findByIdAndDelete(id, { projection: '_id' }).orFail(ImageNotFoundError(id));
  };

  return { create, updateById, deleteById, getById };
};

const ImageNotFoundError = (id: string) => errors.NotFound(`Image with id = "${id}" not found`);
