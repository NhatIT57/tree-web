import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'chat-room-component',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
  // Font awesome Icons
  @Input() User: any = null;
  @Input() Index: number = -1;
  @Input() onCloseChat: (index: number) => void;

  constructor() { }

  ngOnInit(): void { }

  closeChat = () => {
    this.onCloseChat(this.Index);
  }

  onSendChat = () => {
    console.log('send chat');
  }
}
