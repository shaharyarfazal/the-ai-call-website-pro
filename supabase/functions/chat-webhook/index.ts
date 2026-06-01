/**
 * DEPRECATED: This function is disabled. All chatbot traffic has been migrated
 * to the `secure-chat-webhook` function which has proper authentication and
 * does not hardcode internal webhook URLs in source code.
 *
 * This stub returns 410 Gone so any old clients are informed to update.
 */
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (_req) => {
  return new Response(
    JSON.stringify({ error: "This endpoint is deprecated. Please use /functions/v1/secure-chat-webhook." }),
    {
      status: 410,
      headers: { "Content-Type": "application/json" },
    }
  );
});