const VideoParallax = {
  top: '0',
  left: '0',
  width: '100%',
  height: '100%'
};

const VideoBanner = (): JSX.Element => {
  return (
    <div className='flex mt-[100px]'>
      <div className='relative block w-full h-full'>
        {/* <div style={parrallax}></div> */}

        <div className='relative w-full h-[580px] overflow-hidden'>
          <video autoPlay muted loop className='absolute object-cover' style={VideoParallax}>
            <source src='https://cdn.pixabay.com/video/2022/02/21/108458-680697604_large.mp4' type='video/mp4' />
          </video>
        </div>

        <div className='absolute top-0 right-[0px] flex items-center bg-dark bottom-0 bg-opacity-30'>
          <p className='p-8 text-4xl font-bold text-light capitalize tracking-wide leading-relaxed text-white text-right'>
            Fast <br /> Safe <br /> Convenient
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoBanner;
