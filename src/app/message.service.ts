import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  messages: string[] = [];
  alert: Alert;

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
    this.alert = undefined;
  }

  displayAlert(message: string, yes: (any) => void, no: (any) => void, sender: any) {
  	this.alert = {message: message, yes: yes, no: no, sender: sender};
  }

  yes() {
  	this.alert.yes(this.alert.sender);
  	this.alert = undefined;
  }

  no() {
  	this.alert.no(this.alert.sender);
  	this.alert = undefined;
  }

  hasAlert() {
  	return this.alert !== undefined;
  }
}

export class Alert {
	message: string
	yes: Function
	no: Function
	sender: any
}