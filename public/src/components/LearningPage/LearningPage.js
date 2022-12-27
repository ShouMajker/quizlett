import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Axios from 'axios'
import RotatingCard from './RotatingCard'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import './LearningPage.css'

import { Pagination, Navigation } from 'swiper'
import EmptyFeedback from "../Modules/EmptyFeedback/EmptyFeedback"
import axiosData from "../Modules/Connection"

const LearningPage = () => {

    const {cardName, groupName} = useParams()
    const tableName = `group_${cardName}_${groupName}`
    const [allRecords, setAllRecords] = useState([])

    useEffect(() => {
        Axios.get(`${axiosData.url}/api/getAllRecords`, {params: {selectedTable: tableName}})
        .then(res => {
            setAllRecords(res.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <>
            <div className='main'>
                {allRecords.length < 5 ? (
                    <EmptyFeedback
                        message='Aby zacząć naukę, musisz mieć conajmniej 5 tłumaczeń'
                    />
                ) : (
                    <Swiper
                        pagination={{
                            type: 'progressbar'
                        }}
                        navigation={true}
                        modules={[
                            Pagination,
                            Navigation
                        ]}
                        className='cardsSwiper'
                    >
                        {allRecords.map((values, index) => {
                            return (
                                <SwiperSlide>
                                    <RotatingCard
                                        key={index}
                                        data={values}
                                    />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                )}
            </div>
        </>
    )
}

export default LearningPage