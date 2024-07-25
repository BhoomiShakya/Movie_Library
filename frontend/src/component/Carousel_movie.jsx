import React from 'react';
import '../css/Carousel_movie.css';
import img01 from '../images/image01.jpeg'
import img02 from '../images/image02.jpeg'
import img03 from '../images/image03.jpeg'

function Carousel_movie() {
    document.addEventListener("DOMContentLoaded", () => {
        const marquee = document.querySelector(".marquee-inner");
        const speed = 1; // Scrolling Speed
        let scrollAmount = 0;
        let isHovered = false;
    
        // Duplicates the content
        const marqueeContent = marquee.innerHTML;
        marquee.innerHTML += marqueeContent;
    
        const startScrolling = () => {
            if (!isHovered) {
                scrollAmount -= speed;
                if (Math.abs(scrollAmount) >= marquee.scrollWidth / 2) {
                    scrollAmount = 0;
                }
                marquee.style.transform = `translateX(${scrollAmount}px)`;
            }
            requestAnimationFrame(startScrolling);
        };
    
        marquee.addEventListener("mouseover", () => {
            isHovered = true;
        });
    
        marquee.addEventListener("mouseout", () => {
            isHovered = false;
        });
    
        startScrolling();
    });
    
    return (
        <div>
            <p className='headdshow01'>TRENDING MOVIES</p>
            <div class="marquee">
                <div class="marquee-inner">
                    <img src={img01} alt="Image 1"/>
                    <img src= {img02} alt="Image 3"/>
                    <img src= {img03} alt="Image 3"/>
                    <img src= {img01} alt="Image 3"/>
                    <img src= {img02} alt="Image 3"/>
                    <img src= {img03} alt="Image 3"/>
                    
                </div>  
            </div>
        </div>
        
    )
}

export default Carousel_movie;
