/**
 * By default, 4xx error codes will be categorized as client errors
 * 5xx errors will be categorized as server errors 
 * 
 * Objects below allow for user customizability and provide a description of each error code
 */

const clientErrCodes = {
  /**
   * Bad request.
   * The server cannot or will not process the request due to an apaprent client error.
   * e.g. malformed req syntax, size too large, etc.
   *   */ 
  400: true,
  /**
   * Unauthorized.
   * Specifically for use when authentication is required and has failed or 
   * has not yet been provided.
   *   */ 
  401: true,
  /**
   * Payment Required.
   * This code is not widely used.
   *   */ 
  402: true,
  /**
   * Forbidden.
   * Request contained valid data and was understood by the server, but the server 
   * is refusing action.
   * May be due to the user not having the necessary permissions for a resource.
   *   */ 
  403: true,
  /**
   * Not Found.
   * The requested resource could not be found but may be available in the future.
   *   */ 
  404: true,
  /**
   * Method not allowed.
   * A request method is not supported for the requested resource 
   * e.g. GET request on a form that requires data to be presented via a POST or PUT
   *   */ 
  405: true,
  /**
   * Not Acceptable.
   * The requested resource is capable of generating only content not acceptable according to
   * the Accept headers sent in the request.
   *   */ 
  406: true,
  /**
   * Proxy Authentication Required.
   * The client must first authenticate itself with the proxy.
   *   */ 
  407: true,
  /**
   * Request Timeout.
   * The server timed out waiting for the request.
   * According to HTTP specifications: "The client did not produce a request within the time
   * that the server was prepared to wait"
   *   */ 
  408: true,
  /**
   * Conflict.
   * Request could not be processed because of conflict in the current state of the resource
   * e.g. edit conflict between multiple simultaneous updates.
   *   */ 
  409: true,
  /**
   * Gone.
   * Resource requested is no longer available and will not be available again.
   * Used when a resource has been intentionally removed and the resource should be purged. 
   * Upon receiving a 410 status code, the client should not request the resource in the future. 
   *   */ 
  410: true,
  /**
   * Length required.
   * Request did not specify the length of its content, which is required by the requested resource.
   *   */ 
  411: true,
  /**
   * Precondition failed.
   * Server does not meet one of the preconditions that the requester put on the req header fields
   *   */ 
  412: true,
  /**
   * Payload too large.
   * Request is larger than the server is willing or able to process. 
   *   */ 
  413: true,
  /**
   * URI too long.
   * URI provided was too long for the server to process. 
   *   */ 
  414: true,
  /**
   * Unsupported media type.
   * Request entity has a media type which the serve or resource does not support.
   *   */ 
  415: true,
  /**
   * Range not satisfiable.
   * Client has asked for a portion of the file but the server cannot supply that portion. 
   * E.g. client asked for a part of the file that lies beyond the end of the file.
   *   */ 
  416: true,
  /**
   * Expectation failed.
   * The server cannot meet the rquirements of the Expect request-header field.
   *   */ 
  417: true,
  /**
   * I'm a teapot.
   * Defined in 1998 as an April Fool joke. 
   * This code should be returned by teapots requested to brew coffee. 
   *   */ 
  418: true,
  /**
   * Misdirected request.
   * The request was directed at a server that is not able to produce a response
   * e.g. connection reuse
   *   */ 
  421: true,
  /**
   * Unprocessable entity.
   * Request was well-formed but was unable to be followed due to semantic errors.
   *   */ 
  422: true,
  /**
   * Locked.
   * Resource that is being accessed is locked.
   *   */ 
  423: true,
  /**
   * Failed dependency.
   * Request failed because it depended on another request and that request failed.
   *   */ 
  424: true,
  /**
   * Too early.
   * Indicates that the server is unwilling to risk processing a request that might be replayed.
   *   */ 
  425: true,
  /**
   * Upgrade required.
   * The client could switch to a different protocol (e.g. TLS/1.3) 
   * given in the Upgrade header field.
   *   */ 
  426: true,
  /**
   * Precondition required.
   * Origin server requires the request to be conditional.
   * Intended to prevent the 'lost update' problem, where a client GETs a resource's state,
   * modifies it, and PUTs it back to the server, when meanwhile a third party has 
   * modified the state on the sever, leading to a conflict
   *   */ 
  428: true,
  /**
   * Too many requests.
   * The user has sent too many requests in a given amount of time.
   * Intended for use with rate-limiting schemes.
   *   */ 
  429: true,
  /**
   * Request header fields too large.
   * Server is unwilling to process the request because either an individual header field,
   * or all the header fields collectively are too large
   *   */ 
  431: true,
  /**
   * Login time-out. 
   * Microsoft IIS error.
   * The client's session has expired and must log in again.
   *   */ 
  440: true,
  /**
   * No response.
   * nginx error.
   * Used internally to instruct the server to return no information to the client
   * and close the connection immediately.
   *   */ 
  444: true,
  /**
   * Retry with.
   * Microsoft IIS error.
   * Server cannot honor the request because the user has not provided 
   * the required information.
   *   */ 
  449: true,
  /**
   * Redirect.
   * Microsoft IIS error.
   * Used in Exchange ActiveSync when either a more efficient server is available or the server
   * cannot access the users' mailbox.
   *   */ 
  451: true,
  /**
   * Request header too large.
   * nginx error.
   * Request too large or header line too long.
   *   */ 
  494: true,
  /**
   * SSL certificate error.
   * nginx error.
   * Expansion of the 400 Bad Request response code. 
   * Client has provided an invalid client certificate.
   *   */ 
  495: true,
  /**
   * SSL certificate required.
   * nginx error.
   * Expansion of the 400 Bad Request response code. 
   * Client certificate is required but not provided.
   *   */ 
  496: true,
  /**
   * HTTP request sent to HTTPS port.
   * nginx error.
   * Expansion of the 400 Bad Request response code. 
   * Client has made an HTTP request to a port listening for HTTPS requests.
   *   */ 
  497: true,
  /**
   * SSL certificate error.
   * nginx error.
   * Client has closed the request before the server could send a response.
   *   */ 
  499: true,
  
};


