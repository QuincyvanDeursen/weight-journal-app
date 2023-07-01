import { Injectable } from '@nestjs/common';
import { Response } from 'express';

export interface ApiMetaInfo {
  statusCode?: number;
  type: 'object' | 'list' | 'none';
  count: number;
}

export interface ApiResponse<T> {
  results?: T[] | T;
  info: ApiMetaInfo;
}

@Injectable()
export class APIResponse {
  constructor(
    public status: number,
    public message: string,
    public data: any
  ) {}

  static success(message: string, data: any): APIResponse {
    return new APIResponse(200, message, data);
  }

  static created(message: string, data: any): APIResponse {
    return new APIResponse(201, message, data);
  }

  static error(message: string, data: any): APIResponse {
    return new APIResponse(400, message, data);
  }

  static notFound(message: string, data: any): APIResponse {
    return new APIResponse(404, message, data);
  }

  static conflict(message: string, data: any): APIResponse {
    return new APIResponse(409, message, data);
  }

  // Add more static methods for other status codes
}
