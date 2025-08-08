import { Component, Injectable } from '@angular/core';
import { getMessaging, Messaging, isSupported } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { getToken, onMessage } from 'firebase/messaging';
import { FirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { LayoutAPIService } from './layout-api.service';
import { LayoutService } from './layout.service';
import { DTOSYSNotification } from '../dto/DTOSYSNotification';

@Injectable({
  providedIn: 'root',
})

@Component({
  template: `
    <ng-template #template>
      <h5>If a storm is coming, take some steps to prepare:</h5>
      <div></div>
    </ng-template>

    <p>Show template reference rendered into warning type Notification</p>
  `,
})
export class MessagingService {
  public currentMessage = new BehaviorSubject({});
  private serviceWorker: ServiceWorkerRegistration;
  NotificationFirebase: DTOSYSNotification

  constructor(
    private messaging: Messaging,
    private layoutAPIService: LayoutAPIService,
    private layoutService: LayoutService,
  ) {
    this.currentMessage = new BehaviorSubject({});
    isSupported().then((supported) => {
      if (supported) {
        const app: FirebaseApp = initializeApp(environment.firebaseConfig);
        this.messaging = getMessaging(app);
        this.listenToForegroundMessages();

        // fetch('https://api.ipify.org?format=json')
        //   .then((response) => response.json())
        //   .then((data) => {
        //     this.IPClient = data.ip; // Lấy địa chỉ IP
        //     // console.log('IP Address:', this.IPClient);
        //   });
      } else {
        layoutService.onInfo('Trình duyệt không hỗ trợ nhận thông báo');
      }
    });
  }

  // VAPID Key dùng để xác thực giữa ứng dụng client và Firebase Messaging Server.
  // Bạn cần thay thế giá trị này bằng VAPID Key từ Firebase Console của dự án bạn.
  vapidKey =
    'BJ3oniCKyBFvdawVwUXnr3NebzsCmKOVxQ6nc8V0-_RMcYWII8f8yAE8GHR895VGRjJKiOFVYjXIwfrfe2sZoAQ';
  // Yêu cầu quyền thông báo
  requestPermission() {
    if (!('serviceWorker' in navigator)) {
      // this.layoutService.onWarning('Thông báo không được hỗ trợ trong trình duyệt này.');
      return;
    }

    Notification.requestPermission()
      .then(async (permission) => {
        if (permission === 'granted') {
          // Kiểm tra xem đã có Service Worker đăng ký hay chưa
          const existingRegistration =
            await navigator.serviceWorker.getRegistration(
              '../../../../firebase-messaging-sw.js'
            );
          // console.log(existingRegistration)
          if (existingRegistration) {
            // console.log('Service Worker already registered:', existingRegistration);
            this.serviceWorker = existingRegistration; // Lưu lại Service Worker đã đăng ký
          } else {
            // Đăng ký Service Worker mới nếu chưa tồn tại
            navigator.serviceWorker
              .register('../../../../firebase-messaging-sw.js')
              .then((registration: ServiceWorkerRegistration) => {
                // console.log('Service Worker registered:', registration);
                this.serviceWorker = registration; // Lưu lại Service Worker vừa đăng ký
              })
              .catch((err) => {
                console.error('Service Worker registration failed:', err);
              });
          }
        } else {
          console.error('Permission for notifications was denied.');
        }
      })
      .catch((err) =>
        console.error('Error requesting notification permission', err)
      );
  }

  initializeFirebaseLogic() {
    isSupported().then((supported) => {
      if (!supported || !('serviceWorker' in navigator)) {
        // this.layoutService.onWarning('Thông báo không được hỗ trợ trên trình duyệt này.');
        return; // Thoát nếu không được hỗ trợ
      }
      navigator.serviceWorker
        .getRegistration('../../../../firebase-messaging-sw.js')
        .then((registration) => {
          if (registration) {
            // Nếu Service Worker đã được đăng ký
            // console.log('Service Worker already registered:', registration);
            this.getToken(registration);
          } else {
            // Nếu chưa có Service Worker, đăng ký mới
            // console.log('No Service Worker found. Registering a new one...');
            navigator.serviceWorker
              .register('../../../../firebase-messaging-sw.js')
              .then((newRegistration) => {
                // console.log('New Service Worker registered:', newRegistration);
                this.getToken(newRegistration); // Sử dụng Service Worker mới đăng ký
              })
              .catch((err) => {
                console.error('Failed to register new Service Worker:', err);
              });
          }
        })
        .catch((err) => {
          // Xử lý lỗi khi kiểm tra Service Worker
          // console.error('Error while checking Service Worker registration:', err);

          // Đăng ký mới nếu kiểm tra thất bại
          navigator.serviceWorker
            .register('../../../../firebase-messaging-sw.js')
            .then((newRegistration) => {
              // console.log(
              //   'Đăng ký worker thất bại:',
              //   newRegistration
              // );
              this.getToken(newRegistration);
            })
            .catch((err) => {
              console.error(
                'Đăng ký worker thất bại:',
                err
              );
            });
        });
    });

    //#endregion
  }

  /**
     * Lấy FCM Token
     * @param vapidKey VAPID Key dùng để xác thực giữa ứng dụng client và Firebase Messaging Server.
        Bạn cần thay thế giá trị này bằng VAPID Key từ Firebase Console của dự án bạn.
     * @param serviceWorker đã đăng ký ở requestPermission
     */
  public async getToken(existingRegistration: ServiceWorkerRegistration) {
    await getToken(this.messaging, {
      vapidKey: this.vapidKey,
      serviceWorkerRegistration: existingRegistration,
    })
      .then((token) => {
        // Gửi token này tới backend để xử lý thông báo
        if (token) this.layoutAPIService.SetFirebaseToken(token).subscribe();
        else console.log(`Trình duyệt của bạn không hỗ trợ nhận thông báo`);
      })
      .catch((err) => {
        console.log(
          `Trình duyệt của bạn không hỗ trợ nhận thông báo: ${err}`
        );
      });
  }

  listenToForegroundMessages(): void {
    // Lắng nghe thông báo foreground từ Firebase
    onMessage(this.messaging, (payload) => {
      this.NotificationFirebase = JSON.parse(payload.data.dto)
      // console.log(this.NotificationFirebase.Body);
      this.layoutService.onInfo(`${this.NotificationFirebase.Title}: ${this.htmlToText(this.NotificationFirebase.Body)}`);
      // Xử lý thông báo
      this.currentMessage.next(JSON.parse(payload.data.dto));
    });

    // Lắng nghe thông báo từ background (service worker)
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data?.type === 'NOTIFICATION_RECEIVED') {

        // Xử lý thông báo
        this.currentMessage.next(JSON.parse(event.data.payload.data.dto));
        
      }
    });
  }

  htmlToText(html: string) {
    const tempElement = document.createElement('div'); // Tạo một div tạm
    tempElement.innerHTML = html; // Gắn nội dung HTML
    return tempElement.textContent || ''; // Trả về văn bản thuần túy
  };
}
