/* tslint:disable */
/* eslint-disable */

// ######################################## THIS FILE WAS GENERATED BY MONGOOSE-TSGEN ######################################## //

// NOTE: ANY CHANGES MADE WILL BE OVERWRITTEN ON SUBSEQUENT EXECUTIONS OF MONGOOSE-TSGEN.

import mongoose from 'mongoose';

/**
 * Lean version of ImageStateActionDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `ImageDocument.toObject()`.
 * ```
 * const imageObject = image.toObject();
 * ```
 */
export type ImageStateAction = {
  action?: 'SMART_RESIZE' | 'RESIZE' | 'CROP' | 'ROTATE';
  params?: any;
  _id: mongoose.Types.ObjectId;
};

/**
 * Lean version of ImageDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `ImageDocument.toObject()`. To avoid conflicts with model names, use the type alias `ImageObject`.
 * ```
 * const imageObject = image.toObject();
 * ```
 */
export type Image = {
  name?: string;
  key?: string;
  mimetype?: string;
  size?: number;
  width?: number;
  height?: number;
  source: {
    action?: 'UPLOAD' | 'FETCH' | 'TASK';
    url?: string;
  };
  state: {
    fromImage?: mongoose.Types.ObjectId;
    actions: ImageStateAction[];
    createdAt?: Date;
    deletedAt?: Date;
  };
  _id: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * Lean version of ImageDocument (type alias of `Image`)
 *
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { Image } from "../models"
 * import { ImageObject } from "../interfaces/mongoose.gen.ts"
 *
 * const imageObject: ImageObject = image.toObject();
 * ```
 */
export type ImageObject = Image;

/**
 * Mongoose Query type
 *
 * This type is returned from query functions. For most use cases, you should not need to use this type explicitly.
 */
export type ImageQuery = mongoose.Query<any, ImageDocument, ImageQueries> &
  ImageQueries;

/**
 * Mongoose Query helper types
 *
 * This type represents `ImageSchema.query`. For most use cases, you should not need to use this type explicitly.
 */
export type ImageQueries = {};

export type ImageMethods = {};

export type ImageStatics = {};

/**
 * Mongoose Model type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Image = mongoose.model<ImageDocument, ImageModel>("Image", ImageSchema);
 * ```
 */
export type ImageModel = mongoose.Model<ImageDocument, ImageQueries> &
  ImageStatics;

/**
 * Mongoose Schema type
 *
 * Assign this type to new Image schema instances:
 * ```
 * const ImageSchema: ImageSchema = new mongoose.Schema({ ... })
 * ```
 */
export type ImageSchema = mongoose.Schema<
  ImageDocument,
  ImageModel,
  ImageMethods,
  ImageQueries
>;

/**
 * Mongoose Subdocument type
 *
 * Type of `ImageDocument["state.actions"]` element.
 */
export type ImageStateActionDocument = mongoose.Types.Subdocument & {
  action?: 'SMART_RESIZE' | 'RESIZE' | 'CROP' | 'ROTATE';
  params?: any;
  _id: mongoose.Types.ObjectId;
};

/**
 * Mongoose Document type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Image = mongoose.model<ImageDocument, ImageModel>("Image", ImageSchema);
 * ```
 */
export type ImageDocument = mongoose.Document<
  mongoose.Types.ObjectId,
  ImageQueries
> &
  ImageMethods & {
    name?: string;
    key?: string;
    mimetype?: string;
    size?: number;
    width?: number;
    height?: number;
    source: {
      action?: 'UPLOAD' | 'FETCH' | 'TASK';
      url?: string;
    };
    state: {
      fromImage?: mongoose.Types.ObjectId;
      actions: mongoose.Types.DocumentArray<ImageStateActionDocument>;
      createdAt?: Date;
      deletedAt?: Date;
    };
    _id: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
  };

/**
 * Check if a property on a document is populated:
 * ```
 * import { IsPopulated } from "../interfaces/mongoose.gen.ts"
 *
 * if (IsPopulated<UserDocument["bestFriend"]>) { ... }
 * ```
 */
export function IsPopulated<T>(doc: T | mongoose.Types.ObjectId): doc is T {
  return doc instanceof mongoose.Document;
}

/**
 * Helper type used by `PopulatedDocument`. Returns the parent property of a string
 * representing a nested property (i.e. `friend.user` -> `friend`)
 */
type ParentProperty<T> = T extends `${infer P}.${string}` ? P : never;

/**
 * Helper type used by `PopulatedDocument`. Returns the child property of a string
 * representing a nested property (i.e. `friend.user` -> `user`).
 */
type ChildProperty<T> = T extends `${string}.${infer C}` ? C : never;

/**
 * Helper type used by `PopulatedDocument`. Removes the `ObjectId` from the general union type generated
 * for ref documents (i.e. `mongoose.Types.ObjectId | UserDocument` -> `UserDocument`)
 */
type PopulatedProperty<Root, T extends keyof Root> = Omit<Root, T> & {
  [ref in T]: Root[T] extends mongoose.Types.Array<infer U>
    ? mongoose.Types.Array<Exclude<U, mongoose.Types.ObjectId>>
    : Exclude<Root[T], mongoose.Types.ObjectId>;
};

/**
 * Populate properties on a document type:
 * ```
 * import { PopulatedDocument } from "../interfaces/mongoose.gen.ts"
 *
 * function example(user: PopulatedDocument<UserDocument, "bestFriend">) {
 *   console.log(user.bestFriend._id) // typescript knows this is populated
 * }
 * ```
 */
export type PopulatedDocument<DocType, T> = T extends keyof DocType
  ? PopulatedProperty<DocType, T>
  : ParentProperty<T> extends keyof DocType
  ? Omit<DocType, ParentProperty<T>> & {
      [ref in ParentProperty<T>]: DocType[ParentProperty<T>] extends mongoose.Types.Array<
        infer U
      >
        ? mongoose.Types.Array<
            ChildProperty<T> extends keyof U
              ? PopulatedProperty<U, ChildProperty<T>>
              : PopulatedDocument<U, ChildProperty<T>>
          >
        : ChildProperty<T> extends keyof DocType[ParentProperty<T>]
        ? PopulatedProperty<DocType[ParentProperty<T>], ChildProperty<T>>
        : PopulatedDocument<DocType[ParentProperty<T>], ChildProperty<T>>;
    }
  : DocType;

/**
 * Helper types used by the populate overloads
 */
type Unarray<T> = T extends Array<infer U> ? U : T;
type Modify<T, R> = Omit<T, keyof R> & R;

/**
 * Augment mongoose with Query.populate overloads
 */
declare module 'mongoose' {
  interface Query<ResultType, DocType, THelpers = {}> {
    populate<T extends string>(
      path: T,
      select?: string | any,
      model?: string | Model<any, THelpers>,
      match?: any,
    ): Query<
      ResultType extends Array<DocType>
        ? Array<PopulatedDocument<Unarray<ResultType>, T>>
        : ResultType extends DocType
        ? PopulatedDocument<Unarray<ResultType>, T>
        : ResultType,
      DocType,
      THelpers
    > &
      THelpers;

    populate<T extends string>(
      options: Modify<PopulateOptions, { path: T }> | Array<PopulateOptions>,
    ): Query<
      ResultType extends Array<DocType>
        ? Array<PopulatedDocument<Unarray<ResultType>, T>>
        : ResultType extends DocType
        ? PopulatedDocument<Unarray<ResultType>, T>
        : ResultType,
      DocType,
      THelpers
    > &
      THelpers;
  }
}
