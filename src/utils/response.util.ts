export interface ApiResponseType {
  statusCode?: number;
  message?: string;
  data?: any;
}

export function createApiResponse(params: ApiResponseType) {
  const response: ApiResponseType = {};

  if (params.statusCode !== undefined) response.statusCode = params.statusCode;
  if (params.message !== undefined) response.message = params.message;
  if (params.data !== undefined) response.data = params.data;
  return response;
}
