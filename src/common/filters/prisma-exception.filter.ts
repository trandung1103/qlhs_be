import { ArgumentsHost, Catch, ConflictException, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { HttpExceptionFilter } from './http-exception.filter';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly fallback = new HttpExceptionFilter();

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    if (exception.code === 'P2002') {
      const target = (exception.meta?.target as string[] | undefined)?.join(', ');
      return this.fallback.catch(
        new ConflictException(
          target ? `A record with the same ${target} already exists.` : 'Duplicate record.',
        ),
        host,
      );
    }

    if (exception.code === 'P2003') {
      return this.fallback.catch(
        new ConflictException('This action violates a data relationship constraint.'),
        host,
      );
    }

    if (exception.code === 'P2025') {
      return this.fallback.catch(
        new ConflictException('Record not found or already removed.'),
        host,
      );
    }

    return this.fallback.catch(exception, host);
  }
}
