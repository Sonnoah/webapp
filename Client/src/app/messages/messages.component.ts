import { Component, OnInit } from '@angular/core';
import { MessageService } from '../_services/message.service';
import { Pagination } from '../_models/pagination';
import { Message } from '../_models/Message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages?: Message[]
  pagination?: Pagination
  label = 'Unread'  // 'Inbox'
  pageNumber = 1
  pageSize = 5

  constructor(private messageService: MessageService) { }
  ngOnInit(): void {
    this.loadMessage()
  }
  loadMessage() {
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.label).subscribe({
      next: response => {
        this.messages = response.result
        this.pagination = response.pagination
      }
    })
  }
  pageChanged(event: any) {
    if (this.pageNumber === event.page) return
    this.pageNumber = event.page
    this.loadMessage()
  }
}
