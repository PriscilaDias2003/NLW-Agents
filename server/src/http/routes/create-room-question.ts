import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'
import { z } from 'zod/v4'

export const createRoomQuestionRoute: FastifyPluginCallbackZod = (app) => {
    app.post('/rooms/:roomId/questions', {
        schema: {
            params: z.object({
                roomId: z.string()
            }),
            body: z.object({
                question: z.string().min(1),
            }),
        }
    },
        async (req, res) => {
            const { roomId } = req.params
            const { question } = req.body

            const result = await db.insert(schema.questions).values({
                roomId, question
            }).returning()

            const insertedQuestion = result[0]

            if (!insertedQuestion) {
                throw new Error('Failed to create new question.')
            }

            return res.status(201).send({ questionId: insertedQuestion.id })
        })
}