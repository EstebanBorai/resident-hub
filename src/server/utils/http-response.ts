import type { FastifyReply } from 'fastify';
import type { RouteGenericInterface } from 'fastify/types/route';
import type { IncomingMessage, Server, ServerResponse } from 'http';

type HttpResponse = FastifyReply<
  Server,
  IncomingMessage,
  ServerResponse,
  RouteGenericInterface,
  unknown
>;

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type HttpBody = Record<string, unknown> | { [key: string]: any };

export default {
  badRequest(reply: FastifyReply, body?: HttpBody): HttpResponse {
    return reply.status(400).send(body);
  },
  badRequestMessage(
    reply: FastifyReply,
    message: string,
    error?: Error,
  ): HttpResponse {
    return reply.status(400).send({
      message,
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  },
  created(reply: FastifyReply, body?: HttpBody): HttpResponse {
    return reply.status(201).send(body);
  },
  createdMessage(reply: FastifyReply, message: string): HttpResponse {
    return reply.status(201).send({
      message,
    });
  },
  frobidden(reply: FastifyReply, body?: HttpBody): HttpResponse {
    return reply.status(403).send(body);
  },
  forbiddenMessage(
    reply: FastifyReply,
    message: string,
    error?: Error,
  ): HttpResponse {
    return reply.status(403).send({
      message,
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  },
  internalServerError(reply: FastifyReply, error: Error): HttpResponse {
    return reply.status(500).send({
      message: 'An unhandled error ocurred',
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  },
  ok(reply: FastifyReply, body?: HttpBody): HttpResponse {
    return reply.status(200).send(body);
  },
  okMessage(reply: FastifyReply, message: string): HttpResponse {
    return reply.status(200).send({
      message,
    });
  },
};
