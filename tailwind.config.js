/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      primary: "#1890ff",
    },
    extend: {
      backgroundImage: {
        "zalo-icon": "url('/assets/icons/icons8-zalo.svg')",
        "phone-icon": "url('/assets/icons/icons8-phone.svg')",
        "phone-call-icon": "url('/assets/icons/icons8-phone-64.png')",
        "messenger-icon": "url('/assets/icons/icons8-messenger.svg')",
        "sms-icon": "url('/assets/icons/icons8-sms-48.png')",
      },
      keyframes: {
        ringRing: {
          "0%": {
            transform: "rotate(0) scale(1) skew(1deg)",
          },
          "10%": {
            transform: "rotate(-25deg) scale(1) skew(1deg)",
          },
          "20%": {
            transform: "rotate(25deg) scale(1) skew(1deg)",
          },
          "30%": {
            transform: "rotate(-25deg) scale(1) skew(1deg)",
          },
          "40%": {
            transform: "rotate(25deg) scale(1) skew(1deg)",
          },
          "50%": {
            transform: "rotate(0) scale(1) skew(1deg)",
          },
          "100%": {
            transform: "rotate(0) scale(1) skew(1deg)",
          },
        },
        circleFill: {
          "0%": {
            transform: "rotate(0) scale(0.7) skew(1deg)",
            opacity: 0.2,
          },
          "50%": {
            transform: "rotate(0) scale(1) skew(1deg)",
            opacity: 0.2,
          },
          "100%": {
            transform: "rotate(0) scale(0.7) skew(1deg)",
            opacity: 0.2,
          },
        },
        circleExand: {
          "0%": {
            transform: "rotate(0) scale(.5) skew(1deg)",
            opacity: 0.1,
          },
          "30%": {
            transform: "rotate(0) scale(.7) skew(1deg)",
            opacity: 0.5,
          },
          "100%": {
            transform: "rotate(0) scale(1) skew(1deg)",
            opacity: 0.1,
          },
        },
      },
      animation: {
        phoneRing: "ringRing 1s infinite ease-in-out",
        circleAnim: "circleExand 1.2s infinite ease-in-out",
        circleFillAnim: "circleFill 1.2s infinite ease-in-out",
      },
    },
    screens: {
      xxs: {
        max: "440px",
      },
      xs: {
        max: "575px",
      },
      sm: {
        min: "576px",
      },
      md: {
        min: "768px",
      },
      lg: {
        min: "992px",
      },
      xl: {
        min: "1200px",
      },
      "2xl": {
        min: "1600px",
      },
    },
  },
  plugins: [],
};
