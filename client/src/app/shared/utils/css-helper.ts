export class CssHelper {

  constructor() { }

  /** Utility function that will pull the first instance of a CSSStyleRule from the list of local stylescripts.
   * @param selectorText String that specifies the rule to select. (e.g. .)
   */
  public static getCssRule(selectorText: string) {
    for (let r = 0; r < document.styleSheets.length; r++) {
      const css = document.styleSheets[r];
      if (!(css instanceof CSSStyleSheet)) {
        continue;
      }
      // Now TypeScript knows that your sheet is CSS sheet
      if (css && !css.href || css.href.indexOf(window.location.host) !== -1) { // check that we aren't going to run into any CORS issues.
        const rules = css.cssRules ? css.cssRules : css.rules;
        if (rules) {
          for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            if (!(rule instanceof CSSStyleRule)) {
              continue;
            }
            // Now TypeScript knows that your rule is CSSStyleRule
            if (rule.selectorText === selectorText) {
              return rule;
            }
          }
        }
      }
    }
  }

  public static hexToRgb(hex, alpha = null) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.length === 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
    const g = parseInt(hex.length === 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
    const b = parseInt(hex.length === 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
    if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  }

}
