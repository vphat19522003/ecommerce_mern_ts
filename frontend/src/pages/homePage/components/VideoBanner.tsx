const VideoParallax = {
  top: '0',
  left: '0',
  width: '100%',
  height: '100%'
};

const VideoBanner = (): JSX.Element => {
  return (
    <div className='flex '>
      <div className='relative block w-full h-full'>
        {/* <div style={parrallax}></div> */}

        <div className='relative w-full h-[480px] overflow-hidden'>
          <video autoPlay muted loop className='absolute object-cover' style={VideoParallax}>
            <source
              src='https://videos.pexels.com/video-files/5889074/5889074-uhd_2560_1440_25fps.mp4'
              type='video/mp4'
            />
          </video>
        </div>

        <div className='absolute top-0 right-[0px] flex items-center bg-dark bottom-0 bg-opacity-30'>
          <p
            className='p-8 text-6xl font-bold leading-relaxed tracking-wide text-right text-white capitalize text-light'
            style={{ fontFamily: 'Nunito, sans-serif' }}>
            Fast <br /> Safe <br /> Convenient
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoBanner;
