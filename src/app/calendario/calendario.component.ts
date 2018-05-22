import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import {
  getSeconds,
  getMinutes,
  getHours,
  getDate,
  getMonth,
  getYear,
  setSeconds,
  setMinutes,
  setHours,
  setDate,
  setMonth,
  setYear
} from 'date-fns';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { DiasigrejotaService } from '../diasigrejota.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

export const DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CalendarioComponent),
  multi: true
};

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR]
})

export class CalendarioComponent implements ControlValueAccessor, OnInit {

  @Input() locale: string = moment.locale();

  @Input() placeholder: string;

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  date: moment.Moment;

  dateStruct: moment.Moment;

  datePicker: any;

  private onChangeCallback: (date: moment.Moment) => void = () => {};

  view: string = 'month';

  viewDate: Date = moment().toDate();

  events: CalendarEvent[] = [];
  
  clickedDate: moment.Moment;

  constructor(
  	private cdr: ChangeDetectorRef,
  	public auth: AuthService,
  	public diaigrejotaService: DiasigrejotaService,
  	public router: Router
  ) {

  }

  ngOnInit() {
  	this.getEventos();
  }

  writeValue(date: Date): void {
    this.date = moment(date);

    this.dateStruct = moment(date).add(1, 'month');

    this.cdr.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {}

  updateDate(): void {
    const newDate: moment.Moment = moment().year(this.dateStruct.year().valueOf()).month(this.dateStruct.month.toString()).day(this.dateStruct.day.toString())
    this.writeValue(newDate.toDate());
    this.onChangeCallback(newDate);
  }

  displayDate(date: Date) {
  	return moment(date).format('LL');
  }

  displayMonthYear(date: Date) {
  	return moment().year(date.getFullYear()).month(date.getMonth()).format('MMMM [de] YYYY');
  }

  onDaySelect() {
  	this.router.navigate(['calendario/'+moment(this.clickedDate).format('DD-MM-YYYY')]);
  }

  getEventos() {
  	var calendarReceiver: Array<CalendarEvent>;
  	this.diaigrejotaService.getEventos(this.viewDate)
  		.subscribe(eventos => this.events = eventos);
  }
}