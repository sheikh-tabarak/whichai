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

        // 1. Filter out known broken/deprecated providers (Clearbit, AI-Finder)
        if (src && (src.includes('clearbit.com') || src.includes('ai-finder.net'))) {
            // These are legacy/broken, ignore them AND force generation from link
            return getLogoDevUrl(tool?.link);
        }

        // 2. If valid image exists, use it
        if (src) return src;

        // 3. If no image, try generating from link immediately
        return getLogoDevUrl(tool?.link);
    }

    const fallbackImage = 'https://placehold.co/100x100/1e293b/475569?text=Ai';
    const [imgSrc, setImgSrc] = useState(fallbackImage);

    // Update state when tool changes
    useEffect(() => {
        const initial = getInitialSrc();
        const categoryFallback = tool?.category?.icon;
        setImgSrc(initial || categoryFallback || fallbackImage);
    }, [tool]);

    const handleError = () => {
        const logoDevUrl = getLogoDevUrl(tool?.link);
        const categoryFallback = tool?.category?.icon;

        // Chain of Fallbacks:
        // Current(Failed) -> GeneratedFromLink(if different) -> Category -> Generic Fallback

        if (imgSrc !== logoDevUrl && logoDevUrl && imgSrc !== categoryFallback && imgSrc !== fallbackImage) {
            setImgSrc(logoDevUrl);
        } else if (imgSrc !== categoryFallback && categoryFallback) {
            setImgSrc(categoryFallback);
        } else {
            setImgSrc(fallbackImage);
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
