import React, { useState, useEffect } from 'react'

const ToolIcon = ({ tool, className }) => {
    // Helper to generate logo.dev URL from a link
    const getLogoDevUrl = (link) => {
        if (!link) return null;
        try {
            let urlString = link;
            if (!/^https?:\/\//i.test(urlString)) {
                urlString = 'https://' + urlString;
            }
            const url = new URL(urlString);
            let hostname = url.hostname;

            // Strip 'www.' as logo.dev and many APIs prefer the root domain
            if (hostname.startsWith('www.')) {
                hostname = hostname.slice(4);
            }

            if (hostname) {
                return `https://img.logo.dev/${hostname}?token=live_6a1a28fd-6420-4492-aeb0-b297461d9de2&size=100&retina=true&format=png&theme=dark`;
            }
        } catch (error) {
            console.error("Error parsing URL", link, error);
        }
        return null;
    }

    // Determine the starting image source
    const getInitialSrc = () => {
        let src = tool?.image;

        // 1. Handle Legacy Clearbit URLs - automatic upgrade
        if (src && src.includes('logo.clearbit.com')) {
            try {
                const parts = src.split('/');
                const domain = parts[parts.length - 1];
                if (domain) {
                    // Try to clean domain here too just in case
                    let cleanDomain = domain;
                    if (cleanDomain.startsWith('www.')) cleanDomain = cleanDomain.slice(4);

                    return `https://img.logo.dev/${cleanDomain}?token=live_6a1a28fd-6420-4492-aeb0-b297461d9de2&size=100&retina=true&format=png&theme=dark`;
                }
            } catch (e) {
                console.error("Error upgrading Clearbit URL", src, e);
            }
        }

        // 2. If valid image exists (or was upgraded), use it
        if (src) return src;

        // 3. If no image, try generating from link immediately
        return getLogoDevUrl(tool?.link);
    }

    const [imgSrc, setImgSrc] = useState('https://images.ai-finder.net/logos/no-logo.png');

    // Update state when tool changes
    useEffect(() => {
        const initial = getInitialSrc();
        const fallback = tool?.category?.icon || 'https://images.ai-finder.net/logos/no-logo.png';
        setImgSrc(initial || fallback);
    }, [tool]);

    const handleError = () => {
        const logoDevUrl = getLogoDevUrl(tool?.link);
        const fallbackUrl = tool?.category?.icon || 'https://images.ai-finder.net/logos/no-logo.png';

        // Chain of Fallbacks:
        // Current(Failed) -> GeneratedFromLink(if different) -> Category/Default

        if (imgSrc !== logoDevUrl && logoDevUrl && imgSrc !== fallbackUrl) {
            // If the failed image wasn't the generated one, try the generated one
            // This catches cases where tool.image is a broken link, or a "www" version that failed
            setImgSrc(logoDevUrl);
        } else if (imgSrc !== fallbackUrl) {
            // If generated one also failed (or we were already there), show fallback
            setImgSrc(fallbackUrl);
        }
    }

    return (
        <img
            className={className}
            src={imgSrc}
            alt={tool ? tool.name : 'Tool'}
            onError={handleError}
        />
    )
}

export default ToolIcon
