import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

interface ScriptChar {
  char: string;
  corrupted?: boolean;
}

interface Broadcast {
  id: string;
  title: string;
  audio: string;
  lines: string[];
  lastSentence: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  @ViewChild('audioPlayer')
  audioPlayer!: ElementRef<HTMLAudioElement>;

  isReceiving = false;
  isLost = false;
  isPlaying = false;

  currentTime = 0;
  audioDuration = 0;

  broadcasts: Broadcast[] = [

    {
      id: 'sakura',
      title: '桜並木についてのお知らせ',
      audio: 'audio/fm.sakura.m4a',
      lines: [
        'こちらほとりFMです。続いて桜の話題です。',
        'スーパーの裏手を流れる川沿いの桜並木ですが、',
        '今年で見納めとなる見込みです。',
        '来月から河川の改修工事が始まる予定で、',
        '桜の木も順次伐採されることになっています。',
        '毎年この時期になると散歩をする人の姿が多く見られましたが、',
        '今年は少しいつもより長く眺めている方が多いようです。'
      ],
      lastSentence:
        'お買い物のついでにでもよかったら見てみてください。'
    },

    {
      id: 'matsuri',
      title: 'ほとり町夏祭りのお知らせ',
      audio: 'audio/fm.matsuri.m4a',
      lines: [
        '続いて、町内からのお知らせです。',
        '今年のほとり町夏祭りは、',
        '8月の第三土曜日に開催されることになりました。',
        '会場は、例年どおり中央公園です。',
        '当日は午後5時から屋台が並び、',
        '7時から盆踊りが行われる予定です。',
        '今年も最後に花火が打ち上げられますので、',
        'お近くにお住まいの方は、',
        'ぜひご家族やお友達と一緒にお楽しみください。',
        'なお、当日は会場周辺で交通規制が行われます。',
        'お車でお越しの方はご注意ください。'
      ],
      lastSentence:
        '以上、ほとり町夏祭りのお知らせでした。'
    },

    {
      id: 'tomarigi',
      title: '喫茶とまり木 今月末で閉店',
      audio: 'audio/fm.kissa.m4a',
      lines: [
        '続いて、町内のお店からのお知らせです。',
        '中央通りの喫茶とまり木は、',
        '今月31日をもちまして、',
        '閉店することになりました。',
        '長年、町の皆さんに親しまれてきたお店ですが、',
        '店主の方によりますと、',
        '今月末を一つの区切りとして、',
        '営業を終了するとのことです。',
        '閉店までは、通常どおり営業する予定です。',
        '長い間、ありがとうございました。'
      ],
      lastSentence:
        '以上、喫茶とまり木からのお知らせでした。'
    },

    {
      id: 'hana',
      title: '川辺のサルスベリが見ごろを迎えています',
      audio: 'audio/fm.hana.m4a',
      lines: [
        'ほとりFMお散歩ニュース！続いて、町内の季節の話題です。',
        '川辺に植えられているサルスベリが見ごろを迎えています。',
        '鮮やかな桃色の花をつけた木々が、',
        '川沿いの遊歩道を歩く人の目を楽しませています。',
        'なお、このあたりでは今後川沿いの整備が予定されているため、',
        'ここでサルスベリを見られるのも今年が最後になる見込みです。',
        '見ごろはもうしばらく続くということです。',
        'お近くを通る際は、足を止めて眺めてみてはいかがでしょうか。'
      ],
      lastSentence:
        '以上、季節の話題をお伝えしました。'
    },

    {
      id: 'bus',
      title: '「ほとりん」運行終了のお知らせ',
      audio: 'audio/fm.bus.m4a',
      lines: [
        '続いて、市内交通についてのお知らせです。',
        '市内を循環するコミュニティバス「ほとりん」は、',
        '今月末をもちまして、運行を終了することになりました。',
        '長年、多くの方に利用されてきた「ほとりん」ですが、',
        '利用者数の減少などを理由に、',
        '今回、運行を終了することになったということです。',
        '最終運行日は、今月31日を予定しています。',
        'ご利用の際は、運行時刻をご確認ください。'
      ],
      lastSentence:
        '以上、市内交通についてのお知らせでした。'
    },

    {
      id: 'gakkou',
      title: '市立川辺小学校 統合のお知らせ',
      audio: 'audio/fm.gakkou.m4a',
      lines: [
        '続いて、教育についてのお知らせです。',
        '市立川辺小学校は、児童数の減少に伴い、',
        '来年度から市内のほかの小学校と統合されることになりました。',
        '現在の校舎で授業が行われるのは、',
        '今年度までとなります。',
        '市によりますと、',
        '統合後は新しい学校で授業が始まる予定です。'
      ],
      lastSentence:
        '以上、教育についてのお知らせでした。'
    },

    {
      id: 'radio',
      title: 'ラジオの受信状態についてのお知らせ',
      audio: 'audio/fm.radio.m4a',
      lines: [
        '続いて、放送設備についてのお知らせです。',
        'ここ数日、町内の一部地域で、',
        'ラジオの受信状態が悪くなるという声が寄せられています。',
        '特に、夕方から夜にかけて、',
        '音声が途切れたり、',
        '雑音が入ったりすることがあるということです。',
        '現在、原因について調査を行っていますが、',
        '今のところ詳しいことは分かっていません。',
        'ご不便をおかけしますが、',
        'しばらく様子見をしていただきますようお願いいたします。'
      ],
      lastSentence:
        '以上、放送設備についてのお知らせでした。'
    },

    {
      id: 'toshokan',
      title: '個人図書館 読み聞かせの会',
      audio: 'audio/fm.toshokan.m4a',
      lines: [
        '続いて、町内からの話題です。',
        '先日、中央通りにある個人図書館で、',
        '子供向けの読み聞かせの会が行われました。',
        '当日は町の子供たちが集まり、',
        '絵本の読み聞かせを楽しみました。',
        '終始和やかな雰囲気の会となったということです。',
        '個人図書館では、今後も週に1回、',
        '読み聞かせの会を開催する予定です。',
        'お近くの方は、ぜひ参加してみてはいかがでしょうか。'
      ],
      lastSentence:
        '以上、町内からの話題をお伝えしました。'
    }

  ];

