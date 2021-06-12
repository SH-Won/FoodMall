import React, { useRef,useEffect,useState } from 'react'

const Carousel = ({posts}) => {
    const images = posts && posts.map(post => post.images[0]);
    const carousel = useRef(null);
    const img = useRef();
    const [carouselImages,setCarouselImages]=useState([]);
    const [carouselStyle,setCaroselStyle]=useState({
    
        height:'100%',
        display:'flex',
        width:'80%',
        
        overflowX:'scroll',
        overFlowY:'hidden',
        
        
        
    })
    const [imgContainerStyle,setImgContainerStyle]=useState({
        flex:'0 0 auto',
        paddingTop:'56.25%',
        position:'relative',
        width:'100%',
        transition:'transform .5s',

    })
    const [scrollValue,setScrollValue]=useState(0);
    
    let startX ;
    let walk;
    // let scrollValue=0;
    const [imgStyle,setImgStyle]=useState(
        {
            position:'absolute',
            top:0,
            width:'100%',
            height:'100%',
            transition:'transform 2s'
        }
    )
    // const [slider,setSlider]=useState({
    //     position:'absoulute',
    //     display:'flex',
    //     width:'100%',
    //     overflowX:'scroll',
    //     overFlowY:'hidden',
    //     transition:'transform .5s'
    // })
    
   useEffect(()=>{
     carousel.current.scrollLeft = 0;
     console.log( window.innerWidth*0.8)
      setCarouselImages([...images]);
      
   },[posts])
   
   console.dir(carousel.current)
    const containerStyle={
        
        width:'100%',
        display:'flex',
        justifyContent:'center',
        margin:'0 auto',
        
        
    }
    // const carouselStyle={
    //     display:'flex',
    //     width:'80vw',
    //     overflowX:'scroll'
        
    // }
    // const imgContainerStyle = {
    //     flex:'0 0 auto',
    //     paddingTop:'56.25%',
    //     position:'relative',
    //     width:'100%',
    //     transition:'transform .5s',
        
        
    // }
    // const imgStyle={
    //     position:'absolute',
    //     top:0,
    //     width:'100%',
    //     height:'100%'
    // }
    const touchStart =(e)=>{
        
        startX = e.touches[0].pageX - carousel.current.offsetLeft;
        // scrollValue = carousel.current.scrollLeft;
        console.log('scrollValue',scrollValue)
        
    }
    const touchMove = (e) =>{
  //e.preventDefault();

        walk = e.touches[0].pageX -carousel.current.offsetLeft-startX ;
        //console.log('walk',walk);
        //carousel.current.scrollLeft = scrollValue - walk;
    }
    const touchEnd = (e)=>{
        if(walk){
            // carousel.current.scrollLeft = window.innerWidth*0.8;
            // carousel.current.scrollLeft = 0
            //let scrollValue=0;

            if(walk < 0){
                //  carousel.current.scrollLeft +=walk
                carousel.current.scrollLeft =0;
                if(walk < -120){
                    
                    
                    
                    // scrollValue+=window.innerWidth*0.8;
                   // setCarouselImages(images => images.slice(1,images.length).concat(images[0]))
                  // carousel.current.scrollLeft+=window.innerWidth*0.8
              
                  console.log(scrollValue);
                  carousel.current.scrollLeft=-walk+scrollValue;
                //   setImgContainerStyle({
                //       ...imgContainerStyle,
                //       transform:`translateX(-${window.innerWidth*0.8+walk}px)`
                //   })
                  
                //   img.current.style.transform =`translateX(-${window.innerWidth*0.8+walk}px)`
                  setScrollValue(scrollValue+window.innerWidth*0.8)
                //   carousel.current.scrollLeft = scrollValue-walk;
                //   for(let i=scrollValue-walk; i<=scrollValue+window.innerWidth*0.8; i++){
                //       setTimeout(()=>{
                //           carousel.current.scrollLeft=i;

                //       },i)
                    
                //   } 

                //    carousel.current.scrollTo({
                //        left:carousel.current.scrollLeft +=window.innerWidth*0.8,
                //        behavior:'smooth'
                //    })
                //   carousel.current.style.transform =`translateX(400px)`
                //   carousel.current.style.transition='transform .5s'
                //    setImgContainerStyle({
                //        ...imgContainerStyle,
                //        left:`${walk}px`,
                //        transform:`translateX(-${(400+walk)}px)`
                //    })
                    // setImgStyle({
                    //     ...imgStyle,
                    //     right:`-${walk+400}px`,
                        
                    //     transform:`translateX(-${400+walk}px)`
                    // })
                   
                }
            }
            else if(walk > 0){
                carousel.current.scrollLeft +=walk
                if(walk > 120){
                   // setCarouselImages(images =>  [images[images.length-1]].concat(images.slice(0,images.length-1)))
                   carousel.current.scrollLeft-=window.innerWidth*0.8
                   console.log(carousel.current.scrollLeft)
                }
            }
        }
        walk =0;
       
        
    }
    const touchCancel = (e)=>{
        if(walk){
            // carousel.current.scrollLeft = window.innerWidth*0.8;
            // carousel.current.scrollLeft = 0;

            
            if(walk < 0){

                carousel.current.scrollLeft +=walk
                if(walk < -120){
                    setCarouselImages(images => images.slice(1,images.length).concat(images[0]))
                   //carousel.current.scrollLeft+=window.innerWidth*0.8
                //    setImgStyle({
                //     ...imgStyle,
                //     right:`-${walk+400}px`,
                    
                //     transform:`translateX(-${400+walk}px)`
                // })
                }
            }
            else if(walk > 0){
                carousel.current.scrollLeft +=walk
                if(walk > 120){
                   // setCarouselImages(images =>  [images[images.length-1]].concat(images.slice(0,images.length-1)))
                   carousel.current.scrollLeft-=window.innerWidth*0.8
                }
            }
        }
        walk =0;

    }
    console.dir(carousel.current);
    console.log(window);
    console.log(carouselImages);

    return (
        <div style={containerStyle}>
            <div style={carouselStyle} ref={carousel} onTouchStart={touchStart} onTouchMove={touchMove} onTouchEnd={touchEnd} onTouchCancel={touchCancel}>
           
           {carouselImages && carouselImages.map((image,index)=>(
               <div key={`image${index}`} style={imgContainerStyle} ref={img} >
                   <img src={image} style={imgStyle}/>
               </div>
           ))}
           </div>
           </div>
            
        
    )
}

export default Carousel
