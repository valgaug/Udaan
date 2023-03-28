

import React, { useEffect, useState } from 'react';
import Controls from './Controls';
import Videos from './Videos';
import './VideoCall.css';
import { ClientConfig, IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng';
import { createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';

const config: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};


 

const appId = '982666deb2ab44e7a3ab95555076b864';
const token: string | null =
  '007eJxTYNjy+tOSL85PNP7m7fjLlpdgeH3DtAvJK6d9O/2lIMhKq41NgcHSwsjMzCwlNckoMcnEJNU80TgxydIUCAzMzZIszEyEtiumNAQyMmQVbWFiZIBAEJ+HISS1uCQ8syTDKz8rn4EBAF94JKQ=';
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

//VideoComponent for the video call
const VideoCall = () => {
  const channelName = 'TestWithJojo';
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  const options =
  {
    appId: '982666deb2ab44e7a3ab95555076b864',
  
    channel: channelName,
  
    token: '',
    uid: 0,
    ExpireTime: 60,
    serverUrl: 'https://agora-token-service-production-4720.up.railway.app' 
  };
    async function FetchToken()
    {
      return new Promise(function (resolve)
      {
        axios.get(options.serverUrl+'/rtc/'+options.channel+'/1/uid/'+options.uid+'/?expiry='+ options.ExpireTime)
          .then(
            response =>
            {
              console.log(response.data.rtcToken);
              resolve(response.data.rtcToken);
              setTokenGenerated(response.data.rtcToken);
            })
          .catch(error =>
          {
            console.log(error);
          });
      });
    }

  useEffect(() => {
    // function to initialise the SDK
    const init = async (name: string) => {
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log('subscribe success');
        if (mediaType === 'video') {
          setRemoteUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === 'audio') {
          user.audioTrack?.play();
        }
      });

      client.on('user-unpublished', (user, type) => {
        console.log('unpublished', user, type);
        if (type === 'audio') {
          user.audioTrack?.stop();
        }
        if (type === 'video') {
          setRemoteUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on('user-left', (user) => {
        console.log('leaving', user);
        setRemoteUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(appId, name, token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      console.log('init ready');
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);

  return (
    <div className='videocall-container'>
      {ready && tracks && (
        <Controls client={client} tracks={tracks} setStart={setStart} />
      )}
      {start && tracks && <Videos users={remoteUsers} tracks={tracks} />}
    </div>
  );
};

//Form to enter the channel name, to be used for teachers to create class.
// right now it is for entering the class. need to be refactored
// const ChannelForm = (props: {
//   setInCall: React.Dispatch<React.SetStateAction<boolean>>;
//   setChannelName: React.Dispatch<React.SetStateAction<string>>;
// }) => {
//   const { setInCall, setChannelName } = props;
//   return (
//     <form className="join">
//       {appId === '' ? (
//         <p style={{ color: 'red' }}>Please enter your Student ID</p>
//       ) : null}
//       <input
//         type="text"
//         placeholder="Enter Channel Name"
//         onChange={(e) => setChannelName(e.target.value)}
//       />
//       <button
//         onClick={(e) => {
//           e.preventDefault();
//           setInCall(true);
//         }}
//       >
//         Join
//       </button>
//     </form>
//   );
// };
export default VideoCall;
