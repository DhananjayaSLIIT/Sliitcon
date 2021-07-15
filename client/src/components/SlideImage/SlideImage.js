import {useEffect} from 'react';
import slide1 from '../../img/slide1.png'
import slide2 from '../../img/slide2.png'
import slide3 from '../../img/slide3.png'
import slide4 from '../../img/slide4.png'
import slide5 from '../../img/slide5.png'
import '../../css/slideimage.css'


const SlideImage =() =>{


  useEffect(() => {
    var slideIndex = 0;
        showSlides();

        function showSlides() {
          var i;
          var slides = document.getElementsByClassName("slides");
          var dots = document.getElementsByClassName("dot");
          for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
          }
          slideIndex++;
          if (slideIndex > slides.length) {slideIndex = 1}    
          for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
          }
          slides[slideIndex-1].style.display = "block";  
          dots[slideIndex-1].className += " active";
          setTimeout(showSlides, 6000);
        }
    
  }, []);

   return (
<div>
    <div className="slideshow-container">

    <div className="slides fade">
      
      <img className="slide-img" src={slide1} alt="Logo" />
    </div>

    <div className="slides fade">
      
      <img className="slide-img" src={slide2} alt="Logo" />
    </div>

    <div className="slides fade">
     
      <img className="slide-img" src={slide3} alt="Logo" />
    </div>

    <div className="slides fade">
     
      <img className="slide-img" src={slide4} alt="Logo" />
    </div>

    <div className="slides fade">
     
      <img className="slide-img" src={slide5} alt="Logo" />
    </div>
    
</div>
    <div className="slide-center">
        <span className="dot"></span> 
        <span className="dot"></span> 
        <span className="dot"></span>
        <span className="dot"></span> 
        <span className="dot"></span>  
    </div>
</div>
   );

  

};

export default SlideImage;