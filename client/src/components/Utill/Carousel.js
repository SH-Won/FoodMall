import React, { useRef, useState, useEffect } from 'react';
//import {carouselImages} from '../Project/ImageData';
import style from '../../styles/Carousel.module.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
//이미지 캐러셀

const Carousel = ({ carouselImages }) => {
    const slider = useRef();
    const [images, setImages] = useState([...carouselImages]);
    const [direction, setDirection] = useState(null);

    useEffect(() => {
        slider.current.style.width = `${100 * images.length}%`;

        for (let i = 0; i < images.length; i++) {
            slider.current.children[i].style.paddingTop = `${68 / images.length}%`;
        }
    }, []);

    function prev() {
        // 12345 => 23451 => 12345
        const { current } = slider;
        if (direction === 1 || direction === null) {
            current.append(current.firstChild);
        }
        //23451 => 34512 => 23451

        setDirection(0);
        current.parentElement.style.justifyContent = 'flex-end';
        current.style.transform = `translateX(${100 / images.length}%)`;
        current.style.transition = 'transform 1s cubic-bezier(0.6, 0.35, 0, 1.04)';
    }

    function next() {
        const { current } = slider;

        if (direction === 0) {
            current.prepend(current.lastChild);
        }
        setDirection(1);

        current.parentElement.style.justifyContent = 'flex-start';
        current.style.transform = `translateX(-${100 / images.length}%)`;
        current.style.transition = 'transform 1s cubic-bezier(0.6, 0.35, 0, 1.04)';
    }

    function transitionEnd() {
        const { current } = slider;
        current.style.transition = 'none';
        current.style.transform = '';
        if (direction === 1) {
            setImages(images => [...images.slice(1, images.length).concat([images[0]])]);
        }
        // 23451 => 34512
        else {
            setImages(images => [images[images.length - 1]].concat(images.slice(0, images.length - 1)));
        }
    }

    return (
        <div className={style.wrap}>
            <div className={style.container}>
                <div className={style.carousel}>
                    <div className={style.slider} ref={slider} onTransitionEnd={transitionEnd}>
                        {images.map((image, index) => (
                            <div key={index} className={style.item}>
                                <img src={image} />
                            </div>
                        ))}
                    </div>
                    {images.length > 1 && (
                        <>
                            <span className={style.prev} onClick={prev}>
                                <FaArrowLeft style={{ color: 'white' }} />
                            </span>
                            <span className={style.next} onClick={next}>
                                <FaArrowRight style={{ color: 'white' }} />
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
