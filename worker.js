export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    const contentType =
      response.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) {
      return response;
    }

    if (!env.PROJECT1_LINK) {
      console.error("PROJECT1_LINK is not configured");
      return response;
    }

    const html = await response.text();

    return new Response(
      html.replaceAll("PROJECT1-LINK", env.PROJECT1_LINK),
      response
    );
  }
};