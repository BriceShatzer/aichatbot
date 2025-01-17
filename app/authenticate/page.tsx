'use client'

import { useEffect } from "react";
import { redirect, useSearchParams } from 'next/navigation'
import { useStytchUser, useStytch } from "@stytch/nextjs";

const OAUTH_TOKEN = "oauth";
const MAGIC_LINKS_TOKEN = "magic_links";

/*
During both the Magic link and OAuth flow, Stytch will redirect the user back to your application to a specified redirect URL (see Login.js). 
Stytch will append query parameters to the redirect URL which are then used to complete the authentication flow. 
A redirect URL for this example app will look something like: http://localhost:3000/authenticate?stytch_token_type=magic_links&token=abc123

The AuthenticatePage will detect the presence of a token in the query parameters, and attempt to authenticate it.
On successful authentication, a session will be created and the user will be redirect to /profile
*/
const Authenticate = () => {
  const { user, isInitialized } = useStytchUser();
  const stytch = useStytch();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (stytch && !user && isInitialized) {
      const stytch_token_type = searchParams.get('stytch_token_type');
      const token = searchParams.get('token');

      if (token && stytch_token_type === OAUTH_TOKEN) {
        stytch.oauth.authenticate(token, {
          session_duration_minutes: 60,
        });
      } else if (token && stytch_token_type === MAGIC_LINKS_TOKEN) {
        stytch.magicLinks.authenticate(token, {
          session_duration_minutes: 60,
        });
      }
    }
  }, [isInitialized, stytch, user]);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }
    if (user) {
      return redirect('/');
    }
  }, [user, isInitialized]);

  return null;
};

export default Authenticate;