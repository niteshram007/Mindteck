"use client";

import ReCaptchaProvider from "./ReCaptchaProvider";

export const withReCaptcha = (WrappedComponent) => {
  function WithReCaptcha(props) {
    return (
      <ReCaptchaProvider>
        <WrappedComponent {...props} />
      </ReCaptchaProvider>
    );
  }

  WithReCaptcha.displayName = `withReCaptcha(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithReCaptcha;
};
