module.exports = {
  purge: {
    content: ['./index.html'],
    options: {
      keyframes: true,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors: {
            'blue': '#24283b',
            'darkblue': '#1a1b26',
            'purple': '#bb9af7',
            'cyan': '#2ac3de',
            'orange': '#ff9e64',
            'green': '#9ece6a',
            'red': '#f7768e',
            'white': '#c0caf5',
        },
        keyframes: {
          blink: {
            '0%, 49%': { opacity: '1' },
            '50%, 100%': { opacity: '0' },
          }
        },
        animation: {
          blink: 'blink 1.2s linear infinite;',
        }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
