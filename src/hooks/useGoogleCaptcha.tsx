'use client';

import { ApiResponseParams } from '@api/config/ApiResponse';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { load } from 'recaptcha-v3';

interface IUseGoogleCaptchaProps {
  readonly refreshToken?: boolean;
  readonly isAutoHideBadge?: boolean;
  readonly isVerifyToken?: boolean;
}

interface RecaptchaExecutor {
  execute: () => Promise<string>;
}

export default function useGoogleCaptcha({
  refreshToken = false,
  isAutoHideBadge = true,
  isVerifyToken = true,
}: IUseGoogleCaptchaProps = {}) {
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [validToken, setValidToken] = useState<boolean>(false);

  // generate Google reCAPTCHA v3 token
  useEffect(() => {
    load(process.env.CAPTCHA_SITE_KEY as string, {
      autoHideBadge: isAutoHideBadge, // Hide/Show captcha v3 badge
    }).then((recaptcha: RecaptchaExecutor) => {
      recaptcha.execute().then((token: string) => {
        setCaptchaToken(token); // Will print the token
      });
    });
  }, [refreshToken]);

  // verify Google reCAPTCHA v3 token
  useEffect(() => {
    if (captchaToken && isVerifyToken) {
      const url = `/api/google-captcha-validator`;

      axios
        .post<ApiResponseParams>(url, {
          token: captchaToken,
        })
        .then((response) => {
          if (response?.data?.title === 'SUCCESS') {
            setValidToken(true);
          } else {
            setValidToken(false);
          }
        })
        .catch((err: Error) => {
          if (err) {
            setValidToken(false);
          }
        });
    }
  }, [captchaToken, isVerifyToken]);

  return { captchaToken, validToken };
}
