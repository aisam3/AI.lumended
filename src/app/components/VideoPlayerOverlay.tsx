import { useState, useRef } from 'react';

function VideoPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const mobileIframeRef = useRef<HTMLIFrameElement>(null);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    return (
        <div className="relative w-full h-full">
            {!isPlaying ? (
                // Thumbnail with play button
                <div
                    className="absolute inset-0 cursor-pointer group"
                    onClick={handlePlay}
                >
                    {/* Video thumbnail */}
                    <img
                        src="/path-to-your-video-thumbnail.jpg"
                        alt="Video thumbnail"
                        className="w-full h-full object-contain bg-black"
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all" />

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white bg-opacity-90 group-hover:bg-opacity-100 group-hover:scale-110 transition-all flex items-center justify-center">
                            <svg
                                className="w-10 h-10 text-black ml-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            ) : (
                // Actual video iframe
                <iframe
                    ref={mobileIframeRef}
                    src="https://drive.google.com/file/d/1dImI3FbahUcCIR53VN0Pz51sYepHE6pP/preview?autoplay=1"
                    width="100%"
                    height="100%"
                    allow="autoplay"
                    allowFullScreen
                />
            )}
        </div>
    );
}

export default VideoPlayer;