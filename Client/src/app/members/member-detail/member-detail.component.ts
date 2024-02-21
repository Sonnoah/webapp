import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabDirective, TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs';
import { TimeagoModule } from 'ngx-timeago';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { Message } from 'src/app/_models/Message';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TabsModule,
    GalleryModule,
    TimeagoModule,
    MemberMessagesComponent,
  ],
})
export class MemberDetailComponent implements OnInit {
  member: Member = {} as Member;
  user?: User;
  photos: GalleryItem[] = [];

  @ViewChild('memberTabs', { static: true }) memberTabs?: TabsetComponent;
  activeTab?: TabDirective;
  messages: Message[] = [];

  constructor(
    private accountService: AccountService,
    public presenceService: PresenceService,
    private messageService: MessageService,
    private memberService: MembersService,
    private route: ActivatedRoute
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) this.user = user;
      },
    });
  }

  ngOnInit(): void {
    //
    // this.loadMember()//<--ไม่ใช้แล้ว เพราะ ได้ member จาก resolver
    this.route.data.subscribe({
      next: (data) => {
        this.member = data['member']; //เพราะเราตั้งชื่อ member ใน app-routing.module.ts
        this.getImages();
      },
    });
    this.route.queryParams.subscribe({
      next: (params) => params['tab'] && this.selectTab(params['tab']),
    });
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  getImages() {
    if (!this.member) return;
    for (const photo of this.member.photos) {
      this.photos.push(new ImageItem({ src: photo.url, thumb: photo.url }));
    }
  }

  // loadMessages() {
  //   if (!this.member) return
  //   this.messageService.getMessagesThread(this.member.userName).subscribe({
  //     next: response => this.messages = response
  //   })
  // }

  onTabActivated(tab: TabDirective) {
    this.activeTab = tab;
    if (this.activeTab.heading === 'Messages' && this.user)
      this.messageService.createHubConnection(
        this.user,
        this.member.userName
      ); // this.loadMessages()
    else this.messageService.stopHubConnection();
  }

  selectTab(tabHeading: string) {
    if (!this.memberTabs) return;
    const tab = this.memberTabs.tabs.find((tab) => tab.heading === tabHeading);
    if (!tab) return;
    tab.active = true;
  }
}
