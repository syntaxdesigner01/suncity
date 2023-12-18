import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from "react-accessible-accordion";
import './forecast.css'

const WEEK_DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

const Forecast = ({ data }) => {
    console.log(data.list.splice(0,7))

    const dayInWeek = new Date().getDay();
    const forecastDays= WEEK_DAYS.slice(dayInWeek,WEEK_DAYS.length).concat(WEEK_DAYS.slice(0,dayInWeek));
    //   .concat(WEEK_DAYS.slice(0,dayInWeek))
    return (
        <div>
            <label className="title">Daily</label>
            <Accordion allowZeroExpanded>
                {data.list.splice(0, 7).map((item,index) => {
                   return (
                    <AccordionItem key={index}>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <div className="daily-item">
                                <img src={`icons/${item.weather[0]?.icon}.png`} alt="weather" className="icon-small" />
                                <label className="day">{forecastDays[index]}</label>
                                <label className="discription">{item.weather[0].description}</label>
                                <label className="min-max">{Math.round(item.main.temp_max)}°C / {Math.round(item.main.temp_min)}°C</label>
                            </div>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className="daily-details-grid">
                            <div className="daily-details-grid-item">
                                <label >Pressure:</label>
                                <label>{item.main.pressure} hPa</label>
                            </div>

                            <div className="daily-details-grid-item">
                                <label >Humidity:</label>
                                <label>{item.main.humidity}%</label>
                            </div>

                            <div className="daily-details-grid-item">
                                <label >clouds:</label>
                                <label>{item.clouds.all}%</label>
                            </div>

                            <div className="daily-details-grid-item">
                                <label >Wind Speed:</label>
                                <label>{item.wind.speed}m/s</label>
                            </div>

                            <div className="daily-details-grid-item">
                                <label >See Level:</label>
                                <label>{item.main.sea_level}m</label>
                            </div>

                            <div className="daily-details-grid-item">
                                <label >Feels Like:</label>
                                <label>{Math.round(item.main.feels_like)}°C</label>
                            </div>
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
                   )
})}
            </Accordion>
        </div>
    );
};

export default Forecast;
