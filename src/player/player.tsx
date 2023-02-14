import React, {useEffect, useState} from 'react';

import shaka from 'shaka-player';

type ShakaPlayer = {};

function getPlayer() {
  const video: HTMLMediaElement = document.getElementById(
    'video'
  ) as HTMLMediaElement;
  return new shaka.Player(video);
}

export function Player() {
  const [shakaPlayer, mountPlayer] = useState<ShakaPlayer | null>();

  useEffect(() => {
    const player = getPlayer();
    mountPlayer(player);
  }, []);

  console.log('Test: ', shakaPlayer);
  return (
    <div>
      <video id="video" width="640" controls></video>
    </div>
  );
}
