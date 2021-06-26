import React,{useRef} from 'react'
import styles from "./ImageSlider.module.css";


export default function ImageSlider(props) {
    const {posts} =props;
    const slider = useRef();

    function next() {
        slider.current.style.transform=`translateX(-${window.innerWidth}px)`;
        slider.current.style.transition=`transform .5s`;
    }
    function prev(){
        slider.current.style.transform=`translateX(${window.innerWidth}px)`;
        slider.current.style.transition=`transform .5s`;
    }
    

    
    return (
        <div className={styles.imageSlider}>
            <div className={styles.slider} ref={slider}>
            {posts && posts.map(post =>(
                <div key={post._id} className={styles.sliderContent}>
                <div  className={styles.imageContainer}>
                    <img src={post.images[0]}/>
                </div>
                <div className={styles.sliderInfo}>
                    <ul>
                        <li>{post.title}</li>
                        <li>{post.description}</li>
                        <li>{post.price}</li>
                    </ul>
                </div>
                </div>
                
            ))}
            </div>
            <button onClick={prev} className={styles.prevBtn}>◀</button>
            <button onClick={next}className={styles.nextBtn}>▶</button>
            
        </div>
    )
}
