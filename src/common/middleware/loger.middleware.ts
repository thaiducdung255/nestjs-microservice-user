import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} from ${req.ip}`)
    next()
  }
}
