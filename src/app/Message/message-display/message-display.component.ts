import { ChangeDetectionStrategy, Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Message  } from "../message";

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MessageDisplayComponent implements OnInit {

  @Input() message : Message;
  @Output() clearMessage : EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClearClick(){
    this.clearMessage.emit();
  }

}
