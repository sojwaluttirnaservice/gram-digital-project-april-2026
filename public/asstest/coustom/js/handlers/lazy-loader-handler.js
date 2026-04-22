document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('.lazy-image');
    const lazyVideos = document.querySelectorAll('.lazy-video');
    const lazyLotties = document.querySelectorAll('.lazy-lottie');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;

                    if (el.classList.contains('lazy-image')) {
                        handleLazyImage(el);
                    }
                    else if (el.classList.contains('lazy-video')) {
                        handleLazyVideo(el);
                    }
                    else if (el.classList.contains('lazy-lottie')) {
                        handleLazyLottie(el);
                    }

                    obs.unobserve(el);
                }
            });
        });

        [...lazyImages, ...lazyVideos, ...lazyLotties].forEach(el => observer.observe(el));
    }

    // ======================================================
    // ⭐ HANDLERS
    // ======================================================

    function handleLazyImage(img) {
        img.src = img.dataset.src;

        img.addEventListener('load', () => {
            img.classList.add('loaded');

            // Hide shimmer placeholder
            const shimmer = img.previousElementSibling;
            if (shimmer && shimmer.classList.contains('shimmer-placeholder')) {
                shimmer.style.opacity = '0';
                shimmer.style.transition = 'opacity 0.3s ease-in-out';
            }
        });
    }

    function handleLazyVideo(video) {
        const src = video.getAttribute('data-src');
        if (src) {
            const source = document.createElement('source');
            source.src = src;
            source.type = 'video/mp4';
            video.appendChild(source);
            video.load();
        }
        video.classList.add('loaded');
    }

    function handleLazyLottie(lottie) {
        const src = lottie.getAttribute('data-src');
        const wrapper = lottie.closest('.lazy-lottie-wrapper');

        // Make sure wrapper exists
        if (!wrapper) {
            lottie.src = src;
            lottie.classList.add('loaded');
            return;
        }

        // Dynamically create and add shimmer
        const shimmer = createShimmerForLottie(wrapper, lottie);

        // Actually start loading lottie
        if (src) {
            lottie.src = src;
        }

        // When lottie is fully rendered, remove shimmer
        lottie.addEventListener('rendered', () => {
            shimmer.style.opacity = '0';
            shimmer.style.transition = 'opacity 0.3s ease-in-out';
            setTimeout(() => shimmer.remove(), 300);
            lottie.classList.add('loaded');
        });
    }














    function createShimmerForLottie(wrapper, lottie) {
        // Create shimmer div
        const shimmer = document.createElement('div');
        shimmer.classList.add('shimmer-placeholder');

        // Get lottie-player size
        const rect = lottie.getBoundingClientRect();
        shimmer.style.width = rect.width + 'px';
        shimmer.style.height = rect.height + 'px';

        // Optional: add absolute overlay styling
        shimmer.style.position = 'absolute';
        shimmer.style.top = '0';
        shimmer.style.left = '0';
        shimmer.style.right = '0';
        shimmer.style.bottom = '0';
        shimmer.style.borderRadius = getComputedStyle(lottie).borderRadius || '1.5rem';

        // Insert shimmer as first child of wrapper
        wrapper.insertBefore(shimmer, lottie);

        return shimmer;
    }

});
