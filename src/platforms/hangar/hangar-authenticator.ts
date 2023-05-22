import { Middleware } from "@/utils/functions";
import { Fetch, HttpRequest, createFetch, simpleCache } from "@/utils/net";

/**
 * Represents the response from the Hangar API when authenticating.
 */
export class HangarAuthenticationResponse {

    /*
    * The token returned by the Hangar API.
    */
    token: string;

    /**
     * The number of seconds until the token expires.
     */
    expiresIn: number;

}

/**
 * Middleware that uses an API key to authenticate to the Hangar API.
 *
 * @param apiKey - The API key to be used to authenticate to the Hangar API.
 * @param fetch - The Fetch implementation used for making HTTP requests.
 * 
 * @returns A middleware function that authenticates to the Hangar API and sets the `Authorization` header.
 */
export function hangarAuthenticator(apiKey: string, fetch: Fetch): Middleware<Fetch> {
    return async (url, options, next) => {
        const token = await getToken(apiKey, fetch);
        if (token === undefined) {
            return next(url, options);
        }

        options.headers["Authorization"] = token.token;
        return next(url, options);
    }
}

/**
 * Authenticates with the Hangar API using the specified API key.
 * 
 * @param apiKey - The API key to be used to authenticate to get a token from the Hangar API.
 * @param fetch  - The Fetch implementation used for making HTTP requests.
 * 
 * @returns The response in the form of a {@link HangarAuthenticationResponse} object - or `undefined` if the authentication failed.
 */
async function getToken(apiKey: string, fetch: Fetch): Promise<HangarAuthenticationResponse | undefined> {
    const response = await fetch("/authenticate", HttpRequest.post().urlParams({ 'apiKey': apiKey }));
    return (await response.json()) ?? undefined;
}