const serverErrCodes = {
  /**
   * Internal server error.
   * A generic error message, given when an unexpected condition was encountered
   * and no more specific message is suitable.
   *   */ 
  500: true,
  /**
   * Not implemented.
   * Server either does not recognize the request method, or it lacks the ability to 
   * fulfill the request.
   * Usually implies future availability.
   *   */ 
  501: true,
  /**
   * Bad gateway.
   * Server was acting as a gateway or proxy and received an invalid response
   * from the upstream server.
   *   */ 
  502: true,
  /**
   * Service unavailable.
   * Server cannot handle the request - overloaded or down for maintenance.
   * Generally temporary state.
   *   */ 
  503: true,
  /**
   * Gateway timeout.
   * server was acting as a gateway or proxy and did not receive a timely response 
   * from the upstream server.
   *   */ 
  504: true,
  /**
   * HTTP version not supported.
   * Server does not support the HTTP protocol version used in the request.
   *   */ 
  505: true,
  /**
   * Variant also negotiates.
   * Transparent content negotiation for the request results in a circular reference.
   *   */ 
  506: true,
  /**
   * Insufficient storage.
   * The server is unable to store the representation needed to complete the request.
   *   */ 
  507: true,
  /**
   * Loop detected.
   * Server detected an infinite loop while processing the request.
   *   */ 
  508: true,
  /**
   * Not extended.
   * Further extensions to the request are required for the server to fulfill it. 
   *   */ 
  509: true,
  /**
   * Network authentication required.
   * Client needs to authenticate to gain network access. 
   * Intended for use by intercepting proxies use to control access to the network
   * e.g. "captive portals" used to require to Terms of Service before granting full Internet 
   * access via a Wi-Fi hotspot
   *   */ 
  511: true,
  /**
   * Web server returned an unknown error.
   * Cloudfare error.
   * Origin server returned an empty, unknown, or unexplained response to Cloudflare.
   *   */ 
  520: true,
  /**
   * Web server is down.
   * Cloudfare error.
   * Origin server has refused the connection from Cloudflare.
   *   */ 
  521: true,
  /**
   * Connection timed out.
   * Cloudfare error.
   * Cloudflare could not negotiate a TCP handshake with the origin server.
   *   */ 
  522: true,
  /**
   * Origin is unreachable.
   * Cloudfare error.
   * Cloudflare could not reach the origin server.
   * e.g. DNS records for the origin server are incorrect.
   *   */ 
  523: true,
  /**
   * A timeout occurred.
   * Cloudfare error.
   * Cloudflare was able to complete a TCP connection to the origin server,
   * but did not receive a timely HTTP response.
   *   */ 
  524: true,
  /**
   * SSL handshake failed.
   * Cloudfare error.
   * Cloudflare could not negotiate a SSL/TLS handshake with the origin server.
   *   */ 
  525: true,
  /**
   * Invalid SSL certificate.
   * Cloudfare error.
   * Cloudflare could not validate the SSL certificate on the origin web server.
   *   */ 
  526: true,
  /**
   * Railgun error.
   * Cloudfare error.
   * Interrupted connection between Cloudflare and the origin server's Railfun server.
   *   */ 
  527: true,
};

module.exports = {
  clientErrCodes,
  serverErrCodes,
};



