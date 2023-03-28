import "./global.css";
import s from "./style.module.css";
import { TVShowAPI } from "./api/tv-show";
import { useEffect, useState } from "react";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logo from "./assets/images/logo.png";
import { TVShowListItem } from "./components/TVShowListItem/TVShowListItem";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";

export function App() {
    const [currentTVShow, setCurrentTVShow] = useState();
    const [recommandationList, setRecommandationList] = useState([]);
    async function fetchPopulars() {
        const populars = await TVShowAPI.fetchPopulars();
        if(populars.length > 0) {
            setCurrentTVShow(populars[0]);
        }
    }

    async function fetchRecommandations(tvShowId) {
        const recommandations = await TVShowAPI.fetchRecommandations(
            tvShowId
        );
        if(recommandations.length > 0) {
            setRecommandationList(recommandations.slice(0, 10));
        }
    }

    useEffect(()=>{
        fetchPopulars();
    }, [])

    useEffect(()=>{
        if(currentTVShow) {
            fetchRecommandations(currentTVShow.id);
        }
    }, [currentTVShow])


    function setCurrentTvShowFromRecommandation(tvShow) {
        alert(JSON.stringify(tvShow))
    }

    async function searchTVShow(tvShowName){
        const searchResponse = await TVShowAPI.fetchByTitle(tvShowName);
        if(searchResponse.length > 0) {
            setCurrentTVShow(searchResponse[0]);
        }
    }

    return ( 
    <div className={s.main_container}
    style={{background: currentTVShow 
        ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover` 
        : "black"}}>
        <div className={s.header}>
            <div className="row">
                <div className="col-4">
                    <Logo image={logo} title="ZuWatch" subtitle="Find a show you may like"/>
                </div>
                <div className="col-md-12 col-lg-4"><SearchBar onSubmit={searchTVShow}/></div>
            </div>
        </div>
        <div className={s.tv_show_detail}>
            {currentTVShow && <TVShowDetail tvShow={currentTVShow}/>}
            </div>
        <div className={s.recommandations}>
                {recommandationList && recommandationList.length > 0 && 
                (<TVShowList onClickItem={setCurrentTVShow} TVShowList={recommandationList}/>
                )}           
            </div>
    </div>
    );
}