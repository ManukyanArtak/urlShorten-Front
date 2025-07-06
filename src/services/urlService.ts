import http from './HttpService';


export interface ShortUrl {
    id: number;
    longUrl: string;
    shortCode: string;
    userId: number;
    visits: number;
    shortUrl: string;
}

export interface ShortUrlResponse {
    message: string;
    id: number;
    longUrl: string;
    shortCode: string;
    userId: number;
    visits: number;
    shortUrl: string;
}

export interface ShortUrlListResponse {
    message: string;
    urls: ShortUrl[];
}

export interface ResolveShortCodeResponse {
    message: string;
    longUrl: string;
}


export const createShortUrl = async (
    longUrl: string,
): Promise<ShortUrlResponse> => {
    const response = await http.post<ShortUrlResponse>('/url', {longUrl});
    return response.data;
};

export const getUrls = async (): Promise<ShortUrlListResponse> => {
    const response = await http.get<ShortUrlListResponse>('/url');
    return response.data;
};

