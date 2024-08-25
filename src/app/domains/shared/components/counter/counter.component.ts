import { Component, Input, OnInit, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent implements OnInit {
  @Input({ required: true }) duration = 0;
  @Input({ required: true }) message = '';
  counter = signal(0);
  counterRef? : any;

  constructor() {
    // NO ASYNC
    // before render
    // una vez
    console.log('constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    // before and during render
    console.log('ngOnChanges');
    console.log('-'.repeat(10));
    console.log(changes);
    const duration = changes['duration'];
    if (duration && duration.currentValue !== duration.previousValue) {
      this.doSomething();
    }
  }

  ngOnInit() {
    console.log('duration', this.duration);
    console.log('message', this.message);
    this.counterRef = setInterval(() => {
      console.log('run');
      this.counter.update(state => state + 1);
    }, 1000);
  }

  ngAfterViewInit() {
    
  }

  ngOnDestroy() {
    clearInterval(this.counterRef)
  }

  doSomething() {

  }
}
