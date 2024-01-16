'use client'

import React from "react";
import { StytchLogin } from "@stytch/nextjs";
import { Products } from "@stytch/vanilla-js";
import {OAuthProviders} from '@stytch/vanilla-js';
import type {User} from "@stytch/vanilla-js";

type SWRUser = {
  user: null;
  fromCache: false;
  isInitialized: false;
} | {
  user: User | null;
  fromCache: boolean;
  isInitialized: true;
};

const Login = () => {
  const styles = {
    container: {
      width: "600px",
    },
    buttons: {
      primary: {
        backgroundColor: "#4A37BE",
        borderColor: "#4A37BE",
      },
    },
  };

  const REDIRECT_URL = "http://localhost:3000/authenticate";

  const config = {
    products: [Products.emailMagicLinks, Products.oauth],
    emailMagicLinksOptions: {
      loginRedirectURL: REDIRECT_URL,
      loginExpirationMinutes: 60,
      signupRedirectURL: REDIRECT_URL,
      signupExpirationMinutes: 60,
    },
    oauthOptions: {
      providers: [{ type: OAuthProviders.Google}],
      loginRedirectURL: REDIRECT_URL,
      signupRedirectURL: REDIRECT_URL,
    },
  }

  return <StytchLogin config={config} styles={styles} />;
};

export default Login;