  currentBroadcastId = 'sakura';

  displayedScriptLines: ScriptChar[][] = [];

  displayedLastSentence: ScriptChar[] = [];

displayedFinalSignal: ScriptChar[] = [];

  private interferenceTimer: any;

  private interferenceStartTimes: number[] = [];
  private interferenceDurations: number[] = [];

  get currentBroadcast(): Broadcast {
    return this.broadcasts.find(
      broadcast =>
        broadcast.id === this.currentBroadcastId
    ) ?? this.broadcasts[0];
  }

  constructor() {
    this.createNormalScript();
  }

  private createNormalScript(): void {

    this.displayedScriptLines =
      this.currentBroadcast.lines.map(
        line =>
          [...line].map(character => ({
            char: character,
            corrupted: false
          }))
      );
  
    this.displayedLastSentence =
      [...this.currentBroadcast.lastSentence]
        .map(character => ({
          char: character,
          corrupted: false
        }));
  
    this.displayedFinalSignal =
      [...'ほとりFMでした。']
        .map(character => ({
          char: character,
          corrupted: false
        }));
  }

  changeBroadcast(): void {

    this.isReceiving = false;
    this.isLost = false;
    this.currentTime = 0;
    this.audioDuration = 0;
    this.isPlaying = false;

    clearInterval(this.interferenceTimer);

    const audio =
      this.audioPlayer?.nativeElement;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 1;
      audio.load();
    }

