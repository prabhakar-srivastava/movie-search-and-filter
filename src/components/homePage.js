import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './homePage.css'
function HomePage() {
    const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8'
    const BASE_URL = 'https://api.themoviedb.org/3'
    const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY
    const IMG_URL = 'https://image.tmdb.org/t/p/w500'
    const [resData, setResData] = useState([])
    const [search, setSearch] = useState('')
    const [genre, setGenre] = useState('')


    const fetch = async (e) => {
        // e.preventDefault()
        await axios.get(API_URL).then((res) => {
            console.log(res.data.results[0].genre_ids.toString())
            setResData(res.data.results)
        })

    }
    useEffect(() => {
        fetch()
    }, [])

    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    const handleChange1 = (e) => {
        console.log(e.target.value)
        setGenre(e.target.value)
    }
   


    return (
        <div className='container-movie'>
            <div className='search'>
            
                <h2>Janani.LiFe</h2>
                <div className='cateogry'>
                 <select onChange={handleChange1}>
                    <option value='' >Default</option>
                    <option value='28' >Action</option>
                    <option value='12' >Adventure</option>
                    <option value='16' >Animation</option>
                    <option value='35' >Comedy</option>
                    <option value='80' >Crime</option>
                    <option value='18' >Drama</option>
                    <option value='99' >Documentary</option>
                    <option value='10751' >Family</option>
                    <option value='14' >Fantasy</option>
                    <option value='27' >Horror</option>
                    <option value='36' >History</option>
                    <option value='10749' >Romance</option>
                    <option value='878' >Science Fiction</option>
                    <option value='53' >Thriller</option>
                    <option value='10770' >TV Movies</option>
                    <option value='37' >Western</option>
                </select>   
                <input type='text' placeholder='Search...' onChange={handleChange} />
                </div>
            </div>
            <div className='container-movieDetail'>
                {
                    resData.filter((value) => {

                        if (search === ""  && genre === "") {
                            return value
                        } else if (value.title.toLowerCase().includes(search.toLowerCase()) && value.genre_ids.toString().includes(genre)) {
                            return value
                        }
                    }).map((value) => {
                        return (
                            <div key={value.id} className='movies'>

                                <img src={IMG_URL + value.backdrop_path} alt={value.title} />


                                <div className='movName'>
                                    <h3>{value.title}</h3>
                                    <h3>{value.vote_average}/10</h3>
                                </div>
                                {/* <div className='overview'>
                                    <h4>{value.overview}</h4>

                                </div> */}


                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default HomePage