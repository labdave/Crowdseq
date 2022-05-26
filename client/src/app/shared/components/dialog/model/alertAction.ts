/* Alert Action Class - used for custom buttons on dialogs*/

export class AlertAction {
  constructor(
    public text: string,
    public value: string,
    public backgroundColor: string,
    public fontColor: string
  ) { }
}
