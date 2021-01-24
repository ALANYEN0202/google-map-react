import React, { useCallback, useEffect, useRef, useState } from "react";
import { Key } from "./key"; // 引入 API key
import GoogleMapReact from "google-map-react";
import SearchTypeOptions from './Component/SearchType';
import AutoCompleteSearch from './Component/AutoCompleteSearch';
import MarkerDetail from './Component/MarkerDetail'
import {
  MyPositionMarker,
  TargetMarker,
} from "./Component/Component";



const SimpleMap = (props) => {
  const [myPosition, setMyPosition] = useState({
    lat: 25.0441443,
    lng: 121.5711905,
  });

  const [mapApiLoaded, setMapApiLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [mapApi, setMapApi] = useState(null);
  const [place, setPlace] = useState([]);
  const [searchType, setSearchType] = useState("cafe");
  const [mapType, setMapType] = useState("roadmap");
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  const [value, setValue] = useState("");
  const [markerDetails, setMarkerDetails] = useState(null)
  let autoInputValue = useRef(null);

  const findLocation = useCallback(() => {
    if (mapApiLoaded) {
      const service = new mapApi.places.PlacesService(mapInstance);

      const request = {
        location: myPosition,
        radius: 1000,
        type: searchType,
      };

      service.nearbySearch(request, (results, status) => {
        if (status === mapApi.places.PlacesServiceStatus.OK) {
          setPlace(results);
        }
      });
    }
  }, [mapApiLoaded, myPosition, mapInstance, searchType, mapApi]);

  const handleAutoComplete = useCallback(() => {
    if (mapApiLoaded && value) {
      const service = new mapApi.places.AutocompleteService();
      const request = {
        input: value,
      };

      service.getPlacePredictions(request, (results, status) => {
        if (status === mapApi.places.PlacesServiceStatus.OK) {
          setAutoCompleteData(results);
        }
      });
    }
  }, [mapApi, mapApiLoaded, value]);

  const handleChangeMyPosition = (e) => {
    if (mapApiLoaded) {
      const placeId = e.target.getAttribute("id"); // 拿到搜尋列上的 placeId

      const service = new mapApi.places.PlacesService(mapInstance);
      const request = {
        placeId,
        fields: ["geometry"],
      };

      service.getDetails(request, (results, status) => {
        if (status === mapApi.places.PlacesServiceStatus.OK) {
          const newPosition = {
            lat: results.geometry.location.lat(),
            lng: results.geometry.location.lng(),
          };
          setMyPosition(newPosition); // 改變 marker
          setAutoCompleteData([]); // 清空自動搜尋清單
          autoInputValue.current.value = ""; // 清空搜尋列
        }
      });
    }
  };

  // 當地圖載入完成，將地圖實體與地圖 API 傳入 state 供之後使用
  const handleApiLoaded = (map, maps) => {
    setMapInstance(map);
    setMapApi(maps);
    setMapApiLoaded(true);
  };

  const handleCenterChange = () => {
    if (mapApiLoaded) {
      setMyPosition({
        // center.lat() 與 center.lng() 會回傳正中心的經緯度
        lat: mapInstance.center.lat(),
        lng: mapInstance.center.lng(),
      });
    }
  };

  const handleChangeAutoInput = (e) => {
    setValue(e.target.value);
  };

  const handleCloseMarkerDetail = () => {
    setMarkerDetails(null)
  }

  const handleDetailMarker = (placeId) => {
    // 點擊地標獲取詳細資訊
    if (mapApiLoaded) {
      const service = new mapApi.places.PlacesService(mapInstance);
      const request = {
        placeId,
      };

      service.getDetails(request, (results, status) => {
        if (status === mapApi.places.PlacesServiceStatus.OK) {
          console.log(results);
          setMarkerDetails(results)
        }
      });
    }
  };

  useEffect(() => {
    findLocation();
  }, [searchType, myPosition, findLocation]);

  useEffect(() => {
    handleAutoComplete();
  }, [value, handleAutoComplete]);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <AutoCompleteSearch
        handleChangeAutoInput={handleChangeAutoInput}
        autoInputValue={autoInputValue}
        handleChangeMyPosition={handleChangeMyPosition}
        autoCompleteData={autoCompleteData}
      />
      <SearchTypeOptions
        mapType={mapType}
        setMapType={setMapType}
        searchType={searchType}
        setSearchType={setSearchType}
      />
      {markerDetails && (
        <MarkerDetail
          markerDetails={markerDetails}
          handleCloseMarkerDetail={handleCloseMarkerDetail}
        />
      )}
      <GoogleMapReact
        bootstrapURLKeys={{
          key: Key,
          libraries: ["places"],
        }}
        center={myPosition}
        options={{ mapTypeId: mapType }}
        onBoundsChange={handleCenterChange}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <MyPositionMarker
          lat={myPosition.lat}
          lng={myPosition.lng}
          text="My Position"
        />

        {place.map((item) => (
          <TargetMarker
            icon={item.icon}
            key={item.place_id}
            lat={item.geometry.location.lat()}
            lng={item.geometry.location.lng()}
            text={item.name}
            placeId={item.place_id}
            handleDetailMarker={handleDetailMarker}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

SimpleMap.defaultProps = {
  center: {
    lat: 25.0441443,
    lng: 121.5711905,
  },
  zoom: 17,
};

// App
function App() {
  return (
    <div className="App">
      <SimpleMap />
    </div>
  );
}

export default App;
