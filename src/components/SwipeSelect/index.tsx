import React, { useState } from "react";

// Use for `yarn start`
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";

// Use for `yarn test`
// import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
// import "swiper/swiper.scss";

import { Keyboard } from "swiper";
import data from "../../data/swiper-select.json";

import "./styles.scss";

interface SelectProps {
    initialIndex: number;
    updateValue: (val : number) => void;
    theme?: "red" | "green" | "yellow";
    fontSize?: "sm" | "md" | "lg";
}

export default function SwipeSelect ({ initialIndex, updateValue, theme = "green", fontSize = "lg"}: SelectProps) {
    switch (fontSize) {
    case "sm": {
        document.documentElement.style.fontSize = "12px";
        break;
    }

    case "md": {
        document.documentElement.style.fontSize = "15px";
        break;
    }

    case "lg": {
        document.documentElement.style.fontSize = "18px";
        break;
    }
    }
    
    const [activeIndex, setActiveIndex] = useState<number>(4);
    const [selectOpen, setSelectOpen] = useState<boolean>(false);

    /*
    TODO:
    2. change during clicking
    */

    return(
        <>
            {!selectOpen &&
                <div className={`swiper-summary border-${theme}`} onClick={() => setSelectOpen(true)} data-testid="swipe-select" >
                    <div className="swiper-price" data-testid="swiper-summary-price">{data.selectPrices[initialIndex]}</div>
                    <div className="swiper-text-bottom">€/Month</div>
                    <button className={`swiper-edit-button color-theme-${theme}` }>Edit</button>
                </div>
            }
            {selectOpen &&
                <Swiper
                    modules={[Keyboard]}
                    initialSlide={initialIndex}
                    slidesPerView="auto"
                    spaceBetween={0}
                    className="my-swiper"
                    keyboard={{
                        enabled: true,
                    }}
                    centeredSlides
                    threshold={10}
                    resistanceRatio={0.5}
                    touchEventsTarget={"container"}
                    onSnapIndexChange={(swiper) => {setActiveIndex(swiper.activeIndex); updateValue(data.selectPrices[swiper.activeIndex]);}}
                    observer={true}
                    observeParents={true}
                    slideToClickedSlide
                    data-testid="swiper"
                >
                    {activeIndex === initialIndex && 
                        <div className={`swiper-text-top color-theme-${theme}`} data-testid="swiper-text-top">Current choice</div>
                    }
                    {data.selectPrices.map((price, index) => 
                        <SwiperSlide key={`swiper-selct-${index}`} data-testid={`swiper-slide-${index}`}>{ ({isActive}) =>
                            <div className={isActive ? `swiper-element-wrapper color-theme-${theme}` : "swiper-element-wrapper"}>{price}</div>}</SwiperSlide>
                    )}
                    <div className="swiper-text-bottom">€/Month</div>
                </Swiper>
            }
            
        </>
    );
}