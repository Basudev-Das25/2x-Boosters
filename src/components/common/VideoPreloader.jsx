import { useEffect } from 'react';

const VideoPreloader = ({ videoPaths = [] }) => {
    useEffect(() => {
        // Wait for main thread to be idle or after a short delay
        const timer = setTimeout(() => {
            videoPaths.forEach(path => {
                if (!path) return;

                // Create a fetch request to force the browser to cache it
                // We don't need to do anything with the response
                fetch(path)
                    .then(response => {
                        // Optional: console.log(`Preloaded: ${path}`);
                    })
                    .catch(() => {
                        // Silently fail, it's not critical
                    });

                // Alternative: Create hidden video element
                /*
                const vid = document.createElement('video');
                vid.preload = 'auto';
                vid.src = path;
                vid.style.display = 'none';
                document.body.appendChild(vid);
                */
            });
        }, 3000); // Start preloading 3 seconds after page load

        return () => clearTimeout(timer);
    }, [videoPaths]);

    return null; // This component renders nothing visible
};

export default VideoPreloader;
