/**
 * @example children:float-right => .children:float-right > * { ... }
 */
const childrenPlugin = ({ addVariant, e }) => {
  addVariant('children', ({ modifySelectors, separator }) => (
    modifySelectors(({ className }) => `.${e(`children${separator}${className}`)} > *`)
  ));
};

module.exports = {
  theme: {
    extend: {
      maxHeight: {
        20: '20rem',
      },
      width: {
        '12/12': '100%',
        60: '240px',
        75: '300px',
        80: '320px',
      },
      height: {
        60: '240px',
        75: '300px',
        95: '380px',
      },
    },
  },
  variants: {
    float: ['responsive', 'children'],
    visibility: ['responsive', 'hover', 'group-hover'],
  },
  plugins: [
    childrenPlugin,
  ],
};
