/**
 * Returns an object with two fields
 * colors: A colors object with theme colors (obj), 
 * theme: theme name (string).
 * @param {string} theme optional to set theme
 */
function ColorTheme(theme = 'retro') {
  let colors;
  switch (theme) {
    case 'wonderland':
      // https://colorhunt.co/palette/3382
      colors = {
        PrimaryLighter: '#ffc7c7',
        PrimaryLight: '#dc7646',
        Primary: '#a45c5c',
        PrimaryDark: '#6c476e'
      };
      break;
    case 'orange':
      // https://colorhunt.co/palette/138039
      colors = {
        PrimaryLighter: '#fff4e3',
        PrimaryLight: '#ffcdab',
        Primary: '#ffa45c',
        PrimaryDark: '#5d5d5a'
      };
      break;
    case 'sugar':
      // https://colorhunt.co/palette/105443
      colors = {
        PrimaryLighter: '#f6f6f6',
        PrimaryLight: '#ffe2e2',
        Primary: '#ffc7c7',
        PrimaryDark: '#8785a2'
      };
      break;
    case 'ice':
      // https://colorhunt.co/palette/33990
      colors = {
        PrimaryLighter: '#f7fbfc',
        PrimaryLight: '#d6e6f2',
        Primary: '#b9d7ea',
        PrimaryDark: '#769fcd'
      };
      break;
    case 'choco':
      colors = {
        // https://colorhunt.co/palette/8001
        PrimaryLighter: '#f0d394',
        PrimaryLight: '#98651e',
        Primary: '#6e4b1f',
        PrimaryDark: '#533710',
      };
      break;
    case 'B&W':
      colors = {
        // https://colorhunt.co/palette/130807
        PrimaryLighter: '#f7f7f7',
        PrimaryLight: '#eeeeee',
        Primary: '#929aab',
        PrimaryDark: '#393e46',
      };
      break;
    case 'retro':
      colors = {
        // https://colorhunt.co/palette/136570
        PrimaryLighter: '#fafafa',
        PrimaryLight: '#e3e3e3',
        Primary: '#ee6f57',
        PrimaryDark: '#cb3737',
      };
      break;
    case 'blues':
    default:
      theme = 'blues';
      colors = {
        // https://colorhunt.co/palette/22272
        PrimaryLighter: '#f9f7f7',
        PrimaryLight: '#dbe2ef',
        Primary: '#3f72af',
        PrimaryDark: '#112d4e',
      };
      break;
  }
  return { colors, theme };
}

export default ColorTheme;