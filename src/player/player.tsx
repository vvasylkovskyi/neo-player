import React from 'react';

import shaka from 'shaka-player';

const manifestUri =
  'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';

type PlayerState = {
  shakaPlayer: shaka.Player | null;
};
export class Player extends React.Component {
  state: PlayerState = {
    shakaPlayer: null,
  };

  videoElementRef: React.RefObject<HTMLVideoElement> = React.createRef();

  componentDidMount(): void {
    // const shakaSingletonService = new ShakaPlayerSingleton();
    // const shakaPlayer = shakaSingletonService.getInstance();
    const shakaPlayer = new shaka.Player(this.videoElementRef.current);
    this.setState({shakaPlayer});
  }

  onError = (e: Event) => {
    console.log('Error: ', e);
  };

  async componentDidUpdate(
    _: Readonly<{}>,
    prevState: Readonly<PlayerState>
  ): Promise<void> {
    if (
      prevState.shakaPlayer !== this.state.shakaPlayer &&
      this.state.shakaPlayer
    ) {
      const {shakaPlayer} = this.state;
      shakaPlayer.addEventListener('error', this.onError);

      try {
        await shakaPlayer.load(manifestUri);
        this.videoElementRef.current?.play(); // Force play
        // shakaPlayer.
      } catch (e) {
        console.log('Error Loading Manifest: ', e);
      }
    }
  }

  render(): React.ReactNode {
    console.log('Render');
    return (
      <div>
        <video
          ref={this.videoElementRef}
          id="video"
          width="640"
          controls
        ></video>
      </div>
    );
  }
}

// export function Player() {
//   const [isLoading, setIsLoading] = useState<boolean>();
//   const [isLoaded, setIsLoaded] = useState<boolean>();

//   useEffect(() => {
//     const loadContent = async () => {
//       const shakaPlayer: ShakaPlayer = new ShakaPlayer();

//       console.log('Load Content');
//       setIsLoading(true);
//       await shakaPlayer!.load(manifestUri);
//       setIsLoaded(true);
//     };

//     const onErrorEvent = (error: Event): void => {
//       console.log('Error: ', error);
//     };

//     if (isLoading || isLoaded) {
//       return;
//     }
//     console.log('Load');

//     // Listen for error events.
//     const player = getPlayer();
//     player.addEventListener('error', onErrorEvent);
//     mountPlayer(player);

//     try {
//       loadContent();

//       // This runs if the asynchronous load is successful.
//       console.log('The video has now been loaded!');
//     } catch (e) {
//       // onError is executed if the asynchronous load fails.
//       console.log('Error loading manifest: ', e);
//     }
//   }, [isLoading, isLoaded]);

//   if (!shakaPlayer) {
//     return null;
//   }

//   console.log('Test: ', shakaPlayer);
//   return (
//     <div>
//       <video id="video" width="640" controls></video>
//     </div>
//   );
// }