    this.createNormalScript();
  }

  startReceiving(): void {

    this.isReceiving = true;
    this.isLost = true;

    const audio =
      this.audioPlayer.nativeElement;

    audio.currentTime = 0;
    audio.volume = 1;
    audio.play();

    this.isPlaying = true;

    this.startInterference();
  }

  onAudioLoaded(): void {

    const audio =
      this.audioPlayer.nativeElement;

    this.audioDuration =
      audio.duration || 0;
  }

  togglePlay(): void {

    const audio =
      this.audioPlayer.nativeElement;

    if (audio.paused) {
      audio.play();
      this.isPlaying = true;
    } else {
      audio.pause();
      this.isPlaying = false;
    }
  }

  seekAudio(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    const time =
      Number(input.value);

    const audio =
      this.audioPlayer.nativeElement;

    audio.currentTime = time;
    this.currentTime = time;
  }

  formatTime(seconds: number): string {

    if (
      !Number.isFinite(seconds) ||
      seconds < 0
    ) {
      return '0:00';
    }

    const minutes =
      Math.floor(seconds / 60);

    const remainingSeconds =
      Math.floor(seconds % 60);

    return (
      minutes +
      ':' +
      remainingSeconds
        .toString()
        .padStart(2, '0')
    );
  }

  onTimeUpdate(): void {

    const audio =
      this.audioPlayer.nativeElement;

    this.currentTime =
      audio.currentTime;

    const duration =
      audio.duration || 37;

    const interferenceBoost =
      this.getInterferenceTextBoost(
        audio.currentTime
      );

    this.updateScriptCorruption(
      audio.currentTime,
      interferenceBoost
    );

    this.updateLastLinesCorruption(
      audio.currentTime,
      interferenceBoost
    );
  }
  private updateScriptCorruption(
    time: number,
    interferenceBoost: number
  ): void {

    this.displayedScriptLines =
      this.currentBroadcast.lines.map(
        (line, lineIndex) => {

          return [...line].map(
            (character, charIndex) => {

              if (
                interferenceBoost <= 0
              ) {
                return {
                  char: character,
                  corrupted: false
                };
              }

              if (
                character === '。' ||
                character === '、' ||
                character === '「' ||
                character === '」'
              ) {
                return {
                  char: character,
                  corrupted: false
                };
              }

              const seed =
                Math.abs(
                  Math.sin(
                    charIndex * 12.9898 +
                    lineIndex * 78.233 +
                    time * 13.731
                  )
                ) * 100;

              if (seed < interferenceBoost) {
                return {
                  char:
                    (charIndex + lineIndex) % 2 === 0
                      ? '■'
                      : '□',
                  corrupted: true
                };
              }

              return {
                char: character,
                corrupted: false
              };
            }
          );
        }
      );
  }


  private updateLastLinesCorruption(
    time: number,
    interferenceBoost: number
  ): void {

    const corruptLine = (
      text: string,
      lineIndex: number
    ): ScriptChar[] => {

      return [...text].map(
        (character, charIndex) => {

          if (interferenceBoost <= 0) {
            return {
              char: character,
              corrupted: false
            };
          }

          if (
            character === '。' ||
            character === '、' ||
            character === '「' ||
            character === '」'
          ) {
            return {
              char: character,
              corrupted: false
            };
          }

          const seed =
            Math.abs(
              Math.sin(
                charIndex * 12.9898 +
                lineIndex * 78.233 +
                time * 13.731
              )
            ) * 100;

          if (seed < interferenceBoost) {
            return {
              char:
                (charIndex + lineIndex) % 2 === 0
                  ? '■'
                  : '□',
              corrupted: true
            };
          }

          return {
            char: character,
            corrupted: false
          };
        }
      );
    };

    this.displayedLastSentence =
      corruptLine(
        this.currentBroadcast.lastSentence,
        100
      );

    this.displayedFinalSignal =
      corruptLine(
        'ほとりFMでした。',
        101
      );
  }
  private getInterferenceTextBoost(
    time: number
  ): number {

    for (
      let i = 0;
      i < this.interferenceStartTimes.length;
      i++
    ) {

      const start =
        this.interferenceStartTimes[i];

      const end =
        start +
        this.interferenceDurations[i];

      if (
        time >= start &&
        time < end
      ) {

        const volume =
          this.interferenceVolume(
            time,
            start
          );

        if (volume >= 1) {
          return 0;
        }

        if (volume >= 0.25) {
          return 18;
        }

        if (volume >= 0.08) {
          return 32;
        }

        return 55;
      }
    }

    return 0;
  }

  private startInterference(): void {

    clearInterval(this.interferenceTimer);

    const audio =
      this.audioPlayer.nativeElement;

    const duration =
      audio.duration || 37;

    this.interferenceStartTimes = [];
    this.interferenceDurations = [];

    const count =
      4 + Math.floor(Math.random() * 3);

    for (let i = 0; i < count; i++) {

      const start =
        5 +
        Math.random() *
        Math.max(duration - 12, 1);

      const interferenceDuration =
        1 +
        Math.random() * 2;

      this.interferenceStartTimes.push(start);

      this.interferenceDurations.push(
        interferenceDuration
      );
    }

    const finalStart =
      Math.max(
        duration -
        (4 + Math.random() * 2),
        0
      );

    const finalDuration =
      2 +
      Math.random() * 2;

    this.interferenceStartTimes.push(finalStart);

    this.interferenceDurations.push(
      finalDuration
    );

    this.interferenceTimer =
      setInterval(() => {

        const time =
          audio.currentTime;

        let volume = 1;

        for (
          let i = 0;
          i < this.interferenceStartTimes.length;
          i++
        ) {

          const start =
            this.interferenceStartTimes[i];

          const end =
            start +
            this.interferenceDurations[i];

          if (
            time >= start &&
            time < end
          ) {

            volume =
              this.interferenceVolume(
                time,
                start
              );

            break;
          }
        }

        audio.volume = volume;

      }, 50);
  }

  private interferenceVolume(
    time: number,
    start: number
  ): number {

    const elapsed =
      time - start;

    const pattern =
      Math.floor(elapsed * 7) % 8;

    switch (pattern) {

      case 0:
      case 3:
        return 1;

      case 1:
      case 5:
        return 0.25;

      case 2:
        return 0.08;

      case 4:
      case 6:
      case 7:
        return 0;

      default:
        return 1;
    }
  }

  onAudioEnded(): void {

    this.isReceiving = false;
    this.isPlaying = false;

    clearInterval(this.interferenceTimer);

    const audio =
      this.audioPlayer.nativeElement;

    audio.volume = 1;

    this.currentTime =
      audio.currentTime;
  }

}