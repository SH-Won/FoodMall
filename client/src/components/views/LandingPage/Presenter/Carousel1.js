import React,{useState,useEffect, useRef} from 'react'
import styles from './Carousel.module.css';

const Carousel1 = ({posts}) => {
    const [images,setImages]= useState([]);
    const carouselBox =useRef();
    const [index,setIndex]=useState(0);

    useEffect(()=>{
        let images = posts && posts.map(post => post.images[0]);

        setImages([...images]);

    },[posts])
     console.log('리렌더링');
    let walk;
    let startX;
    let scrollAmount=0;

    let curPos =0;
    let position =0;
    let start_x,end_x;
    const IMAGE_WIDTH = window.innerWidth*0.8;
    console.log(IMAGE_WIDTH);

    function prev(){
        
        
        if(curPos >0){
            
            position += (IMAGE_WIDTH);
            carouselBox.current.style.transform=`translateX(${position}px)`;
            carouselBox.current.scrollLeft = 0;
            curPos = curPos -1;
        }
    }
    function next(){
        carouselBox.current.scrollLeft -=position;
        console.log(carouselBox.current.scrollLeft);
        if(curPos <3){
            
            position -= (IMAGE_WIDTH);
            //console.log(Math.ceil(position-walk))
            carouselBox.current.style.transform=`translate(${Math.ceil(position-walk)}px)`;
            carouselBox.current.scrollLeft = 0;
            curPos =curPos+1;
        }
    }
    

    const touchStart = (e)=>{
       // startX = e.touches[0].pageX - carouselBox.current.offsetLeft;
       let changed_x = e.changedTouches[0]-carouselBox.current.offsetLeft;
        start_x =e.touches[0].pageX-carouselBox.current.offsetLeft;
       // carouselBox.current.scrollLeft =start_x-changed_x;
       // console.log(changed_x);
        
    }
    const touchMove = (e)=>{
       // e.preventDefault();
        walk = e.changedTouches[0].pageX -carouselBox.current.offsetLeft-start_x ;
        // console.log('changed',e.changedTouches);
        // console.log('walk',walk)

        console.dir(carouselBox.current);
        

     }
    // const touchEnd = (e)=>{

    //     function move(){
    //             console.log(index);
    //             index ===0 ?
    //             setImages(images => [images[0]].concat(images.slice(1,images.length)).concat(images[0]))
    //             :                    //0,1,2,3 => 0,1,2,3,0
    //             setImages(images => [].concat(images.slice(1,images.length)).concat(images[1]))
    //                                  //0,1,2,3,0 => index=1 => 1,2,3,0,1 => index=2 => 2,3,0,1,2
                                     
           
    //         }
    //     if(walk){
    //         if(walk < 0 ){
    //             carouselBox.current.scrollTo({
    //                 left:(index * window.innerWidth*0.8),
    //                 behavior:'smooth'
    //             })
                

    //             if(walk < -120){
    //                 if(index ===images.length -1){
                       
                        
    //                     return
    //                 }
    //                 else{
    //                 carouselBox.current.scrollTo({
    //                     left:(scrollAmount += window.innerWidth*0.8),
    //                     behavior:'smooth'
    //                 })
                    
                    
    //                 console.log('다음페이지');
    //                 // carouselBox.current.style.transform=`translateX(-${scrollAmount-=window.innerWidth*0.8}px)`;
    //                 // carouselBox.current.style.transition="transform .7s";
    //                 //carouselBox.current.scrollLeft = -(scrollAmount +=window.innerWidth*0.8);
    //                 move();
    //                 console.log(images)
                     
    //                 console.dir(carouselBox.current);
    //                 setIndex(index+1);
    //                 }
    //             }
    //             console.log(index);

    //         }
    //         else if(walk > 0 ){
    //             if(walk > 0){
    //                 carouselBox.current.scrollTo({
    //                     left:( (index) *window.innerWidth*0.8),
    //                     behavior:'smooth'
    //                 })

    //                 if(walk > 120){
    //                     carouselBox.current.scrollTo({
    //                         left:(scrollAmount -= window.innerWidth*0.8),
    //                         behavior:'smooth'
    //                     })
    //                     index--;
    //                 }
    //             }
    //         }
    //     }

    // }
    const touchEnd =(e)=>{
        
        console.log('touch End');
        end_x = e.changedTouches[0].pageX-carouselBox.current.offsetLeft;
        console.log('start',start_x, 'end',end_x);
        if(start_x > end_x){
            next();
        }
        else{
            prev();
        }
    }


    return (
        <div className={styles.carousel}>
            <div className={styles.carousel_box} ref={carouselBox}
            onTouchStart={touchStart} onTouchMove={touchMove} onTouchEnd={touchEnd} >
                {images.map((image,index)=>(
                    <div className={styles.img_container} key={`image${index}`}>
                        <img src={image} alt="image"/>
                    </div>
                ))}

            </div>
            
        </div>
    )
}

export default Carousel1
