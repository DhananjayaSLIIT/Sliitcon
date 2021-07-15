import {useEffect} from 'react';
import card1 from '../../img/slide1.png'
import card2 from '../../img/slide2.png'
import card3 from '../../img/slide3.png'
import card4 from '../../img/slide4.png'
import card5 from '../../img/slide5.png'
import '../../css/slidecard.css'


const CardImage =() =>{


  useEffect(() => {
    var cardIndex = 0;
        showcards();

        function showcards() {
          var i;
          var cards = document.getElementsByClassName("cards");
          var dots = document.getElementsByClassName("dot");
          for (i = 0; i < cards.length; i++) {
            cards[i].style.display = "none";  
          }
          cardIndex++;
          if (cardIndex > cards.length) {cardIndex = 1}    
          for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
          }
          cards[cardIndex-1].style.display = "block";  
          dots[cardIndex-1].className += " active";
          setTimeout(showcards, 6000);
        }
    
  }, []);

   return (
<div>
    <div className="cardshow-container">

    <div className="cards fade">
      <div className="card-numbertext">1 / 5</div>
      <img className="card-img" src={card1} alt="Logo" />
    </div>

    <div className="cards fade">
      <div className="card-numbertext">2 / 5</div>
      <img className="card-img" src={card2} alt="Logo" />
    </div>

    <div className="cards fade">
      <div className="card-numbertext">3 / 5</div>
      <img className="card-img" src={card3} alt="Logo" />
    </div>

    <div className="cards fade">
      <div className="card-numbertext">4 / 5</div>
      <img className="card-img" src={card4} alt="Logo" />
    </div>

    <div className="cards fade">
      <div className="card-numbertext">5 / 5</div>
      <img className="card-img" src={card5} alt="Logo" />
    </div>
    
</div>
    <div className="card-center">
        <span className="dot"></span> 
        <span className="dot"></span> 
        <span className="dot"></span>
        <span className="dot"></span> 
        <span className="dot"></span>  
    </div>
</div>
   );

  

};

export default CardImage;