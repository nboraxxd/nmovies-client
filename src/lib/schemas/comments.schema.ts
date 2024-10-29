import z from 'zod'

import { userDocumentResponseSchema } from '@/lib/schemas/profile.schema'
import { paginationResponseSchema } from '@/lib/schemas/common.schema'

const commentDocumentSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  mediaId: z.number(),
  mediaTitle: z.string(),
  mediaType: z.enum(['movie', 'tv']),
  mediaPoster: z.string().nullable(),
  mediaReleaseDate: z.string(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type CommentDocumentType = z.TypeOf<typeof commentDocumentSchema>

const commentDataResponseSchema = commentDocumentSchema
  .omit({ userId: true })
  .merge(z.object({ user: userDocumentResponseSchema.omit({ createdAt: true, updatedAt: true }) }))

export type CommentDataResponseType = z.TypeOf<typeof commentDataResponseSchema>

export const addCommentBodySchema = z
  .object({
    mediaId: z.number(),
    mediaTitle: z.string(),
    mediaType: z.enum(['movie', 'tv']),
    mediaPoster: z.string().nullable(),
    mediaReleaseDate: z.string(),
    content: z.string().min(1).max(500),
  })
  .strict({ message: 'Additional properties not allowed' })

export type AddCommentBodyType = z.TypeOf<typeof addCommentBodySchema>

export const addCommentResponseSchema = z.object({
  message: z.string(),
  data: commentDataResponseSchema,
})

export type AddCommentResponseType = z.TypeOf<typeof addCommentResponseSchema>

export const getCommentsByMediaParams = z
  .object({
    mediaId: z.coerce.number(),
    mediaType: z.enum(['movie', 'tv']),
  })
  .strict({ message: 'Additional properties not allowed' })

export type GetCommentsByMediaParamsType = z.TypeOf<typeof getCommentsByMediaParams>

export const getCommentsByMediaResponseSchema = z.object({
  message: z.string(),
  data: z.array(commentDataResponseSchema),
  pagination: paginationResponseSchema,
})

export type GetCommentsByMediaResponseType = z.TypeOf<typeof getCommentsByMediaResponseSchema>

export const getMyCommentsResponseSchema = z.object({
  message: z.string(),
  data: z.array(commentDocumentSchema.omit({ userId: true })),
  pagination: paginationResponseSchema,
})

export type GetMyCommentsResponseType = z.TypeOf<typeof getMyCommentsResponseSchema>

export const deleteCommentParamsSchema = z.object({
  commentId: z.string(),
})

export type DeleteCommentParamsType = z.TypeOf<typeof deleteCommentParamsSchema>
