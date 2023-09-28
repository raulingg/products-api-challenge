import { describe, expect, beforeAll, afterAll, afterEach, jest, test } from '@jest/globals';
import type { AxiosInstance } from 'axios';
import { ApiClient, ApiResponses, ApiServer } from '../../utils/api/index.js';
import logger from '../../../src/logger.js';
import { AppError } from '../../../src/utils/index.js';
import mongoose from 'mongoose';
import config from '../../config.js';

const defaultImageProps = {
  name: 'my-image',
  key: '172s732s',
  mimetype: 'image/jpeg',
  size: 3000,
  width: 1000,
  height: 1000,
};

const fakeImageObject = (props = {}) => ({
  ...defaultImageProps,
  ...props,
});
const MongoClientErrorMessage = 'Client must be connected before running operations';

const apiServer = ApiServer();
const endpoint = '/images';
let imageApiClient: AxiosInstance;

beforeAll(async () => {
  await mongoose.connect(config.db.uri, config.db.options);

  const port = await apiServer.init(null);
  await apiServer.throwIfUnreachable();

  imageApiClient = ApiClient({
    baseURL: `http://localhost:${port}${endpoint}`,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(async () => {
  await mongoose.connection.close();
  await apiServer.stop();
});

describe('Images API', () => {
  describe(`Internal Server Error (500)`, () => {
    beforeAll(async () => {
      await mongoose.connection.close();
    });

    test('When fetching an image, Then should get back 500 response', async () => {
      const id = new mongoose.Types.ObjectId();
      const url = '/'.concat(id.toString());
      const { data, status } = await imageApiClient.get(url);

      expect({ data, status }).toStrictEqual(ApiResponses.internalError(MongoClientErrorMessage));
    });

    test('When creating an image, Then should get back 500 response', async () => {
      const body = fakeImageObject();

      const { data, status } = await imageApiClient.post('/', body);

      expect({ data, status }).toStrictEqual(ApiResponses.internalError(MongoClientErrorMessage));
    });

    test('When updating an image, Then should get back 500 response', async () => {
      const id = new mongoose.Types.ObjectId();
      const url = '/'.concat(id.toString());
      const updates = { name: 'my-new-name' };

      const { data, status } = await imageApiClient.patch(url, updates);

      expect({ data, status }).toStrictEqual(ApiResponses.internalError(MongoClientErrorMessage));
    });

    test('When deleting an image, Then should get back 500 response', async () => {
      const id = new mongoose.Types.ObjectId();
      const url = '/'.concat(id.toString());

      const { data, status } = await imageApiClient.delete(url);

      expect({ data, status }).toStrictEqual(ApiResponses.internalError(MongoClientErrorMessage));
    });
  });

  describe(`Logging`, () => {
    test("When there's an unexpected error, Then should log error", async () => {
      await mongoose.connection.close();
      const id = new mongoose.Types.ObjectId();
      const url = '/'.concat(id.toString());
      const error = new AppError({
        message: MongoClientErrorMessage,
        statusCode: 500,
      });
      const loggerDouble = jest.spyOn(logger, 'error');

      await imageApiClient.get(url);

      expect(loggerDouble).toHaveBeenLastCalledWith(
        error,
        'Error message from the centralized error-handling component',
      );
    });
  });
});
