import {Directive, EventEmitter, Input, Output, HostListener, HostBinding} from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
// tslint:disable-next-line: directive-selector
  selector: 'th[sortable]'
})
export class SortableDirective {

  constructor() { }
  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();
  @HostBinding('class.asc') 'direction === "asc"': boolean;
  @HostBinding('class.desc') 'direction === "desc"': boolean;
  @HostListener('click') rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }

}
