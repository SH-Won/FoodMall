import React, { useRef, useCallback } from 'react';

const InfiniteScroll = (callback, hasMore, loading) => {
    const observer = useRef();
    const handleScroll = ([entry], ob) => {
        if (entry.isIntersecting && hasMore) {
            callback();
            ob.unobserve(entry.target);
        }
    };

    const lastIndexRef = useCallback(
        node => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver(handleScroll, { threshold: 0.8 });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore],
    );
    return {
        lastIndexRef,
    };
};

export default InfiniteScroll;
